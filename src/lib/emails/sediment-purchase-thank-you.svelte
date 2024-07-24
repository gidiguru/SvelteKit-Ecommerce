<script lang="ts">

import { Button, Container, Head, Hr, Html, Img, Preview, Section, Text } from 'svelte-email';

const baseUrl = import.meta.env.VERCEL_URL
	? `https://${import.meta.env.VERCEL_URL}`
	: 'http://localhost:5173';

</script>

		<Html>
			<Head />
			<Hr>Sediment Art: Thank you for your order!</Hr>
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
						<Text class="text-black text-[14px] leading-[24px]">Thank you for ordering!</Text>

						<Text class="text-black text-[14px] leading-[24px]">
							You are one of the very first (among the first 10) to order from us, and we could not
							be more grateful. We have included for free an exclusive piece from a currently
							unreleased collection that will be sent with your order.
						</Text>
						<Text class="text-black text-[14px] leading-[24px]">
							We're thrilled to be getting one of our pieces in your hands. We'll keep you updated
							as we get your order fulfilled.
						</Text>
						<Text class="text-black text-[14px] leading-[24px]">
							Remember that our pieces are made to order, so expect at least a week before your's
							arrives.
						</Text>
						<Text class="text-black text-[14px] leading-[24px]">
							We use Fracture for our fulfillment, so your package will arrive in Fracture
							packaging, as they have the best systems in place for keeping your glass pristine!
						</Text>

						<Text class="text-black text-[14px] leading-[24px]">
							For inquiries, reach us at{' '}
							<a href="mailto:bmd.yt.channel@gmail.com">bmd.yt.channel@gmail.com</a>
						</Text>

						<Text class="text-black text-[12px] leading-[4px] pt-4">Best,</Text>
						<Text class="text-black text-[12px] leading-[4px] ml-1">Ben Davis</Text>
						<Text class="text-black text-[12px] leading-[4px] ml-1 italic">
							Sediment Art Team
						</Text>
						<a
						class="text-[#666666] text-[12px] leading-[24px]"
						href={`${baseUrl}/auth/list/remove?key=${unsubKey}&email=${email}`}
					>
						unsubscribe
				</a>
					</Container>
				</Container>
		</Html>
