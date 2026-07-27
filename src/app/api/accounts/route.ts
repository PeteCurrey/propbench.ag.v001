import { NextResponse } from "next/server";
import { createAuthSupabaseClient, createAdminSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const supabase = createAuthSupabaseClient(authHeader);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // RLS automatically filters by auth.uid()
  const { data: accounts, error } = await supabase
    .from("tracked_accounts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ accounts });
}

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  const supabase = createAuthSupabaseClient(authHeader);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const adminSupabase = createAdminSupabaseClient();

  // Server-side tier gate check: Check user's subscription_status
  const { data: profile } = await adminSupabase
    .from("profiles")
    .select("subscription_status")
    .eq("id", user.id)
    .single();

  const isPro = profile?.subscription_status === "pro";

  // Count existing tracked accounts
  const { count } = await adminSupabase
    .from("tracked_accounts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id);

  const existingCount = count || 0;

  // Free Tier Gate: Max 1 tracked account
  if (!isPro && existingCount >= 1) {
    return NextResponse.json(
      {
        error:
          "Free tier is limited to 1 tracked account. Upgrade to PropBench Pro for unlimited account tracking.",
      },
      { status: 403 }
    );
  }

  const body = await request.json();
  const {
    label,
    firm_slug,
    program_slug,
    account_size,
    currency = "USD",
    starting_balance,
    phase = "evaluation",
  } = body;

  if (!label || !firm_slug || !starting_balance) {
    return NextResponse.json({ error: "Missing required account fields." }, { status: 400 });
  }

  const numStarting = Number(starting_balance);

  const { data: newAccount, error } = await supabase
    .from("tracked_accounts")
    .insert({
      user_id: user.id,
      label,
      firm_slug,
      program_slug: program_slug || "standard",
      account_size: Number(account_size || numStarting),
      currency,
      starting_balance: numStarting,
      current_balance: numStarting,
      peak_balance: numStarting,
      peak_equity: numStarting,
      phase,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ account: newAccount }, { status: 201 });
}
