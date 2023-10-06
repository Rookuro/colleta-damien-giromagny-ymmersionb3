import { loadStripe } from '@stripe/stripe-js';
let stripePromise = null;

const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe("pk_test_51LQ9KCJw7SyqSl04gjGGyfeQCgEkEQQhKVTQLzymznyWLCmSrXR6yddolmc8cBckECl7Vv0Inm6FmTe8May8Of5Y002yHeNYI6");
    }
    return stripePromise;
};
export default getStripe;