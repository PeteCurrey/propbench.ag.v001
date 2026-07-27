import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminSupabaseClient } from "@/lib/supabase/server";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_SUBSCRIPTION_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!signature || !webhookSecret) {
      event = JSON.parse(body) as Stripe.Event;
    } else {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    }
  } catch (err: unknown) {
    const error = err as Error;
    console.error(`Subscription webhook error: ${error.message}`);
    return NextResponse.json({ error: "Webhook verification failed" }, { status: 400 });
  }

  const supabase = createAdminSupabaseClient();

  if (
    event.type === "customer.subscription.created" ||
    event.type === "customer.subscription.updated" ||
    event.type === "customer.subscription.deleted"
  ) {
    // eslint-disable-next-all
    const sub = event.data.object as unknown as {
      customer: string | { id: string };
      status: string;
      cancel_at_period_end: boolean;
      current_period_end?: number;
    };

    const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id;
    const periodEndMs = (sub.current_period_end || Math.floor(Date.now() / 1000) + 86400 * 30) * 1000;
    const currentPeriodEnd = new Date(periodEndMs).toISOString();

    // Check if canceled but still in active period
    const isCanceledButInPeriod =
      sub.cancel_at_period_end && Date.now() < periodEndMs;

    let status = "free";
    if (sub.status === "active" || isCanceledButInPeriod) {
      status = "pro"; // Maintain Pro access during period even if canceled
    } else if (sub.status === "canceled") {
      status = "canceled";
    }

    await supabase
      .from("profiles")
      .update({
        subscription_status: status,
        subscription_period_end: currentPeriodEnd,
      })
      .eq("stripe_customer_id", customerId);
  }

  return NextResponse.json({ received: true });
}
