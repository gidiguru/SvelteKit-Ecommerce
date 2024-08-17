import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';

export type PaystackCustomer = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    customer_code: string;
    phone?: string;
    metadata?: any;
    risk_action: string;
};

export type CustomerDetails = {
    name?: string;
    email?: string;
    phone?: string;
    address?: {
        line1?: string;
        line2?: string;
        city?: string;
        state?: string;
        postal_code?: string;
        country?: string;
    };
};

export type OrderDetails = {
    id: string;
    userId: string;
    totalPrice: number;
    currency: string;
    timestamp: Date;
    status: string;
    paymentGateway: 'stripe' | 'paystack';
    gatewayOrderId: string | null;
    customerDetails: CustomerDetails | PaystackCustomer | null;
    email?: string;
};

export type PaystackTransaction = {
    id: number;
    status: string;
    reference: string;
    amount: number;
    paid_at: string;
    created_at: string;
    currency: string;
    channel: string;
    metadata: any;
    customer: PaystackCustomer;
};

export type PaystackResponse<T> = {
    status: boolean;
    message: string;
    data: T;
};

class PaystackClient {
    private client: AxiosInstance;

    constructor(secretKey: string) {
        this.client = axios.create({
            baseURL: 'https://api.paystack.co',
            headers: {
                Authorization: `Bearer ${secretKey}`,
                'Content-Type': 'application/json',
            },
        });
    }

    async verifyTransaction(reference: string): Promise<PaystackResponse<PaystackTransaction>> {
        const response = await this.client.get<PaystackResponse<PaystackTransaction>>(`/transaction/verify/${reference}`);
        return response.data;
    }

    async listTransactions(params?: { perPage?: number; page?: number }): Promise<PaystackResponse<PaystackTransaction[]>> {
        const response = await this.client.get<PaystackResponse<PaystackTransaction[]>>('/transaction', { params });
        return response.data;
    }

    async getCustomer(email_or_code: string): Promise<PaystackResponse<PaystackCustomer>> {
        const response = await this.client.get<PaystackResponse<PaystackCustomer>>(`/customer/${email_or_code}`);
        return response.data;
    }

    // Method to expose general request functionality
    async request<T = any>(config: AxiosRequestConfig): Promise<T> {
        const response = await this.client.request<T>(config);
        return response.data;
    }
}

// Create and export a singleton instance of PaystackClient
export const paystack = new PaystackClient(process.env.PAYSTACK_SECRET_KEY as string);

// For backwards compatibility, create an object that mimics the previous Paystack structure
export const Paystack = {
    transaction: {
        verify: (reference: string) => paystack.verifyTransaction(reference),
    },
    // Add other methods as needed for backwards compatibility
};

// Type declaration for the Paystack object
declare global {
    interface Paystack {
        transaction: {
            verify: (reference: string) => Promise<PaystackResponse<PaystackTransaction>>;
        };
        // Add other method signatures as needed
    }
}