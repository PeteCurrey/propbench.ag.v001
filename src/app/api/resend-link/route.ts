import { NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { generateDownloadToken } from "@/lib/tokens";
import { sendLinkResendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email address required." }, { status: 400 });
    }

    const supabase = createAdminSupabaseClient();

    const { data: purchase } = await supabase
      .from("purchases")
      .select("id, email")
      .eq("email", email.trim().toLowerCase())
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (!purchase) {
      // To prevent email enumeration, return a success message even if no purchase exists
      return NextResponse.json({
        message: "If a valid purchase was found for that email, a fresh download link has been dispatched.",
      });
    }

    const token = generateDownloadToken(purchase.id, purchase.email);
    const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://propbench.com";
    const downloadUrl = `${origin}/api/download?token=${token}`;

    await sendLinkResendEmail({
      toEmail: purchase.email,
      downloadUrl,
    });

    return NextResponse.json({
      message: "If a valid purchase was found for that email, a fresh download link has been dispatched.",
    });
  } catch (err) {
    console.error("Resend link error:", err);
    return NextResponse.json({ error: "Failed to dispatch download link." }, { status: 500 });
  }
}
