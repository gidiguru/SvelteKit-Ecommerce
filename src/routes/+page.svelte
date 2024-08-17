<script lang="ts">
    import MobileLogo from '$lib/client/images/techshopng-logo.jpg';
    import ImageCollection from '$lib/components/ImageCollection.svelte';
    import { CldImage } from 'svelte-cloudinary';

    export let data;
</script>

<main class="grow">
    <div class="w-full relative">
        <div class="z-10 absolute top-[40%] left-0 text-white w-full flex justify-center items-center flex-col gap-y-2">
            <div class="flex flex-row gap-4 items-center">
                <img src={MobileLogo} alt="TechShopNG" class="h-[40px] sm:hidden flex" />
                <h2 class="sm:text-5xl text-3xl font-jura">Tech Shop</h2>
            </div>
            <h4 class="font-light sm:text-3xl text-xl font-jura">Cutting the edge of Technology</h4>
            <a class="uppercase bg-black mt-14 px-7 py-3 font-light" href="/products" aria-label="Shop now for the latest tech products">
                shop now
            </a>
        </div>

        <CldImage
            src={'cld-sample-2'}
            width={1920}
            height={900}
            sizes="100vw"
            class="object-cover w-full h-[80vh] hidden sm:block transition-all ease-in-out duration-300 bg-black"
            alt="home banner"
        />
        <CldImage
            src={'cld-sample-2'}
            width={700}
            height={1000}
            sizes="100vw"
            class="object-cover w-full h-[80vh] sm:hidden block transition-all ease-in-out duration-300 bg-black"
            alt="home banner"
        />
    </div>

    {#each data.collections as collection}
        <ImageCollection collectionData={collection} />
    {/each}
</main>