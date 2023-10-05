import {loadStripe} from "@stripe/stripe-js"

export async function checkOut({lineItems}){
    let stripePromise = null;

    const getStripe = () =>{
        if(!stripePromise){
            stripePromise = loadStripe("pk_test_51LQ9KCJw7SyqSl04gjGGyfeQCgEkEQQhKVTQLzymznyWLCmSrXR6yddolmc8cBckECl7Vv0Inm6FmTe8May8Of5Y002yHeNYI6")

        }
        return stripePromise
    }
    const stripe = await getStripe();
    await stripe.redirectToCheckout({
        mode : 'payment',
        lineItems,
        successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
		cancelUrl: window.location.origin
    })
}