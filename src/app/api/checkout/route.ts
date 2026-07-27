import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin") || "https://propbench.com";

    // Server-side authority only: Price is fixed at £29 (2900 GBP pence)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "Prop Trading Survival Kit (PDF)",
              description: "Digital reference manual on drawdown mathematics & risk budgets",
            },
            unit_amount: 2900, // £29.00
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/survival-kit`,
      metadata: {
        product_slug: "survival-kit",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
