<script lang="ts">
	import * as Tabs from "$lib/components/ui/tabs";
	import SigninCard from "$lib/components/auth/SigninCard.svelte";
	import SignupCard from "$lib/components/auth/SignupCard.svelte";
	//import { i } from "@inlang/sdk-js";

	let isLoading = false;
	async function onSubmit() {
		isLoading = true;

		setTimeout(() => {
			isLoading = false;
		}, 3000);
	}

	export let data;
</script>

<div class="p-4 sm:p-8">
	<div class="min-w-[300px] max-w-sm mx-auto">
		<Tabs.Root value="signin" class="w-full">
			<Tabs.List class="grid w-full grid-cols-2">
				<Tabs.Trigger value="signin">{("signin")}</Tabs.Trigger>
				<Tabs.Trigger value="signup">{("signup")}</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="signin">
				<SigninCard {data} />
			</Tabs.Content>
			<Tabs.Content value="signup">
				<SignupCard {data} />
			</Tabs.Content>
		</Tabs.Root>
	</div>
</div>