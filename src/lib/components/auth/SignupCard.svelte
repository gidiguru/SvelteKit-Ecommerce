<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	//import { i } from "@inlang/sdk-js";
	import { superForm } from "sveltekit-superforms/client";
	import type { SuperValidated } from "sveltekit-superforms";
	import { z } from "zod";
	import { AlertTriangle, Loader } from "lucide-svelte";
	import { Icons } from "$lib/components/ui/icons/index.js";
	import { cn } from "$lib/utils";
	import { Label } from "$lib/components/ui/label/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Checkbox } from "$lib/components/ui/checkbox/index.js";


	// Temporary i18n function (replace with your preferred i18n solution)
	//const i = (key: string) => key;

export let data;

	// Define the schema
	const signUpSchema = z.object({
		firstName: z.string().min(1, "First name is required"),
		lastName: z.string().min(1, "Last name is required"),
		email: z.string().email("Invalid email address"),
		password: z.string().min(8, "Password must be at least 8 characters"),
		terms: z.boolean().refine((val) => val === true, {
			message: "You must accept the terms and conditions",
		}),
	});

	// Define the type for the form data
	type FormData = z.infer<typeof signUpSchema>;

	// Initialize the form without Zod validation
	const { form, errors, enhance, delayed } = superForm<FormData>(data.signinForm, {
	taintedMessage: null,
	delayMs: 0,
});



let isLoading = false;
let validationErrors: Partial<Record<keyof FormData, string[]>> = {};

$: isSubmitDisabled = !$form.terms || $delayed;

function validateForm(): boolean {
	const result = signUpSchema.safeParse($form);
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

<form method="POST" action="?/signup" use:enhance>
	<Card.Root>
		<Card.Header class="space-y-1 items-center">
			<Card.Title class="text-2xl" />
			<Card.Description />
		</Card.Header>
		<Card.Content class="grid gap-4">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">
					{("signup")}
				</h1>
				<p class="text-sm text-muted-foreground">
					Enter your email below to create your account
				</p>
			</div>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						<span class="sr-only">{("First Name")}</span>
						<input
							id="firstName"
							name="firstName"
							type="text"
							placeholder={("FirstName")}
							autocomplete="given-name"
							data-invalid={$errors.firstName}
							bind:value={$form.firstName}
							class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							class:input-error={$errors.firstName}
						/>
						{#if $errors.firstName}
							<small class="text-red-600">{$errors.firstName}</small>
						{/if}
					</label>
				</div>
				<div class="grid gap-2">
					<label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						<span class="sr-only">{("lastName")}</span>
						<input
							id="lastName"
							name="lastName"
							type="text"
							placeholder={("LastName")}
							autocomplete="family-name"
							data-invalid={$errors.lastName}
							bind:value={$form.lastName}
							class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							class:input-error={$errors.lastName}
						/>
						{#if $errors.lastName}
							<small class="text-red-600">{$errors.lastName}</small>
						{/if}
					</label>
				</div>
				<div class="grid gap-2">
					<label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						<span class="sr-only">{("email")}</span>
						<input
							id="signupEmail"
							name="email"
							type="email"
							placeholder={("Email")}
							autocomplete="email"
							data-invalid={$errors.email}
							bind:value={$form.email}
							class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							class:input-error={$errors.email}
						/>
						{#if $errors.email}
							<small class="text-red-600">{$errors.email}</small>
						{/if}
					</label>
				</div>
				<div class="grid gap-2">
					<label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						<span class="sr-only">{("Password")}</span>
						<input
							id="signupPassword"
							name="password"
							type="password"
							placeholder={("password")}
							data-invalid={$errors.password}
							bind:value={$form.password}
							class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							class:input-error={$errors.password}
						/>
						{#if $errors.password}
							<small class="text-red-600">{$errors.password}</small>
						{/if}
					</label>
				</div>
				<div class="grid gap-2">
					<div class="flex items-center space-x-2">
						<Checkbox
							id="terms"
							name="terms"
							class="checkbox"
							bind:checked={$form.terms}
							aria-labelledby="terms-label"
						/>
						<Label
							id="terms-label"
							for="terms"
							class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							<span class="ml-1">
								I accept the
								<a href="/terms" class="text-primaryHover underline">terms</a>
								and
								<a href="/privacy" class="text-primaryHover underline">privacy policy</a>
							</span>
						</Label>
					</div>
				</div>
				<div class="grid pt-4">
					<Button
						type="submit"
						disabled={!$form.terms}
						class="btn variant-filled-primary w-full"
					>
						{#if $delayed}
							<div class="w-4 h-4 bg-amber-600" />
						{:else}
							{("signup")}
						{/if}
					</Button>
				</div>
			</div>
			<div class="relative">
				<div class="absolute inset-0 flex items-center">
					<span class="w-full border-t" />
				</div>
				<div class="relative flex justify-center text-xs uppercase">
					<span class="bg-card px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>
			<div class="grid grid-cols-2 gap-6">
				<Button href="/auth/login/google" variant="outline">
					<Icons.google class="mr-2 h-4 w-4" />
					Google
				</Button>
				<Button href="/auth/login/github" variant="outline">
					<Icons.gitHub class="mr-2 h-4 w-4" />
					Github
				</Button>
			</div>
		</Card.Content>
		<Card.Footer />
	</Card.Root>
</form>