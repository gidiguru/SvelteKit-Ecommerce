<script lang="ts">
	export let data;
</script>

<div class="flex flex-col h-screen container items-center justify-center">
	{#if data?.user}
		<p>{data.user.email}</p>
	{/if}
	<h1>Confirm Your Email Address</h1>

	<hr class="!border-t-2 mt-2 mb-6" />

	Please check your email account for a message to confirm your email address
	for Techshop. If you did not receive the email,
	<a
		href="/auth/verify/resend-email-{data.user.token}"
		class="hover:underline font-bold">click here</a
	> to resend it.
</div>