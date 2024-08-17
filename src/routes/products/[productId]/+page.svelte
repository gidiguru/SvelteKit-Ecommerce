<script lang="ts">
    import Button from '$lib/components/ui/button/button.svelte';
    import { CldImage } from 'svelte-cloudinary';
    import { addToCart } from '$lib/client/cart';
    import { CldOgImage } from 'svelte-cloudinary';
    import { onMount } from 'svelte';

    type ProductType = {
        width: number;
        height: number;
        code: string;
        gatewayPriceId: string;
        price: number;
        isAvailable: boolean;
        name: string;
    };

    type Product = {
        id: string;
        name: string;
        desc: string;
        baseCurrency: string;
        gradientColorStart: string;
        gradientColorVia: string;
        gradientColorStop: string;
        types: ProductType[];
    };

    export let data: {
        product: Product | undefined;
        productImages: Array<{ cloudinaryId: string }> | undefined;
        isSoldOut: boolean;
    };

    $: selectedSizeIdx = data.product?.types?.findIndex(type => type.isAvailable) ?? -1;

    function getSelectedProductType(): ProductType | null {
        if (data.product && Array.isArray(data.product.types) && selectedSizeIdx !== -1) {
            return data.product.types[selectedSizeIdx] as ProductType;
        }
        return null;
    }

    const handleAddedToCart = () => {
        const el = document.getElementById('added-to-cart');
        el?.classList.remove('hidden');
        setTimeout(() => {
            el?.classList.add('hidden');
        }, 4000);
    };

    // for top section spinny thing
    let curIdx = 0;
    let scrollSection: HTMLElement;

    function handleScrollTop(e: Event) {
        if (e.target instanceof HTMLElement) {
            curIdx = Math.round(e.target.scrollLeft / window.screen.width);
        }
    }

    function handleSetTopScroll(idx: number) {
        if (scrollSection) {
            scrollSection.scrollLeft = idx * window.screen.width;
        }
    }

    // Added logging
    onMount(() => {
        console.log('Product data:', data);
        console.log('Is product sold out?', data.isSoldOut);
        console.log('Available product types:', data.product?.types.filter(type => type.isAvailable));
        console.log('Selected size index:', selectedSizeIdx);
    });

    $: {
        console.log('Selected product type:', getSelectedProductType());
        console.log('Current isSoldOut status:', data.isSoldOut);
    }
</script>

<svelte:head>
    <title>{data.product?.name || 'Product'} | Synergetics Shop</title>
    <meta name="description" content={data.product?.desc || ''} />
</svelte:head>

<div class="grow flex flex-col sm:pt-10 w-full">
    <!-- MOBILE -->
    <div class="w-full flex flex-col justify-center items-center gap-y-2 overflow-hidden sm:hidden">
        <!-- images section mobile -->
        <div class="w-screen overflow-hidden relative">
            <div
                class="overflow-x-auto snap-x snap-mandatory scroll-smooth flex slides w-full"
                on:scroll={handleScrollTop}
                bind:this={scrollSection}
            >
                {#each data.productImages || [] as image}
                    <div class="snap-start w-full transform origin-center shrink-0">
                        <CldImage src={image.cloudinaryId} width={1000} height={1000} objectFit="cover" />
                    </div>
                {/each}
            </div>
            <div class="absolute bottom-3 left-1/2 translate-x-[-50%] flex gap-x-2">
                {#each data.productImages || [] as _, i}
                    <button
                        on:click={() => handleSetTopScroll(i)}
                        class={`w-[10px] h-[10px] ${
                            i === curIdx ? 'bg-white' : ''
                        } rounded-full border border-white`}
                    />
                {/each}
            </div>
        </div>
    </div>
    <!-- DESKTOP -->
    <div class="h-full sm:mx-10 mx-4 sm:grid sm:grid-cols-4 flex flex-col">
        <div class="col-span-3 p-4 relative h-[85vh] hidden sm:flex">
            {#each data.productImages || [] as im, i}
                <CldImage
                    src={im.cloudinaryId}
                    width={1500}
                    height={1200}
                    objectFit="cover"
                    class={`rounded-lg h-full ${curIdx == i ? 'flex' : 'hidden'}`}
                />
            {/each}
            <!-- ... (navigation buttons remain the same) ... -->
        </div>

        <div class="sm:p-4 py-6 flex flex-col gap-4 sm:h-[85vh] sm:overflow-scroll no-scroll">
            <!-- ... (product information display remains the same) ... -->

            <Button
                class="drop-shadow-md hover:bg-black text-lg p-7 font-light"
                disabled={data.isSoldOut || !getSelectedProductType()}
                on:click={() => {
                    const selectedType = getSelectedProductType();
                    if (selectedType && data.product) {
                        addToCart({
                            productId: data.product.id,
                            productName: data.product.name,
                            productImage: data.productImages?.[0]?.cloudinaryId || '',
                            productType: {
                                width: selectedType.width,
                                height: selectedType.height,
                                code: selectedType.code,
                                price: selectedType.price,
                                stripePriceId: selectedType.gatewayPriceId
                            },
                            quantity: 1
                        });
                        handleAddedToCart();
                    }
                }}
            >
                <div
                    class="text-lg bg-clip-text"
                    style={`background-image: linear-gradient(to right bottom, ${data.product?.gradientColorStart || ''}, ${data.product?.gradientColorVia || ''}, ${data.product?.gradientColorStop || ''} );`}
                >
                    {#if data.isSoldOut || !getSelectedProductType()}
                        Sold Out
                    {:else}
                        Add to Cart ${(getSelectedProductType()?.price ?? 0 / 100).toFixed(2)}
                    {/if}
                </div>
            </Button>
        </div>
    </div>
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

