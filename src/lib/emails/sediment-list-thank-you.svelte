<script lang="ts">

import { Button, Container, Head, Hr, Html, Img, Preview, Section, Text } from 'svelte-email';

export let unsubKey: string;
export let email: string;


const baseUrl = import.meta.env.VERCEL_URL
	? `https://${import.meta.env.VERCEL_URL}`
	: 'http://localhost:5173';




</script>


		<Html>
			<Head />
			<Hr>Welcome to Sediment Art!</Hr>
				<Container class="bg-white my-auto mx-auto font-sans px-2">
					<Container class="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
						<Section class="mt-[32px]">
							<Img
								src="https://res.cloudinary.com/insiderviz/image/upload/f_auto,q_auto/ly9xqkjkn8rat1l3lxex"
								alt="Sediment Art"
								width="300"
								height="102"
								class="my-0 mx-auto"
							/>
						</Section>
						<Text class="text-black text-[14px] leading-[24px]">Welcome to Sediment Art! </Text>
						<Text class="text-black text-[14px] leading-[24px]">
							Dive into a world of captivating natural art, of rocks expertly photographed that are
							millions of years old, encased in glass.
						</Text>
						<Text class="text-black text-[14px] leading-[24px]">
							We'll keep you updated for when new drops come and new images are made available!
						</Text>

						<Text class="text-black text-[14px] leading-[24px]">
							For inquiries, reach us at{' '}
							<a href="mailto:bmd.yt.channel@gmail.com">bmd.yt.channel@gmail.com </a>
						</Text>

						<Text class="text-black text-[12px] leading-[4px] pt-4">Best,</Text>
						<Text class="text-black text-[12px] leading-[4px] ml-1">Ben Davis</Text>
						<Text class="text-black text-[12px] leading-[4px] ml-1 italic">
							Sediment Art Team
						</Text>
						<Hr class="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
						<a
							class="text-[#666666] text-[12px] leading-[24px]"
							href={`${baseUrl}/auth/list/remove?key=${unsubKey}&email=${email}`}
						>
							unsubscribe
					</a>
					</Container>
				</Container>
		</Html>

