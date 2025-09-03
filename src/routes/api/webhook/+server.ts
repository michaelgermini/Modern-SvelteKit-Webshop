import type { RequestHandler } from "@sveltejs/kit";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16"
});

export const POST: RequestHandler = async ({ request }) => {
  try {
    // ⚠️ En prod: valider la signature (Stripe-Signature header)
    const event = await request.json();

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('Payment completed:', {
          sessionId: session.id,
          customerEmail: session.customer_details?.email,
          amount: session.amount_total,
          metadata: session.metadata
        });
        
        // TODO: marquer la commande comme payée, envoyer email, etc.
        // - Mettre à jour le statut de la commande en base de données
        // - Envoyer un email de confirmation au client
        // - Mettre à jour le stock des produits
        // - Créer une facture
        break;

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('Payment intent succeeded:', paymentIntent.id);
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        console.log('Payment failed:', failedPayment.id);
        // TODO: gérer l'échec de paiement
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response("ok", { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: "Webhook processing failed" }), 
      { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
