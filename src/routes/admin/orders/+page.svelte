<script lang="ts">
	import { MoreHorizontal } from 'lucide-svelte';
	import { deserialize } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Drawer from '$lib/components/ui/drawer';
	import type { PaystackCustomer, CustomerDetails, OrderDetails } from '$lib/server/paystack'; // Import the new type

	export let data;

	async function handleSetStatus(orderId: string, status: string, paymentGateway: 'stripe' | 'paystack') {
		const formData = new FormData();

		formData.append('orderId', orderId);
		formData.append('status', status);
		formData.append('paymentGateway', paymentGateway);

		const response = await fetch(`/admin/orders?/setStatus`, {
			method: 'POST',
			body: formData
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			await invalidateAll();
		}
	}

	function truncateString(str: string, maxLength: number) {
		if (str.length > maxLength) {
			return str.slice(0, maxLength) + '...';
		}
		return str;
	}
// Type guard for CustomerDetails
function isCustomerDetails(customer: any): customer is CustomerDetails {
    return customer && typeof customer.name === 'string';
}

// Type guard for PaystackCustomer
function isPaystackCustomer(customer: any): customer is PaystackCustomer {
    return customer && typeof customer.email === 'string' && (typeof customer.first_name === 'string' || typeof customer.last_name === 'string');
}

// Update the getCustomerName function
function getCustomerName(order: Partial<OrderDetails>): string {
    const customer = order.customerDetails;
    if (isCustomerDetails(customer)) {
        return customer.name || 'N/A';
    } else if (isPaystackCustomer(customer)) {
        return `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || 'N/A';
    }
    return 'N/A';
}

// Update the getCustomerEmail function
function getCustomerEmail(order: Partial<OrderDetails>): string {
    if (order.email) {
        return order.email;
    }
    const customer = order.customerDetails;
    if (isCustomerDetails(customer) || isPaystackCustomer(customer)) {
        return customer.email || 'N/A';
    }
    return 'N/A';
}

// Update the getCustomerAddress function
function getCustomerAddress(order: Partial<OrderDetails>): string {
    const customer = order.customerDetails;
    if (isCustomerDetails(customer) && customer.address) {
        const { line1, line2, city, state, postal_code, country } = customer.address;
        return [line1, line2, city, state, postal_code, country].filter(Boolean).join(', ') || 'N/A';
    }
    return 'N/A';
}

// Update the getCustomerPhone function
function getCustomerPhone(order: Partial<OrderDetails>): string {
    const customer = order.customerDetails;
    if (isCustomerDetails(customer) || isPaystackCustomer(customer)) {
        return customer.phone || 'N/A';
    }
    return 'N/A';
}

	function getOrderId(order: any) {
		return order.paymentGateway === 'stripe' ? order.stripeOrderId : order.paystackTransactionId;
	}
	

	let openCustomerViewIdx = -1;
	$: customerViewOpen = openCustomerViewIdx >= 0;
</script>

<div class="rounded-md grow p-4">
	<Table.Root class="border-0">
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">ID</Table.Head>
				<Table.Head>Status</Table.Head>
				<Table.Head>Email</Table.Head>
				<Table.Head>Date</Table.Head>
				<Table.Head>Gateway</Table.Head>
				<Table.Head class="text-right">Amount</Table.Head>
				<Table.Head>Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.orders as order, i}
				<Table.Row>
					<Table.Cell class="font-medium">{truncateString(getOrderId(order), 10)}</Table.Cell>
					<Table.Cell>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger class="hover:text-underline">{order.status}</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<DropdownMenu.Group>
									<DropdownMenu.Label>Set status</DropdownMenu.Label>
									<DropdownMenu.Separator />
									{#each ['new', 'placed', 'packaged', 'sent'] as status}
										<DropdownMenu.Item on:click={() => handleSetStatus(getOrderId(order), status, order.paymentGateway)}>
											{status}
										</DropdownMenu.Item>
									{/each}
								</DropdownMenu.Group>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Table.Cell>
					<Table.Cell>{order.email}</Table.Cell>
					<Table.Cell>{order.timestamp.toLocaleDateString()}</Table.Cell>
					<Table.Cell>{order.paymentGateway}</Table.Cell>
					<Table.Cell class="text-right">${(order.totalPrice / 100).toFixed(2)}</Table.Cell>

					<Table.Cell>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger asChild let:builder>
								<Button variant="ghost" builders={[builder]} size="icon" class="relative w-8 h-8 p-0">
									<span class="sr-only">Open menu</span>
									<MoreHorizontal class="w-4 h-4" />
								</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<DropdownMenu.Group>
									<DropdownMenu.Label>Actions</DropdownMenu.Label>
									<DropdownMenu.Item on:click={() => navigator.clipboard.writeText(getOrderId(order))}>
										Copy Order ID
									</DropdownMenu.Item>
								</DropdownMenu.Group>
								<DropdownMenu.Separator />
								<DropdownMenu.Item on:click={() => (openCustomerViewIdx = i)}>
									View customer
								</DropdownMenu.Item>
								<DropdownMenu.Item>View payment details</DropdownMenu.Item>
								<DropdownMenu.Item>View products</DropdownMenu.Item>
								<DropdownMenu.Item on:click={() => goto(`/admin/orders/${getOrderId(order)}`)}>
									Order details
								</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>

<Drawer.Root bind:open={customerViewOpen} onClose={() => (openCustomerViewIdx = -1)}>
    <Drawer.Content>
        <Drawer.Header>
            <Drawer.Title>Customer Info</Drawer.Title>
            <Drawer.Description>
                {#if customerViewOpen && data.orders[openCustomerViewIdx]}
        {@const order = data.orders[openCustomerViewIdx]}
        <h2><b>Name:</b> {getCustomerName(order)}</h2>
        <h2><b>Email:</b> {getCustomerEmail(order)}</h2>
        <h2><b>Address:</b> {getCustomerAddress(order)}</h2>
        <h2><b>Phone:</b> {getCustomerPhone(order)}</h2>
    {/if}
            </Drawer.Description>
        </Drawer.Header>
        <Drawer.Footer>
            <Drawer.Close class="w-[300px]">Close</Drawer.Close>
        </Drawer.Footer>
    </Drawer.Content>
</Drawer.Root>