import { render } from 'svelte-email';
import SedimentListThankYou from './sediment-list-thank-you.svelte';
import SedimentPurchaseThankYou from './sediment-purchase-thank-you.svelte';


// Define interfaces for the props
interface ListThankYouProps {
  // Add properties here, for example:
  unsubKey: string;
  email: string;
  // Add other properties as needed
}

interface PurchaseThankYouProps {
  // Add properties here, for example:
  email: string;
  // Add other properties as needed
}

export async function renderThankYouListEmail(props: ListThankYouProps ) {
  return render({
    template: SedimentListThankYou,
    props,
  });
}

export async function renderPurchaseThankYouEmail(props: PurchaseThankYouProps) {
    return render({
      template: SedimentPurchaseThankYou,
      props,
    });
  }