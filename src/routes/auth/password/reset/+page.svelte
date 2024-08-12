<script lang="ts">
	import { superForm } from "sveltekit-superforms/client";
	import { userSchema } from "$lib/config/zod-schemas";
	import { AlertTriangle, Loader } from "lucide-svelte";
	import { i } from "@inlang/sdk-js";
	import ResetPasswordCard from "$lib/components/auth/ResetPasswordCard.svelte";
	import { onMount, onDestroy, afterUpdate } from 'svelte';

	export let data;

	console.log('ResetPasswordPage: Component initialized', { data });

	onMount(() => {
		console.log('ResetPasswordPage: Component mounted');
	});

	onDestroy(() => {
		console.log('ResetPasswordPage: Component destroyed');
	});

	afterUpdate(() => {
		console.log('ResetPasswordPage: Component updated');
	});
</script>

<div class="w-[350px] mx-auto py-10">
	<ResetPasswordCard {data} />
</div>