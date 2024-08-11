<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	//import { i } from "@inlang/sdk";

	import { superForm } from "sveltekit-superforms/client";
	//import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { userSchema } from "$lib/config/zod-schemas";
	import { AlertTriangle } from "lucide-svelte";
	import { Loader } from "lucide-svelte";
	import { Icons } from "$lib/components/ui/icons/index.js";

	export let data;

	const resetPasswordSchema = userSchema.pick({ email: true });
	const { form, errors, enhance, delayed, message } = superForm(data.form, {
		taintedMessage: null,
		validators: resetPasswordSchema,
		delayMs: 0
	});

	import { cn } from "$lib/utils";

	// $: termsValue = $form.terms as Writable<boolean>;

	let className: string | undefined | null = undefined;
	export { className as class };

	let isLoading = false;
	async function onSubmit() {
		isLoading = true;

		setTimeout(() => {
			isLoading = false;
		}, 3000);
	}
</script>

<form method="POST" use:enhance>
	<!-- on:submit|preventDefault={onSubmit} -->
	<Card.Root>
		<Card.Header>
			<Card.Title />
			<Card.Description />
		</Card.Header>
		<Card.Content class="space-y-2">
			{#if $errors._errors}
				<aside class="alert variant-filled-error mt-6">
					<!-- Icon -->
					<div><AlertTriangle size="42" /></div>
					<!-- Message -->
					<div class="alert-message">
						<h3 class="h3">{("signinProblem")}</h3>
						<p>{$errors._errors}</p>
					</div>
				</aside>
			{/if}
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">
					{("auth.password.reset.sendResetEmail")}
				</h1>
				<p class="text-sm text-muted-foreground">
					Enter your email below to reset your password.
				</p>
			</div>
			<div class={cn("grid gap-6", className)} {...$$restProps}>
				<div class="grid gap-2">
					<div class="grid gap-1 mt-6">
						<label
							class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							<span class="sr-only">{("email")}</span>
							<input
								id="email"
								name="email"
								type="email"
								placeholder={("email")}
								autocomplete="email"
								data-invalid={$errors.email}
								bind:value={$form.email}
								class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
								class:input-error={$errors.email}
								autocapitalize="none"
								autocorrect="off"
								disabled={isLoading}
							/>
							{#if $errors.email}
								<small>{$errors.email}</small>
							{/if}
						</label>
						{#if $message}
							<div class="message">
								<small>{$message}</small>
							</div>
						{/if}
					</div>

					<Button
						disabled={isLoading}
						type="submit"
						class="btn variant-filled-primary w-full"
					>
						{#if isLoading}
							<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
						{/if}
						{#if $delayed}
							<Loader />
						{:else}
							{("auth.password.reset.sendResetEmail")}
						{/if}
					</Button>
				</div>
			</div>
		</Card.Content>
		<Card.Footer />
	</Card.Root>
</form>