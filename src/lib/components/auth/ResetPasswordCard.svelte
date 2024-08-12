<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { superForm } from "sveltekit-superforms/client";
	import type { PageData } from './$types';
	import { AlertTriangle, CheckCircle } from "lucide-svelte";
	import { Icons } from "$lib/components/ui/icons/index.js";
	import { cn } from "$lib/utils";
	import { onMount, onDestroy } from 'svelte';

	// Temporary i18n function (replace with your preferred i18n solution)
	const i = (key: string) => key;

	export let data: PageData;

	console.log('ResetPasswordCard: Component initialized', { data });

	const { form, errors, enhance, submitting, message } = superForm(data.form, {
		resetForm: true,
		onUpdated: (event) => {
			console.log('ResetPasswordCard: Form updated', event);
		}
	});

	// Accept a class prop for external styling
	let className = '';
	export { className as class };

	$: success = $message !== null && $message !== undefined && $message !== '';
	$: console.log('ResetPasswordCard: Form state', { 
		formData: $form, 
		errors: $errors, 
		submitting: $submitting, 
		message: $message, 
		success 
	});

	onMount(() => {
		console.log('ResetPasswordCard: Component mounted');
	});

	onDestroy(() => {
		console.log('ResetPasswordCard: Component destroyed');
	});

	function handleSubmit() {
		console.log('ResetPasswordCard: Form submitted', $form);
	}
</script>

<form 
	method="POST"
	use:enhance
	on:submit|preventDefault={handleSubmit}
	class={className}
>
	<Card.Root>
		<Card.Header>
			<Card.Title>{i("Password Reset")}</Card.Title>
			<Card.Description>{i("Reset your Password")}</Card.Description>
		</Card.Header>
		<Card.Content class="space-y-4">
			{#if $errors._errors}
				<aside class="alert variant-filled-error">
					<div><AlertTriangle size="24" /></div>
					<div class="alert-message">
						<p>{$errors._errors[0]}</p>
					</div>
				</aside>
			{/if}
			{#if success}
				<aside class="alert variant-filled-success">
					<div><CheckCircle size="24" /></div>
					<div class="alert-message">
						<p>{$message}</p>
					</div>
				</aside>
			{/if}
			<div class="space-y-2">
				<label
					for="email"
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					{i("email")}
				</label>
				<input
					id="email"
					name="email"
					type="email"
					placeholder={i("email")}
					autocomplete="email"
					data-invalid={$errors.email}
					bind:value={$form.email}
					class={cn(
						"flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
						$errors.email && "input-error"
					)}
					autocapitalize="none"
					autocorrect="off"
					disabled={$submitting}
				/>
				{#if $errors.email}
					<small class="text-error">{$errors.email[0]}</small>
				{/if}
			</div>

			<Button
				disabled={$submitting}
				type="submit"
				class="btn variant-filled-primary w-full"
			>
				{#if $submitting}
					<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
					{i("Submitting")}
				{:else}
					{i("Submit")}
				{/if}
			</Button>
		</Card.Content>
	</Card.Root>
</form>