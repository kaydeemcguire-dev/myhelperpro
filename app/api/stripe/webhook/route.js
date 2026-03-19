import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Stripe client (secret key must exist, even in beta)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-10-29.clover",
});

export async function POST(req) {
  const body = await req.text();

  const headerList = await headers();
  const signature = headerList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 }
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  /*
    =====================================================
    🔒 BETA MODE PAYMENT LOCK
    =====================================================
    Payments are intentionally disabled during beta.
    This webhook will ACCEPT events but DO NOTHING
    until PAYMENTS_ENABLED=true
  */

  const paymentsEnabled = process.env.PAYMENTS_ENABLED === "true";

  if (!paymentsEnabled) {
    console.log("Stripe event received (beta mode, ignored):", event.type);

    return NextResponse.json({
      received: true,
      beta: true,
      ignored: true,
    });
  }

  /*
    =====================================================
    🚀 FUTURE PAYMENT HANDLING (POST-BETA)
    =====================================================
    DO NOT ADD LOGIC HERE UNTIL LAUNCH
  */

  switch (event.type) {
    case "checkout.session.completed":
      console.log("Checkout completed (future logic)");
      break;

    case "payment_intent.succeeded":
      console.log("Payment succeeded (future logic)");
      break;

    default:
      console.log("Unhandled event type:", event.type);
  }

  return NextResponse.json({ received: true });
}
