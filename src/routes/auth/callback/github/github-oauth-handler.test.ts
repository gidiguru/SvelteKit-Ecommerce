import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from './+server'; // Adjust the import path as necessary
import { github, lucia } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import type { RequestEvent } from '@sveltejs/kit';
import type { Session, Cookie } from 'lucia';
import { OAuth2RequestError } from 'arctic';

// Define the user type based on your schema
type User = {
  id: string;
  provider: "google" | "github";
  providerId: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  email: string;
  stripeCustomerId: string | null;
};

// Mock external dependencies
vi.mock('$lib/server/auth', () => ({
  github: {
    validateAuthorizationCode: vi.fn(),
  },
  lucia: {
    createSession: vi.fn(),
    createSessionCookie: vi.fn(),
  },
}));

vi.mock('$lib/server/db', () => ({
  db: {
    query: {
      user: {
        findFirst: vi.fn(),
      },
    },
    insert: vi.fn().mockReturnValue({ values: vi.fn() }),
  },
}));

vi.mock('lucia', () => ({
  generateId: vi.fn().mockReturnValue('generated-id'),
}));

describe('GitHub OAuth Handler', () => {
  let mockEvent: RequestEvent;
  let mockSession: Session;
  let mockCookie: Cookie;
  let mockUser: User;

  beforeEach(() => {
    mockEvent = {
      url: new URL('http://localhost:5173/auth/callback/github?code=test-code&state=test-state'),
      cookies: {
        get: vi.fn().mockReturnValue('test-state'),
        set: vi.fn(),
        getAll: vi.fn(),
        delete: vi.fn(),
        serialize: vi.fn(),
      },
      params: {},
      route: { id: null },
      request: new Request('http://localhost:5173'),
      locals: {},
      isDataRequest: false,
      platform: undefined,
      clientAddress: '',
      setHeaders: vi.fn(),
    } as unknown as RequestEvent;

    mockSession = {
      id: 'session-id',
      userId: 'user-id',
      expiresAt: new Date(Date.now() + 3600000), // expires in 1 hour
      fresh: true,
    };

    mockCookie = {
      name: 'session-cookie',
      value: 'cookie-value',
      attributes: {},
      serialize: () => 'serialized-cookie-string'
    };

    mockUser = {
      id: 'existing-user-id',
      provider: 'github',
      providerId: '12345',
      firstName: 'Test',
      lastName: 'User',
      isAdmin: false,
      email: 'test@example.com',
      stripeCustomerId: null,
    };

    // Reset mocks
    vi.clearAllMocks();
  });

  it('should handle valid OAuth callback and create new user', async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ id: '12345', name: 'Test User' }),
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve([{ email: 'test@example.com', primary: true }]),
      });

    vi.mocked(github.validateAuthorizationCode).mockResolvedValue({ accessToken: 'test-token' });
    vi.mocked(lucia.createSession).mockResolvedValue(mockSession);
    vi.mocked(lucia.createSessionCookie).mockReturnValue(mockCookie);

    vi.mocked(db.query.user.findFirst).mockResolvedValue(undefined);

    const response = await GET(mockEvent);

    expect(response.status).toBe(302);
    expect(response.headers.get('Location')).toBe('/');
    expect(db.insert).toHaveBeenCalledWith(user);
    expect(lucia.createSession).toHaveBeenCalled();
    expect(mockEvent.cookies.set).toHaveBeenCalled();
  });

  it('should handle valid OAuth callback for existing user', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ id: '12345', name: 'Test User' }),
    });

    vi.mocked(github.validateAuthorizationCode).mockResolvedValue({ accessToken: 'test-token' });
    vi.mocked(lucia.createSession).mockResolvedValue(mockSession);
    vi.mocked(lucia.createSessionCookie).mockReturnValue(mockCookie);

    vi.mocked(db.query.user.findFirst).mockResolvedValue(mockUser);

    const response = await GET(mockEvent);

    expect(response.status).toBe(302);
    expect(response.headers.get('Location')).toBe('/');
    expect(db.insert).not.toHaveBeenCalled();
    expect(lucia.createSession).toHaveBeenCalledWith('existing-user-id', {});
    expect(mockEvent.cookies.set).toHaveBeenCalled();
  });

  it('should return 400 for invalid state', async () => {
    vi.mocked(mockEvent.cookies.get).mockReturnValue('different-state');

    const response = await GET(mockEvent);

    expect(response.status).toBe(400);
  });

  it('should handle OAuth2RequestError', async () => {
    const mockRequest = new Request('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'code=invalid_code&client_id=your_client_id&client_secret=your_client_secret'
    });

    vi.mocked(github.validateAuthorizationCode).mockRejectedValue(
      new OAuth2RequestError(mockRequest, {
        error: 'invalid_request',
        error_description: 'Invalid code'
      })
    );

    const response = await GET(mockEvent);

    expect(response.status).toBe(400);
  });

  it('should return 500 for unexpected errors', async () => {
    vi.mocked(github.validateAuthorizationCode).mockRejectedValue(new Error('Unexpected error'));

    const response = await GET(mockEvent);

    expect(response.status).toBe(500);
  });
});