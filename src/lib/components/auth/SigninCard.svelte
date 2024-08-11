<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { superForm } from "sveltekit-superforms/client";
	import { z } from 'zod';
	import { AlertTriangle, Loader } from "lucide-svelte";
	import { Icons } from "$lib/components/ui/icons/index.js";
	import { cn } from "$lib/utils";

	// Temporary i18n function (replace with your preferred i18n solution)
	//const i = (key: string) => key;

	export let data;

	// Define the sign-in schema
	const signInSchema = z.object({
		email: z.string().email(),
		password: z.string().min(8),
	});

	// Define the type for the form data
	type FormData = z.infer<typeof signInSchema>;

	// Initialize the form without Zod validation
	const { form, errors, enhance, delayed } = superForm<FormData>(data.signinForm, {
		taintedMessage: null,
		delayMs: 0,
	});

	let className: string | undefined | null = undefined;
	export { className as class };

	let isLoading = false;
	let validationErrors: Partial<Record<keyof FormData, string[]>> = {};

	$: isSubmitDisabled = isLoading || $delayed;

	function validateForm(): boolean {
		const result = signInSchema.safeParse($form);
		if (!result.success) {
			validationErrors = result.error.formErrors.fieldErrors;
			return false;
		}
		validationErrors = {};
		return true;
	}

	function handleSubmit() {
		if (!validateForm()) {
			return;
		}
		isLoading = true;
		// Your form submission logic here
		setTimeout(() => {
			isLoading = false;
		}, 3000);
	}

	function getFirstError(field: keyof FormData): string | undefined {
		return validationErrors[field]?.[0];
	}
</script>

<form method="POST" action="?/signin" use:enhance on:submit|preventDefault={handleSubmit}>
	<Card.Root>
		<Card.Header>
			<Card.Title>{("signin")}</Card.Title>
			<Card.Description>Enter your email below to sign in.</Card.Description>
		</Card.Header>
		<Card.Content class="space-y-4">
			<div class={cn("grid gap-4", className)} {...$$restProps}>
				<label class="grid gap-1">
					<span class="sr-only">{("email")}</span>
					<input
						id="signinEmail"
						name="email"
						type="email"
						autocomplete="email"
						bind:value={$form.email}
						class="input"
						class:input-error={validationErrors.email}
						autocapitalize="none"
						autocorrect="off"
						disabled={isSubmitDisabled}
					/>
					{#if validationErrors.email}
						<small class="text-red-600">{getFirstError('email')}</small>
					{/if}
				</label>

				<label class="grid gap-1">
					<span class="sr-only">{("password")}</span>
					<input
						id="signinPassword"
						name="password"
						type="password"
						bind:value={$form.password}
						class="input"
						class:input-error={validationErrors.password}
						disabled={isSubmitDisabled}
					/>
					{#if validationErrors.password}
						<small class="text-red-600">{getFirstError('password')}</small>
					{/if}
				</label>

				{#if $errors._errors}
					<div class="alert variant-filled-error mt-4 content-center">
						<div class="alert-message text-center flex items-center justify-center gap-2">
							<AlertTriangle size="24" class="text-red-600" />
							<p class="text-red-600">{$errors._errors}</p>
						</div>
					</div>
				{/if}

				<input hidden name="type" value="signin" />

				<Button
					disabled={isSubmitDisabled}
					type="submit"
					class="btn variant-filled-primary w-full"
				>
					{#if $delayed}
						<Loader class="mr-2 h-4 w-4 animate-spin" />
					{:else if isLoading}
						<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
					{/if}
					{("signin")}
				</Button>

				<div class="text-center">
					<a href="/auth/password/reset" class="font-semibold">{("forgotPassword")}</a>
				</div>
			</div>

			<div class="relative">
				<div class="absolute inset-0 flex items-center">
					<span class="w-full border-t" />
				</div>
				<div class="relative flex justify-center text-xs uppercase">
					<span class="bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>

			<Button variant="outline" type="button" disabled={isSubmitDisabled}>
				{#if isLoading}
					<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
				{:else}
					<Icons.gitHub class="mr-2 h-4 w-4" />
				{/if}
				Github
			</Button>

			<p class="text-center text-sm text-muted-foreground">
				By clicking continue, you agree to our
				<a href="/terms" class="underline underline-offset-4 hover:text-primary">Terms of Service</a>
				and
				<a href="/privacy" class="underline underline-offset-4 hover:text-primary">Privacy Policy</a>.
			</p>
		</Card.Content>
	</Card.Root>
</form>