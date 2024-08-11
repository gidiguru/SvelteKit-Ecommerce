<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionResult, SubmitFunction } from '@sveltejs/kit';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Alert, AlertDescription } from '$lib/components/ui/alert';
	import { onMount } from 'svelte';

	type ActionData = {
		success?: boolean;
		error?: string;
		errors?: { email?: string };
		email?: string;
	} | null;

	export let form: ActionData;

	let isSubmitting = false;
	let email = '';
	let message = '';
	let messageType: 'default' | 'destructive' = 'default';

	onMount(() => {
		console.log('Component mounted');
	});

	$: {
		console.log('Form data changed:', form);
		updateMessage();
	}

	$: {
		console.log('Email input changed:', email);
	}

	function updateMessage() {
		if (form?.error) {
			message = form.error;
			messageType = 'destructive';
		} else if (form?.success) {
			message = 'Successfully joined the email list!';
			messageType = 'default';
		} else {
			message = '';
			messageType = 'default';
		}
		console.log('Updated message:', message);
		console.log('Updated messageType:', messageType);
	}

	const handleSubmit: SubmitFunction = () => {
		console.log('Form submission started');
		isSubmitting = true;
		return ({ result }) => {
			console.log('Form submission completed', result);
			isSubmitting = false;
			if (result.type === 'success') {
				email = '';
				form = { success: true };
				console.log('Form submission successful, email reset');
			} else if (result.type === 'failure') {
				console.log('Form submission failed:', result.data);
				if (result.data && typeof result.data === 'object') {
					form = result.data as ActionData;
				} else {
					form = { error: 'An unexpected error occurred. Please try again.' };
				}
			} else if (result.type === 'error') {
				console.error('Form submission error:', result.error);
				form = { error: 'An unexpected error occurred. Please try again.' };
			} else if (result.type === 'redirect') {
				console.log('Form submission resulted in redirect');
				// Handle redirect if needed
			}
			updateMessage();
		};
	};
</script>

<Card.Root class="w-[400px]">
	<Card.Header>
		<Card.Title>Email List</Card.Title>
		<Card.Description>Get updates and deals from the sediment team</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance={handleSubmit}>
			<div class="grid w-full items-center gap-4">
				<div class="flex flex-col space-y-1.5">
					<Label for="email">Email</Label>
					<Input id="email" placeholder="you@example.com" name="email" bind:value={email} />
				</div>
			</div>
			<div class="flex justify-end pt-4">
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Joining...' : 'Join'}
				</Button>
			</div>
		</form>

		{#if message}
			<div class="mt-4">
				<Alert variant={messageType}>
					<AlertDescription>{message}</AlertDescription>
				</Alert>
			</div>
		{/if}
	</Card.Content>
</Card.Root>