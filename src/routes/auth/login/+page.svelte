<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Github, Chrome, Star } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';

</script>

<Card.Root class="w-[400px]">
	<Card.Header>
		<Card.Title>Login/Signup</Card.Title>
		<Card.Description>Sign in to view your orders and make more!</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="flex flex-col justify-center items-center w-full gap-4">
			<Button href="/auth/signin" class="w-full">
				<Star class="mr-2 h-4 w-4" />
				Log In or Sign Up
			</Button>
			<Button href="/auth/login/google" class="w-full">
				<Chrome class="mr-2 h-4 w-4" />
				Log In With Google
			</Button>
			<Button href="/auth/login/github" class="w-full">
				<Github class="mr-2 h-4 w-4" />
				Log In With Github
			</Button>
		</div>
	</Card.Content>
</Card.Root>
