<script lang="ts">
	import { onMount } from 'svelte';
	import { clearCart } from '$lib/client/cart';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	
	let formElement: HTMLFormElement;

	function submitForm(node: HTMLFormElement): void {
		if ($page.url.searchParams.get('session_id')) {
			node.submit();
		}
	}

	onMount(() => {
		if ($page.url.searchParams.get('clear_cart') === 'true') {
			clearCart();
		}
	});
</script>

<form
	bind:this={formElement}
	id="purchaseSuccessForm"
	method="POST"
	action="?/handlePurchaseSuccess"
	use:enhance
	use:submitForm
>
	<input type="hidden" name="session_id" value={$page.url.searchParams.get('session_id') || ''}>
</form>

<div class="h-[80vh] flex items-center justify-center flex-col md:w-3/5 m-auto gap-4 px-4">
	<h2 class="font-jura sm:text-4xl text-3xl text-center py-3">Thank You for Ordering!</h2>
	<p class="font-jura">
		You are one of our most valued customers.
	</p>
	<p class="font-jura">
		We're thrilled to be getting one of our products in your hands. We'll keep you updated as we get
		your order fulfilled.
	</p>
	<p class="font-jura">
		We will inform you when your order has shipped to you.
	</p>
	<p class="font-jura">Keep an eye on your email, we'll send you updates!</p>
</div>

