<script lang="ts">
    import { CldImage } from 'svelte-cloudinary';
    import Button from './ui/button/button.svelte';
    import { Link } from 'lucide-svelte';
    import { goto, preloadData, pushState } from '$app/navigation';
    import { addToCart } from '$lib/client/cart';
    import * as Drawer from './ui/drawer';

    type ProductType = {
        name: string;
        width: number;
        height: number;
        code: string;
        price: number;
        isAvailable: boolean;
        currency: string;
    };

    export let itemData: {
        id: string;
        name: string;
        desc: string;
        baseCurrency: string;
        gradientColorStart: string;
        gradientColorVia: string;
        gradientColorStop: string;
        tags: { name: string; desc: string }[];
        images: {
            cloudinaryId: string;
            width: number;
            height: number;
            isVertical: boolean;
            order: number;
            isPrimary: boolean;
        }[];
        types: ProductType[]; // Add this line to include the types property
    };

    export let displayMode: 'sm' | 'lg' = 'lg';

    const handleAddedToCart = () => {
        const el = document.getElementById('added-to-cart')
        el?.classList.remove('hidden')
        setTimeout(() => {
            el?.classList.add('hidden')
        }, 4000);
    }

    let selectedSizeIdx = itemData.types.findIndex(type => type.isAvailable);
    if (selectedSizeIdx === -1) selectedSizeIdx = 0;

    const primaryImage = itemData.images.find(img => img.isPrimary) || itemData.images[0];

    function handleAddToCart(typeIndex: number) {
        const selectedType = itemData.types[typeIndex];
        addToCart({
            productId: itemData.id,
            productName: itemData.name,
            productImage: primaryImage?.cloudinaryId ?? '',
            size: {
                width: selectedType.width,
                height: selectedType.height,
                code: selectedType.code,
                price: selectedType.price
            },
            quantity: 1
        });
        handleAddedToCart();
    }

    async function navigate(e: any) {
        if (e.metaKey || innerWidth < 640) return;
        e.preventDefault();
        const { href } = e.currentTarget;
        const result = await preloadData(href);
        if (result.type === 'loaded' && result.status === 200) {
            pushState(href, { selected: result.data });
        } else {
            goto(href);
        }
    }
</script>

<!-- Large screen view -->
<div
	class="rounded-lg w-1/2 hidden sm:flex p-2 relative hover:scale-[102%] transition-all duration-[400ms] cursor-pointer"
>
	<a href={'/products/' + itemData.id}>
		<div
			class="absolute w-full h-full top-2 left-2 bg-gradient-to-br from-0% to-40% {itemData.gradientColorStart} {itemData.gradientColorVia} {itemData.gradientColorStop} rounded-lg"
		/>
		<CldImage
			width={355 * 4}
			height={200 * 4}
			crop="fill"
			src={primaryImage?.cloudinaryId || 'https://via.placeholder.com/355x200'}
			alt={itemData.name}
			sizes="100vw"
			class="sm:rounded-lg shadow-md hidden sm:flex w-full"
		/>
	</a>

	<div class="absolute top-5 left-5 font-jura w-full">
		<div class="text-gray-300 text-md">{itemData.tags[0]?.name}</div>
		<div class="text-white text-4xl">{itemData.name}</div>
	</div>
	<div class="absolute bottom-5 left-5 flex flex-row items-end">
		{#each itemData.types as type, i}
			<button
				disabled={!type.isAvailable}
				on:click={() => handleAddToCart(i)}
				class={`${
					type.isAvailable
						? 'bg-neutral-100/60 hover:bg-neutral-100/90 hover:drop-shadow-lg hover:scale-110 transition-all duration-[200ms] size-selection hover:px-10 hover:py-3'
						: 'bg-neutral-300/40 line-through text-gray-800'
				}  px-3 py-2 mx-1 rounded-full text-sm `}
			>
				<div class="pre-text transition-all duration-300">{type.name}</div>
				<div class="post-text hidden transition-all duration-300">
					<div>Buy <span class="font-bold font-lg">{type.name}</span></div>
					<div class="font-light text-xs">{type.width} x {type.height}"</div>
				</div>
			</button>
		{/each}
	</div>
</div>

<!-- Small screen view -->
<div
	class={`flex sm:hidden flex-col sm:items-center sm:gap-x-8 sm:gap-y-0 gap-y-2 p-1 sm:p-4 ${
		displayMode == 'sm' ? 'w-1/2' : 'w-full'
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
						<!-- SVG path data -->
					</svg>
				</Drawer.Trigger>
				<Drawer.Content class="px-2">
					<Drawer.Header>
						<Drawer.Title>{itemData.name}</Drawer.Title>
						<Drawer.Description>{itemData.desc}</Drawer.Description>
					</Drawer.Header>
					<CldImage
						width={355 * 2}
						height={200 * 4}
						crop="fill"
						src={primaryImage?.cloudinaryId || 'https://via.placeholder.com/355x200'}
						alt={itemData.name}
						sizes="100vw"
						class="sm:rounded-lg shadow-md sm:hidden p-0"
					/>
					<div class="flex flex-row flex-wrap justify-center gap-x-2">
						{#each itemData.types as type, i}
							<button
								on:click={() => (selectedSizeIdx = i)}
								class={`text-sm h-[50px] mt-2 text-nowrap ${
									type.isAvailable
										? selectedSizeIdx == i
											? 'bg-black text-white'
											: 'bg-neutral-200'
										: 'line-through opacity-55'
								} rounded-full px-6 py-2`}
							>
								<div class="font-bold">{type.name}</div>
								<div class="flex flex-row gap-4 text-xs">
									<div>{type.width} x {type.height}</div>
									<div class="text-xs">{type.currency} {type.price / 100}</div>
								</div>
							</button>
						{/each}
					</div>

					<Drawer.Footer>
						<Button on:click={() => handleAddToCart(selectedSizeIdx)}>
							Add to cart {itemData.types[selectedSizeIdx].currency} {(itemData.types[selectedSizeIdx].price / 100).toFixed(2)}
						</Button>
						<Drawer.Close>Cancel</Drawer.Close>
					</Drawer.Footer>
				</Drawer.Content>
			</Drawer.Root>
		</div>
		<a href={`/products/${itemData.id}`}>
			<CldImage
				width={355 * 4}
				height={200 * 8}
				crop="fill"
				src={primaryImage?.cloudinaryId || 'https://via.placeholder.com/355x200'}
				alt={itemData.name}
				sizes="100vw"
				class={`sm:rounded-lg shadow-md sm:hidden ${displayMode == 'sm' && 'hidden'}`}
			/>
			<CldImage
				width={355 * 2}
				height={200 * 4}
				crop="fill"
				src={primaryImage?.cloudinaryId || 'https://via.placeholder.com/355x200'}
				alt={itemData.name}
				sizes="100vw"
				class={`sm:rounded-lg shadow-md sm:hidden ${displayMode == 'lg' && 'hidden'}`}
			/>
		</a>
	</div>
	<!-- Product information -->
	<div class="grow flex flex-col items-center">
		<h2
			class={`sm:text-2xl ${
				displayMode == 'sm' ? 'text-md' : 'text-xl'
			} font-light text-black sm:pb-2`}
		>
			{itemData.name}
		</h2>
		<div class="flex flex-row items-center gap-x-2">
			{#each itemData.tags as tag}
				<div
					class={`${
						displayMode == 'sm' ? 'text-xs' : 'text-md'
					} text-neutral-600 font-light`}
				>
					{tag.name}
				</div>
			{/each}
		</div>
		<div class="w-full flex flex-row flex-wrap justify-center py-1 gap-[2px]">
			{#each itemData.types as type, i}
				{#if type.isAvailable}
					<Drawer.Root>
						<Drawer.Trigger>
							<button
								on:click={() => (selectedSizeIdx = i)}
								class="text-xs bg-white rounded-full px-2 py-1"
							>
								{type.width} x {type.height}
							</button>
						</Drawer.Trigger>
						<Drawer.Content class="px-2">
							<!-- Drawer content (same as above) -->
						</Drawer.Content>
					</Drawer.Root>
				{:else}
					<span
						class="text-xs line-through opacity-55 rounded-full px-2 py-1"
					>
						{type.width} x {type.height}
					</span>
				{/if}
			{/each}
		</div>
	</div>
	<div class="sm:flex flex-col hidden gap-y-2 items-center justify-center sm:w-[175px] w-full">
		<Button
			href={`/products/${itemData.id}`}
			variant="outline"
			class="w-full"
			on:click={navigate}
		>
			<Link class="w-4 h-4 mr-2" />
			More Information
		</Button>
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