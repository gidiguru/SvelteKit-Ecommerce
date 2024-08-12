<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let message = '';
	let token = '';

	onMount(() => {
		message = $page.url.searchParams.get('message') || 'Your password has been updated successfully.';
		token = $page.params.token || '';
	});
</script>

<h1>Password Updated Successfully</h1>

<p>{message}</p>

{#if token}
	<p>Your new reset token is: {token}</p>
	<p>Please keep this token safe as it may be needed for future password resets.</p>
{/if}

<a href="/auth/login">Return to Login</a>