import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAuthSupabaseClient, createAdminSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const supabase = createAuthSupabaseClient(authHeader);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized. Magic link sign-in required." }, { status: 401 });
    }

    const origin = request.headers.get("origin") || "https://propbench.com";
    const adminSupabase = createAdminSupabaseClient();

    // Fetch profile to check existing stripe_customer_id
    const { data: profile } = await adminSupabase
      .from("profiles")
      .select("stripe_customer_id, email")
      .eq("id", user.id)
      .single();

    let customerId = profile?.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email || profile?.email || "",
        metadata: { userId: user.id },
      });
      customerId = customer.id;

      await adminSupabase.from("profiles").upsert({
        id: user.id,
        email: user.email || "",
        stripe_customer_id: customerId,
      });
    }

    // Pro Subscription Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "PropBench Pro Subscription",
              description: "Unlimited account tracking, full daily history, & CSV exports",
            },
            unit_amount: 1900, // £19/month
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${origin}/dashboard?subscription=success`,
      cancel_url: `${origin}/dashboard`,
      metadata: { userId: user.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Subscription checkout error:", err);
    return NextResponse.json({ error: "Failed to create subscription session" }, { status: 500 });
  }
}
