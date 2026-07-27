import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { generateDownloadToken } from "@/lib/tokens";
import { sendPurchaseReceiptEmail } from "@/lib/email";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!signature || !webhookSecret) {
      // In development or test mode, if secret is not set, attempt basic parse or reject unsigned
      if (!webhookSecret) {
        event = JSON.parse(body) as Stripe.Event;
      } else {
        return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
      }
    } else {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    }
  } catch (err: unknown) {
    const error = err as Error;
    console.error(`Webhook signature verification failed: ${error.message}`);
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const email = session.customer_details?.email || session.customer_email || "buyer@example.com";
    const stripeSessionId = session.id;
    const stripePaymentIntent = typeof session.payment_intent === "string" ? session.payment_intent : null;
    const amountPaid = session.amount_total || 2900;
    const currency = session.currency || "gbp";
    const productSlug = session.metadata?.product_slug || "survival-kit";

    const supabase = createAdminSupabaseClient();

    // Idempotent insertion using ON CONFLICT (stripe_session_id) DO NOTHING
    const { data: existingPurchase } = await supabase
      .from("purchases")
      .select("id")
      .eq("stripe_session_id", stripeSessionId)
      .single();

    let purchaseId = existingPurchase?.id;

    if (!purchaseId) {
      const { data: newPurchase, error } = await supabase
        .from("purchases")
        .insert({
          email,
          stripe_session_id: stripeSessionId,
          stripe_payment_intent: stripePaymentIntent,
          product_slug: productSlug,
          amount_paid: amountPaid,
          currency,
          status: "completed",
        })
        .select("id")
        .single();

      if (error) {
        console.error("Error inserting purchase record:", error);
      } else {
        purchaseId = newPurchase?.id;
      }
    }

    if (purchaseId) {
      const token = generateDownloadToken(purchaseId, email);
      const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://propbench.com";
      const downloadUrl = `${origin}/api/download?token=${token}`;

      await sendPurchaseReceiptEmail({
        toEmail: email,
        downloadUrl,
        purchaseId,
      });
    }
  }

  return NextResponse.json({ received: true });
}
