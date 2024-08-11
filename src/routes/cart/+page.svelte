<script lang="ts">
	import { getCart, removeFromCart, addToCart, decrementQuantity } from '$lib/client/cart';
	import { applyAction, deserialize } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import { CldImage } from 'svelte-cloudinary';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	let cart: any[] = [];
	let total: number = 0;

	onMount(() => {
		console.log('Cart component mounted');
		cart = getCart();
		console.log('Initial cart:', cart);
		calculateTotal();
	});

	function calculateTotal() {
		total = cart.reduce((sum, item) => sum + (item.size.price * item.quantity) / 100, 0);
		console.log('Total calculated:', total);
	}

	$: {
		cart = getCart();
		console.log('Updated cart:', cart);
		calculateTotal();
	}

	async function handleSubmit(event: SubmitEvent) {
    console.log('handleSubmit called');
    event.preventDefault();
    
    try {
      console.log('Preparing form data');
      const formData = new FormData(event.target as HTMLFormElement);
      formData.append('cart', JSON.stringify(cart));

      console.log('Sending POST request');
      const response = await fetch('/cart', {
        method: 'POST',
        body: formData
      });

      console.log('Response received:', response.status, response.statusText);
      const result = await response.json();
      console.log('Parsed result:', result);

      if (result.type === 'success' && result.data) {
        const parsedData = JSON.parse(result.data);
        console.log('Parsed data:', parsedData);
        
        if (Array.isArray(parsedData) && parsedData[1] === 'redirect' && typeof parsedData[2] === 'string') {
          const redirectUrl = parsedData[2];
          console.log('Redirecting to:', redirectUrl);
          window.location.href = redirectUrl;
        } else {
          console.log('Unexpected data format:', parsedData);
        }
      } else if (result.type === 'error') {
        console.error('Checkout failed:', result.message);
        // TODO: Display error message to user
      } else {
        console.log('Unexpected response type:', result);
        // TODO: Handle unexpected response
      }
    } catch (error) {
      console.error('Checkout error:', error);
      // TODO: Display error message to user
    }
  }
  
</script>

<div class="w-full flex md:px-20 md:py-4 md:gap-x-16 bg-white flex-col gap-3 px-2 grow">
	<h1 class="md:text-4xl text-3xl font-semibold text-black">Review Shopping Cart</h1>

	{#if total < 125}
		<p class="text-neutral-500 md:text-2xl sm:text-xl sm:font-light">
			All orders over $125.00 will receive free shipping!
		</p>
	{:else}
		<p class="flex flex-row items-center gap-1 text-neutral-500 md:text-2xl sm:text-xl sm:font-light">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="green"/>
			</svg>
			Your order qualifies for <span class="text-green-600">FREE shipping!</span>
		</p>
	{/if}

	{#if cart.some(item => item.size.width >= 11)}
		<p class="flex flex-row gap-1 items-center text-neutral-500 md:text-2xl sm:text-xl sm:font-light">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="green"/>
			</svg>
			<span class="text-green-600">Your order qualifies</span> for an exclusive FREE print
		</p>
	{:else}
		<p class="text-neutral-500 md:text-2xl sm:text-xl sm:font-light">
			All orders which include a Medium print (11x14 or 11x11) will include an exclusive free print,
			add one now!
		</p>
	{/if}

	<div class="flex flex-row justify-center items-center sm:justify-end sm:top-[77px] w-full sticky top-[62px] bg-white p-3">
		<p class="text-xl font-light text-neutral-600 px-3">
			Subtotal <span class="text-xl font-semibold text-black">${total.toFixed(2)}</span>
		</p>
		<form on:submit|preventDefault={handleSubmit}>
			<input type="hidden" name="cart" value={JSON.stringify(cart)} />
			
			{#if data.isSoldOut}
				<Button type="submit" disabled={true}>Sold out</Button>
			{:else if data.user}
				<Button
					type="submit"
					disabled={cart.length === 0}
					class="bg-[#0071e3] drop-shadow-sm hover:bg-neutral-900 text-lg p-6 font-light rounded-lg"
					on:click={() => console.log('Checkout button clicked')}
				>
					{cart.length > 0 ? `Check Out (${cart.length} item${cart.length === 1 ? '' : 's'})` : 'Please pick an item first'}
				</Button>
			{:else if cart.length === 0}
				<Button
					disabled={true}
					class="bg-[#0071e3] drop-shadow-sm hover:bg-neutral-900 text-lg p-6 font-light rounded-lg"
				>
					Please pick an item first
				</Button>
			{:else}
				<Dialog.Root>
					<Dialog.Trigger>
						<Button
							class="bg-[#0071e3] drop-shadow-sm hover:bg-neutral-900 text-lg p-6 font-light rounded-lg"
						>
							Check Out ({cart.length} item{cart.length === 1 ? '' : 's'})
						</Button>
					</Dialog.Trigger>
					<Dialog.Content class="sm:max-w-[425px]">
						<Dialog.Header>
							<Dialog.Title>Account</Dialog.Title>
							<Dialog.Description>
								Would you like to create an account to save your information, manage your orders,
								and get special offers?
							</Dialog.Description>
						</Dialog.Header>
						<form
							class="flex flex-row justify-center gap-x-5 w-full"
							on:submit|preventDefault={handleSubmit}
						>
							<Button type="submit" class="w-full">Continue as guest</Button>
						</form>
						<Button
							type="button"
							on:click={() => goto('/auth/signin')}
							class="w-full"
							variant="outline">Create account</Button
						>
					</Dialog.Content>
				</Dialog.Root>
			{/if}
		</form>
	</div>
	
	<hr class="bg-neutral-300 h-[1px] w-full" />

	<div class="md:rounded-lg">
		<div class="flex flex-col md:flex-row flex-wrap">
			{#each cart as cartItem, i}
				<div class="w-full md:mx-auto py-2 justify-center flex flex-row gap-2 md:gap-10 p-2">
					<div class="w-1/2 md:w-[200px] rounded-lg overflow-hidden h-full">
						<CldImage src={cartItem.productImage} width={400} height={400} objectFit="cover" />
					</div>
					<div class="flex flex-col gap-1 sm:gap-3 w-1/2">
						<div class="flex flex-col sm:flex-row sm:items-center justify-between">
							<h2 class="text-2xl md:text-4xl font-jura">{cartItem.productName}</h2>
							<p class="text-xl font-bold">
								${((cartItem.size.price * cartItem.quantity) / 100).toFixed(2)}
							</p>
						</div>
						<p class="text-xl text-neutral-600">
							{cartItem.size.width}" x {cartItem.size.height}"
						</p>
						<div class="flex flex-row items-center gap-3">
							<Button
								variant="outline"
								disabled={cartItem.quantity === 1}
								on:click={() => {
									decrementQuantity(i);
									cart = getCart();
								}}>-</Button
							>
							{cartItem.quantity}
							<Button
								variant="outline"
								on:click={() => {
									addToCart(cartItem);
									cart = getCart();
								}}>+</Button
							>
						</div>
						<button
							class="text-blue-600 text-left"
							on:click={() => {
								removeFromCart(i);
								cart = getCart();
							}}>Remove</button
						>
					</div>
				</div>
				<hr class="bg-neutral-300 h-[1px] w-2/3 mx-auto" />
			{/each}
		</div>
	</div>
</div>