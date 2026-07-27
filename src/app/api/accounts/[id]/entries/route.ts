import { NextResponse } from "next/server";
import { createAuthSupabaseClient, createAdminSupabaseClient } from "@/lib/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: accountId } = await params;
  const authHeader = request.headers.get("authorization");
  const supabase = createAuthSupabaseClient(authHeader);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const adminSupabase = createAdminSupabaseClient();
  const { data: profile } = await adminSupabase
    .from("profiles")
    .select("subscription_status")
    .eq("id", user.id)
    .single();

  const isPro = profile?.subscription_status === "pro";

  let query = supabase
    .from("daily_entries")
    .select("*")
    .eq("tracked_account_id", accountId)
    .order("date", { ascending: false });

  // Free Tier Gate: Cap daily history to last 14 days
  if (!isPro) {
    const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    query = query.gte("date", fourteenDaysAgo);
  }

  const { data: entries, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ entries, isHistoryTruncated: !isPro });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: accountId } = await params;
  const authHeader = request.headers.get("authorization");
  const supabase = createAuthSupabaseClient(authHeader);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { date, closing_balance, closing_equity, trades_taken = 0, plan_adherence = true, note } = body;

  const numBalance = Number(closing_balance);
  const numEquity = Number(closing_equity || numBalance);

  // Insert daily entry
  const { data: entry, error: entryError } = await supabase
    .from("daily_entries")
    .insert({
      tracked_account_id: accountId,
      date: date || new Date().toISOString().split("T")[0],
      closing_balance: numBalance,
      closing_equity: numEquity,
      trades_taken: Number(trades_taken),
      plan_adherence: Boolean(plan_adherence),
      note,
    })
    .select()
    .single();

  if (entryError) {
    return NextResponse.json({ error: entryError.message }, { status: 500 });
  }

  // Fetch target account to recalculate peak balance and peak equity
  const { data: account } = await supabase
    .from("tracked_accounts")
    .select("*")
    .eq("id", accountId)
    .single();

  if (account) {
    const newPeakBalance = Math.max(Number(account.peak_balance), numBalance);
    const newPeakEquity = Math.max(Number(account.peak_equity), numEquity);

    await supabase
      .from("tracked_accounts")
      .update({
        current_balance: numBalance,
        peak_balance: newPeakBalance,
        peak_equity: newPeakEquity,
        updated_at: new Date().toISOString(),
      })
      .eq("id", accountId);
  }

  return NextResponse.json({ entry }, { status: 201 });
}
