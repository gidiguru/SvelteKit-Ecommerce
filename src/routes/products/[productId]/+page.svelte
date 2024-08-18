<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { CldImage } from 'svelte-cloudinary';
	import { addToCart } from '$lib/client/cart';
	import { CldOgImage } from 'svelte-cloudinary';

	export let data;

	const handleAddedToCart = () => {
		const el = document.getElementById('added-to-cart');
		el?.classList.remove('hidden');
		setTimeout(() => {
			el?.classList.add('hidden');
		}, 4000);
	};

	// for top section spinny thing
	let curIdx = 0;
	let scrollSection: any;

	function handleScrollTop(e: any) {
		curIdx = Math.round(e.target.scrollLeft / window.screen.width);
	}

	function handleSetTopScroll(idx: number) {
		scrollSection.scrollLeft = idx * window.screen.width;
	}
</script>

<svelte:head>
	<title>{data.product.name} | Synergetics Shop</title>
	<meta name="description" content={data.product.desc} />
</svelte:head>

<div class="grow flex flex-col sm:pt-10 w-full">
	<!-- MOBILE -->
	<div class="w-full flex flex-col justify-center items-center gap-y-2 overflow-hidden sm:hidden">
		<!-- images section mobile -->
		<div class="w-screen overflow-hidden relative">
			<div
				class="overflow-x-auto snap-x snap-mandatory scroll-smooth flex slides w-full"
				on:scroll={(e) => handleScrollTop(e)}
				bind:this={scrollSection}
			>
				{#each data.product.images as image}
					<div class="snap-start w-full transform origin-center shrink-0">
						<CldImage src={image.cloudinaryId} width={1000} height={1000} objectFit="cover" />
					</div>
				{/each}
			</div>
			<div class="absolute bottom-3 left-1/2 translate-x-[-50%] flex gap-x-2">
				{#each data.product.images as _, i}
					<button
						on:click={() => handleSetTopScroll(i)}
						class={`w-[10px] h-[10px] ${
							i === curIdx && 'bg-white'
						} rounded-full border border-white`}
					/>
				{/each}
			</div>
		</div>
	</div>
	<!-- DESKTOP -->
	<div class="h-full sm:mx-10 mx-4 sm:grid sm:grid-cols-4 flex flex-col">
		<div class="col-span-3 p-4 relative h-[85vh] hidden sm:flex">
			{#each data.product.images as im, i}
				<CldImage
					src={im.cloudinaryId}
					width={1500}
					height={1200}
					objectFit="cover"
					class={`rounded-lg h-full ${curIdx == i ? 'flex' : 'hidden'}`}
				/>
			{/each}
			<div class="absolute bottom-8 left-1/2 translate-x-[-50%] flex gap-x-2">
				{#each data.product.images as _, i}
					<button
						on:click={() => (curIdx = i)}
						class={`w-[10px] h-[10px] ${
							i === curIdx && 'bg-white'
						} rounded-full border border-white`}
					/>
				{/each}
			</div>
			<button
				on:click={() => {
					curIdx++;
					if (curIdx == data.product.images.length) curIdx = 0;
				}}
				class="absolute cursor-pointer right-10 top-1/2 translate-y-[-50%] bg-gray-300/50 rounded-full flex flex-row justify-center items-center"
			>
				<svg
					width="48"
					height="48"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M8.29492 16.59L12.8749 12L8.29492 7.41L9.70492 6L15.7049 12L9.70492 18L8.29492 16.59Z"
						fill="black"
					/>
				</svg>
			</button>
			<button
				on:click={() => {
					curIdx--;
					if (curIdx == -1) curIdx = data.product.images.length - 1;
				}}
				class="absolute cursor-pointer left-10 top-1/2 translate-y-[-50%] bg-gray-300/50 rounded-full flex flex-row justify-center items-center"
			>
				<svg
					width="48"
					height="48"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M15.7049 16.59L11.1249 12L15.7049 7.41L14.2949 6L8.29492 12L14.2949 18L15.7049 16.59Z"
						fill="black"
					/>
				</svg>
			</button>
		</div>

		<div class="sm:p-4 py-6 flex flex-col gap-4 sm:h-[85vh] sm:overflow-scroll no-scroll">
			<div
				class={`text-4xl font-jura text-transparent bg-clip-text`}
				style={`background-image: linear-gradient(to right bottom, ${data.product.gradientColorStart}, ${data.product.gradientColorVia}, ${data.product.gradientColorStop} );`}
			>
				{data.product.name}
			</div>
			<div class="text-lg text-gray-500 font-light">{data.product.desc}</div>
			<div>
				<span
					class={`text-3xl font-jura text-transparent bg-clip-text`}
					style={`background-image: linear-gradient(to right bottom, ${data.product.gradientColorStart}, ${data.product.gradientColorVia}, ${data.product.gradientColorStop} );`}
					>Product Details</span
				>
			</div>

			<div class="w-full rounded-lg p-[2px]">
				<div class="w-full p-6 bg-white rounded-md flex flex-row justify-between items-center">
					<div class="flex flex-col items-start">
						<div class="text-lg font-semibold">{data.productType.name}</div>
						<div class="text-sm font-light">{data.productType.width} x {data.productType.height}</div>
					</div>
					<div>${data.productType.price / 100}</div>
				</div>
			</div>

			<Button
				class={`bg-white drop-shadow-md hover:bg-black text-lg p-7 font-light`}
				disabled={!data.productType.isAvailable}
				on:click={() => {
					addToCart({
						productId: data.product.id,
						productName: data.product.name,
						productImage: data.product.images[0].cloudinaryId,
						productType: {width: data.productType.width ?? 0,
					        height: data.productType.height ?? 0,
					        code: data.productType.code ?? '',
					        stripePriceId: data.productType.stripePriceId ?? '',
					        price: data.productType.price ?? 0

                        },
						quantity: 1
					});
					handleAddedToCart();
				}}
			>
				<div
					class={` text-transparent bg-clip-text `}
					style={`background-image: linear-gradient(to right bottom, ${data.product.gradientColorStart}, ${data.product.gradientColorVia}, ${data.product.gradientColorStop} );`}
				>
					{#if !data.productType.isAvailable}
						Sold Out
					{:else}
						Add to Cart ${(data.productType.price / 100).toFixed(2)}
					{/if}
				</div>
			</Button>
			<div class="text-lg text-gray-500 font-light">
				Order now and get an exclusive print for free as part of our launch event!
			</div>
		</div>
	</div>

	<div class="flex flex-col items-center gap-y-4 md:w-1/2 m-auto text-center px-3">
		<h2 class="font-jura text-5xl py-6 text-neutral-800">{data.product.name}</h2>
		<p class="text-xl font-light text-neutral-700">
			Product Size Width: {data.productType.width} x Height: {data.productType.height}.
		</p>
		<p class="text-xl font-bold text-neutral-700">
			{data.product.desc}
		</p>
		<p class="text-xl font-light text-neutral-700 pb-8">
			Each piece is made to order. We are just starting out and hope to have you on this journey
			with us.
		</p>
	</div>

	<!-- IG EMBED -->
	<script async src="//www.instagram.com/embed.js"></script>
</div>

<style>
	.slides::-webkit-scrollbar-thumb {
		background: black;
		border-radius: 10px;
	}
	.slides::-webkit-scrollbar-track,
	.no-scroll::-webkit-scrollbar-track {
		background: transparent;
	}
	/* Hide scrollbar for Chrome, Safari and Opera */
	.slides::-webkit-scrollbar,
	.no-scroll::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	.slides,
	.no-scroll {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>