import { loadStripe } from "@stripe/stripe-js";
import { env } from "~/env.mjs";
import { api } from "~/utils/api";

const stripePromise = loadStripe("pk_test_51NA4aZCKyBd3pgy1ayjAB1Q8W2iyBWb8sINVmW9p8Jlv5mf9ESyC1Zngiz00uI6wCCrRFeg9ryjLPRrCCcO2I4sM00d4erN8E3");

export function useBuyCredits() {
  const checkout = api.checkout.createCheckout.useMutation();

  return {
    buyCredits: async () => {
      const response = await checkout.mutateAsync();
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({
        sessionId: response.id,
      });
    },
  };
}