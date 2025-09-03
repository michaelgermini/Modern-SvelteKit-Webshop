import type { RequestHandler } from "@sveltejs/kit";
import Stripe from "stripe";
import { z } from "zod";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16"
});

const Item = z.object({
  name: z.string(),
  amount: z.number().int().positive(),
  currency: z.enum(["EUR", "USD", "CHF"]),
  quantity: z.number().int().positive()
});

const Body = z.object({ 
  items: z.array(Item) 
});

export const POST: RequestHandler = async ({ request, url }) => {
  try {
    const json = await request.json().catch(() => null);
    const parsed = Body.safeParse(json);
    
      if (!parsed.success) {
    return new Response(
      JSON.stringify({
        error: "Invalid payload",
        details: parsed.error.errors
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: parsed.data.items.map((i) => ({
        price_data: {
          currency: i.currency.toLowerCase(),
          product_data: { name: i.name },
          unit_amount: i.amount
        },
        quantity: i.quantity
      })),
      success_url: `${url.origin}/?success=true`,
      cancel_url: `${url.origin}/cart?canceled=true`,
      metadata: {
        items_count: parsed.data.items.length.toString(),
        total_amount: parsed.data.items.reduce((sum, item) => sum + (item.amount * item.quantity), 0).toString()
      }
    });

    return new Response(
      JSON.stringify({ 
        id: session.id, 
        url: session.url 
      }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        message: "Failed to create checkout session"
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
