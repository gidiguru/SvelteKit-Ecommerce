<script lang="ts">
	import { superForm } from "sveltekit-superforms/client";
	import { userUpdatePasswordSchema } from "$lib/config/zod-schemas";
	import { AlertTriangle, Loader, EyeIcon, EyeOffIcon } from "lucide-svelte";
	import { zod } from 'sveltekit-superforms/adapters';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data;
	const { form, errors, enhance, delayed, submitting, message } = superForm(data.form, {
		taintedMessage: null,
		validators: zod(userUpdatePasswordSchema),
		delayMs: 500,
		onResult: ({ result }) => {
			console.log('Form submission result:', result);
			if (result.type === 'failure') {
				console.error('Form validation failed:', result.data);
			} else if (result.type === 'error') {
				console.error('Form submission error:', result.error);
			}
			if (result.type === 'success') {
				if (result.data && result.data.success === true) {
					console.log('Password updated successfully, redirecting...');
					goto('/auth/password/update-success');
				} else {
					console.log('Form submission was successful, but password update failed');
				}
			} else {
				console.log('Form submission was not successful');
				if (result.type === 'error') {
					console.error('Form submission error:', result.error);
				} else if (result.type === 'failure') {
					console.error('Form validation failed:', result.data);
				}
			}
		},
	});

	let showPassword = false;
	let showConfirmPassword = false;

	onMount(() => {
		console.log('Component mounted');
		const passwordInput = document.getElementById('password');
		if (passwordInput) {
			passwordInput.focus();
			console.log('Password input focused');
		} else {
			console.error('Password input element not found');
		}
	});

	function togglePasswordVisibility(field: 'password' | 'confirmPassword') {
		if (field === 'password') {
			showPassword = !showPassword;
		} else {
			showConfirmPassword = !showConfirmPassword;
		}
		console.log(`${field} visibility toggled:`, field === 'password' ? showPassword : showConfirmPassword);
	}

	$: {
		console.log('Form data changed:', $form);
		console.log('Form errors:', $errors);
	}

	$: passwordStrength = getPasswordStrength($form.password);

	function getPasswordStrength(password: string): { score: number; feedback: string } {
		const score = password.length >= 8 ? (password.length >= 12 ? 3 : 2) : 1;
		const feedback = score === 3 ? "Strong" : (score === 2 ? "Moderate" : "Weak");
		console.log('Password strength calculated:', { score, feedback });
		return { score, feedback };
	}
</script>

<h3>Change Password</h3>

<hr class="!border-t-2 mt-2 mb-6" />

<form method="POST" use:enhance>
	{#if $errors._errors}
		<aside class="alert variant-filled-error mt-6" role="alert">
			<AlertTriangle size="24" />
			<div class="alert-message">
				<h3 class="h3">Password Problem</h3>
				<p>{$errors._errors}</p>
			</div>
		</aside>
	{/if}

	{#if $message}
		<aside class="alert variant-filled-success mt-6" role="alert">
			<div class="alert-message">
				<p>{$message}</p>
			</div>
		</aside>
	{/if}

	<div class="mt-6">
		<label class="label" for="password">
			<span>Password</span>
			<div class="relative">
				{#if showPassword}
					<input
						id="password"
						name="password"
						type="text"
						placeholder="Password"
						data-invalid={$errors.password}
						bind:value={$form.password}
						class="input pr-10"
						class:input-error={$errors.password}
						autocomplete="new-password"
						aria-describedby="password-strength"
					/>
				{:else}
					<input
						id="password"
						name="password"
						type="password"
						placeholder="Password"
						data-invalid={$errors.password}
						bind:value={$form.password}
						class="input pr-10"
						class:input-error={$errors.password}
						autocomplete="new-password"
						aria-describedby="password-strength"
					/>
				{/if}
				<button
					type="button"
					class="absolute inset-y-0 right-0 pr-3 flex items-center"
					on:click={() => togglePasswordVisibility('password')}
					aria-label={showPassword ? "Hide password" : "Show password"}
				>
					<svelte:component this={showPassword ? EyeOffIcon : EyeIcon} class="h-5 w-5 text-gray-400" />
				</button>
			</div>
			{#if $errors.password}
				<small class="text-error">{$errors.password}</small>
			{/if}
			<div id="password-strength" class="mt-2">
				<div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
					<div class="bg-blue-600 h-2.5 rounded-full" style="width: {passwordStrength.score * 33.33}%"></div>
				</div>
				<small>Password Strength: {passwordStrength.feedback}</small>
			</div>
		</label>
	</div>

	<div class="mt-6">
		<label class="label" for="confirmPassword">
			<span>Confirm Password</span>
			<div class="relative">
				{#if showConfirmPassword}
					<input
						id="confirmPassword"
						name="confirmPassword"
						type="text"
						placeholder="Confirm Password"
						data-invalid={$errors.confirmPassword}
						bind:value={$form.confirmPassword}
						class="input pr-10"
						class:input-error={$errors.confirmPassword}
						autocomplete="new-password"
					/>
				{:else}
					<input
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						placeholder="Confirm Password"
						data-invalid={$errors.confirmPassword}
						bind:value={$form.confirmPassword}
						class="input pr-10"
						class:input-error={$errors.confirmPassword}
						autocomplete="new-password"
					/>
				{/if}
				<button
					type="button"
					class="absolute inset-y-0 right-0 pr-3 flex items-center"
					on:click={() => togglePasswordVisibility('confirmPassword')}
					aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
				>
					<svelte:component this={showConfirmPassword ? EyeOffIcon : EyeIcon} class="h-5 w-5 text-gray-400" />
				</button>
			</div>
			{#if $errors.confirmPassword}
				<small class="text-error">{$errors.confirmPassword}</small>
			{/if}
		</label>
	</div>

	<div class="mt-6">
		<button type="submit" class="btn variant-filled-primary w-full" disabled={$submitting}>
			{#if $delayed}
				<Loader />
			{:else}
				Update Password
			{/if}
		</button>
	</div>
</form>