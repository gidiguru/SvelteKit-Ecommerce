<script lang="ts">
    import { CldImage } from 'svelte-cloudinary';
    import Button from './ui/button/button.svelte';
    import { Link } from 'lucide-svelte';
    import { goto, preloadData, pushState } from '$app/navigation';
    import { addToCart } from '$lib/client/cart';
    import * as Drawer from './ui/drawer';

	export let itemData: {
		name: string;
		productId: string;
		cloudinaryId: string | null;
		tags: string[];
		selectTag: (tagName: string) => void;
		displayMode: string;
		description: string;
		productTypes: {
			sku: string;
            height: number;
            name: string;
            width: number;
            productId: string;
            isAvailable: boolean;
            price: number;
            stripePriceId: string;
		}[];
	};

    export let displayMode: 'sm' | 'lg' = 'lg';

	console.log('Component initialized with itemData:', itemData);
    console.log('Display mode:', displayMode);

    const handleAddedToCart = () => {
        console.log('Item added to cart');
        const el = document.getElementById('added-to-cart')
        el?.classList.remove('hidden')
        setTimeout(() => {
            el?.classList.add('hidden')
            console.log('Added to cart notification hidden');
        }, 4000);
    }

    let selectedSizeIdx = 0;
	while (selectedSizeIdx < itemData.productTypes.length && !itemData.productTypes[selectedSizeIdx].isAvailable)
		selectedSizeIdx++;

  
		async function navigate(e: any) {
		// bail if opening a new tab, or we're on too small a screen
		if (e.metaKey || innerWidth < 640) return;

		// prevent navigation
		e.preventDefault();

		const { href } = e.currentTarget;

		// run `load` functions (or rather, get the result of the `load` functions
		// that are already running because of `data-sveltekit-preload-data`)
		const result = await preloadData(href);

		if (result.type === 'loaded' && result.status === 200) {
			pushState(href, { selected: result.data });
		} else {
			// something bad happened! try navigating
			goto(href);
		}
	}
</script>

<div
	class="rounded-lg w-1/2 hidden sm:flex p-2 relative hover:scale-[102%] transition-all duration-[400ms] cursor-pointer"
>
	<a href={'/products/' + itemData.productId}>
		<div
			class="absolute w-full h-full top-2 left-2 bg-gradient-to-br from-0% to-40% from-black/80 rounded-lg"
		/>
		<CldImage
			width={355 * 4}
			height={200 * 4}
			crop="fill"
			src={itemData.cloudinaryId || 'https://via.placeholder.com/355x200'}
			alt="Description of my image"
			sizes="100vw"
			class="sm:rounded-lg shadow-md hidden sm:flex w-full"
		/>
	</a>

	<div class="absolute top-5 left-5 font-jura w-full">
		<div class=" text-gray-300 text-md">{itemData.tags[0]}</div>
		<div class=" text-white text-4xl">{itemData.name}</div>
		<!-- <div class=" text-gray-400 text-md w-[45%] text-ellipsis overflow-hidden leading-5 max-h-[5rem] line-clamp-4">{itemData.desc}{itemData.desc}{itemData.desc}{itemData.desc}{itemData.desc}</div> -->
	</div>
	<div class="absolute bottom-5 left-5 flex flex-row items-end">
		{#each itemData.productTypes as productType}
			<button
				disabled={!productType.isAvailable}
				on:click={() => {
					addToCart({
						productId: itemData.productId,
						productName: itemData.name,
						productImage: itemData.cloudinaryId ?? '',
						productType: {
                width: productType.width,
                height: productType.height,
                sku: productType.sku, // Changed from 'sku' to 'code' to match TCartEntry
                stripePriceId: productType.stripePriceId,
                price: productType.price
            },
						quantity: 1
					});
					handleAddedToCart();
				}}
				class={`${
					productType.isAvailable
						? 'bg-neutral-100/60 hover:bg-neutral-100/90 hover:drop-shadow-lg hover:scale-110 transition-all duration-[200ms] size-selection hover:px-10 hover:py-3'
						: 'bg-neutral-300/40 line-through text-gray-800'
				}  px-3 py-2 mx-1 rounded-full text-sm `}
			>
				<div class="pre-text transition-all duration-300">{productType.name}</div>
				<div class="post-text hidden transition-all duration-300">
					<div>Buy <span class="font-bold font-lg">{productType.name}</span></div>
					<div class="font-light text-xs">{productType.width} x {productType.height}"</div>
				</div>
			</button>
		{/each}
	</div>
</div>


<div
	class={`flex sm:hidden flex-col sm:items-center sm:gap-x-8 sm:gap-y-0 gap-y-2 p-1 sm:p-4 ${
		itemData.displayMode == 'sm' ? 'w-1/2' : 'w-full'
	} sm:w-full`}
>
	<div class="sm:w-[355px] w-full sm:h-[200px] flex justify-center items-center relative">
		<div
			class="absolute top-1 left-1 rounded-full w-[40px] h-[40px] bg-gray-600/70 flex flex-col items-center justify-center sm:hidden"
		>
			<Drawer.Root>
				<Drawer.Trigger>
					<svg
						class="-translate-y-[1px]"
						width="17"
						height="20"
						viewBox="0 0 17 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g clip-path="url(#clip0_100_15)">
							<path
								d="M0 20V4.995L1 5.001V5.016L5 5.014V4C5 1.516 6.274 0 8.5 0C10.518 0 12 1.48 12 4V5.012L17 5.009V5.994H1V19H16V6.005H17V20H0ZM11 4.49C11 2.267 10.507 1 8.5 1C6.5 1 6 2.27 6 4.49V5L11 4.998V4.49Z"
								fill="white"
							/>
							<line x1="8.5" y1="8" x2="8.5" y2="17" stroke="white" />
							<line x1="4" y1="12.5" x2="13" y2="12.5" stroke="white" />
						</g>
						<defs>
							<clipPath id="clip0_100_15">
								<rect width="17" height="20" fill="white" />
							</clipPath>
						</defs>
					</svg>
				</Drawer.Trigger>
				<Drawer.Content class="px-2">
					<Drawer.Header>
						<Drawer.Title>{itemData.name}</Drawer.Title>
						<Drawer.Description>{itemData.description}</Drawer.Description>
					</Drawer.Header>
					<CldImage
						width={355 * 2}
						height={200 * 4}
						crop="fill"
						src={itemData.cloudinaryId || 'https://via.placeholder.com/355x200'}
						alt="Description of my image"
						sizes="100vw"
						class={`sm:rounded-lg shadow-md sm:hidden p-0`}
					/>
					<div class="flex flex-row flex-wrap justify-center gap-x-2">
						{#each itemData.productTypes as productType, i}
							<button
								on:click={() => (selectedSizeIdx = i)}
								class={`text-sm h-[50px] mt-2 text-nowrap ${
									productType.isAvailable
										? selectedSizeIdx == i
											? 'bg-black text-white'
											: 'bg-neutral-200'
										: 'line-through opacity-55'
								} rounded-full px-6 py-2`}
							>
								<div class="font-bold">{productType.name}</div>
								<div class="flex flex-row gap-4 text-xs">
									<div>{productType.width} x {productType.height}</div>
									<div class="text-xs">${productType.price / 100}</div>
								</div>
							</button>
						{/each}
					</div>

					<Drawer.Footer>
						<Button
							on:click={() => {
								addToCart({
									productId: itemData.productId,
									productName: itemData.name,
									productImage: itemData.cloudinaryId ?? '',
									productType: {
										width: itemData.productTypes[selectedSizeIdx].width,
										height: itemData.productTypes[selectedSizeIdx].height,
										sku: itemData.productTypes[selectedSizeIdx].sku,
										stripePriceId: itemData.productTypes[selectedSizeIdx].stripePriceId,
										price: itemData.productTypes[selectedSizeIdx].price
									},
									quantity: 1
								});
								handleAddedToCart();
							}}>Add to cart ${(itemData.productTypes[selectedSizeIdx].price / 100).toFixed()}</Button
						>
						<Drawer.Close>Cancel</Drawer.Close>
					</Drawer.Footer>
				</Drawer.Content>
			</Drawer.Root>
		</div>
		<a href={`/products/${itemData.productId}`}>
			<CldImage
				width={355 * 4}
				height={200 * 8}
				crop="fill"
				src={itemData.cloudinaryId || 'https://via.placeholder.com/355x200'}
				alt="Description of my image"
				sizes="100vw"
				class={`sm:rounded-lg shadow-md sm:hidden ${itemData.displayMode == 'sm' && 'hidden'}`}
			/>
			<CldImage
				width={355 * 2}
				height={200 * 4}
				crop="fill"
				src={itemData.cloudinaryId || 'https://via.placeholder.com/355x200'}
				alt="Description of my image"
				sizes="100vw"
				class={`sm:rounded-lg shadow-md sm:hidden ${itemData.displayMode == 'lg' && 'hidden'}`}
			/>
		</a>
	</div>
	<div class="grow flex flex-col items-center">
		<h2
			class={`sm:text-2xl ${
				itemData.displayMode == 'sm' ? 'text-md' : 'text-xl'
			} font-light text-black sm:pb-2`}
		>
			{itemData.name}
		</h2>
		<div class="flex flex-row items-center gap-x-2">
			{#each itemData.tags as tag}
				<div
					class={`${
						itemData.displayMode == 'sm' ? 'text-xs' : 'text-md'
					} text-neutral-600 font-light`}
				>
					{tag}
				</div>
			{/each}
		</div>
		<div class="w-full flex flex-row flex-wrap justify-center py-1 gap-[2px]">
			{#each itemData.productTypes as productType, i}
				{#if productType.isAvailable}
					<Drawer.Root>
						<Drawer.Trigger>
							<button
								on:click={() => (selectedSizeIdx = i)}
								class={`text-xs ${
									productType.isAvailable ? 'bg-white' : 'line-through opacity-55'
								}  rounded-full px-2 py-1`}>{productType.width} x {productType.height}</button
							>
						</Drawer.Trigger>
						<Drawer.Content class="px-2">
							<Drawer.Header>
								<Drawer.Title>{itemData.name}</Drawer.Title>
								<Drawer.Description>{itemData.description}</Drawer.Description>
							</Drawer.Header>
							<CldImage
								width={355 * 2}
								height={200 * 4}
								crop="fill"
								src={itemData.cloudinaryId || 'https://via.placeholder.com/355x200'}
								alt="Description of my image"
								sizes="100vw"
								class={`sm:rounded-lg shadow-md sm:hidden p-0`}
							/>
							<div class="flex flex-row flex-wrap justify-center gap-x-2">
								{#each itemData.productTypes as productType, i}
									<button
										on:click={() => (selectedSizeIdx = i)}
										class={`text-sm h-[50px] mt-2 text-nowrap ${
											productType.isAvailable
												? selectedSizeIdx == i
													? 'bg-black text-white'
													: 'bg-neutral-200'
												: 'line-through opacity-55'
										} rounded-full px-6 py-2`}
									>
										<div class="font-bold">{productType.name}</div>
										<div class="flex flex-row gap-4 text-xs">
											<div>{productType.width} x {productType.height}</div>
											<div class="text-xs">${productType.price / 100}</div>
										</div>
									</button>
								{/each}
							</div>

							<Drawer.Footer>
								<Button
									on:click={() => {
										addToCart({
											productId: itemData.productId,
											productName: itemData.name,
											productImage: itemData.cloudinaryId ?? '',
											productType: {
												width: productType.width,
												height: productType.height,
												sku: productType.sku,
												stripePriceId: productType.stripePriceId,
												price: productType.price
											},
											quantity: 1
										});
										handleAddedToCart();
									}}>Add to cart ${(itemData.productTypes[selectedSizeIdx].price / 100).toFixed()}</Button
								>
								<Drawer.Close>Cancel</Drawer.Close>
							</Drawer.Footer>
						</Drawer.Content>
					</Drawer.Root>
				{:else}
					<span
						class={`text-xs ${
							productType.isAvailable ? 'bg-white' : 'line-through opacity-55'
						}  rounded-full px-2 py-1`}>{productType.width} x {productType.height}</span
					>
				{/if}
			{/each}
		</div>
	</div>
	<div class="sm:flex flex-col hidden gap-y-2 items-center justify-center sm:w-[175px] w-full">
		<Button
			href={`/products/${itemData.productId}`}
			variant="outline"
			class="w-full"
			on:click={navigate}
		>
			<Link class="w-4 h-4 mr-2" />
			More Information</Button
		>
	</div>
</div>

<style>
	.size-selection:hover .pre-text {
		display: none;
	}
	.size-selection:hover .post-text {
		display: flex;
		flex-direction: column;
	}
</style>