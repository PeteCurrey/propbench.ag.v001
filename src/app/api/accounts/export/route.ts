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

  const adminSupabase = createAdminSupabaseClient();

  // Server-side tier gate check: CSV Export requires Pro Subscription
  const { data: profile } = await adminSupabase
    .from("profiles")
    .select("subscription_status")
    .eq("id", user.id)
    .single();

  if (profile?.subscription_status !== "pro") {
    return NextResponse.json(
      { error: "CSV export is a Pro tier feature. Direct API call refused." },
      { status: 403 }
    );
  }

  // Fetch all user accounts and daily entries
  const { data: accounts } = await supabase
    .from("tracked_accounts")
    .select("*, daily_entries(*)")
    .order("created_at", { ascending: false });

  if (!accounts) {
    return NextResponse.json({ error: "No accounts found" }, { status: 404 });
  }

  // Format as CSV
  const csvHeaders = [
    "Account Label",
    "Firm Slug",
    "Account Size",
    "Starting Balance",
    "Current Balance",
    "Peak Equity",
    "Entry Date",
    "Closing Balance",
    "Closing Equity",
    "Trades Taken",
    "Plan Adherence",
  ].join(",");

  const csvRows: string[] = [csvHeaders];

  for (const acc of accounts) {
    const entries = acc.daily_entries || [];
    if (entries.length === 0) {
      csvRows.push(
        `"${acc.label}","${acc.firm_slug}",${acc.account_size},${acc.starting_balance},${acc.current_balance},${acc.peak_equity},"N/A",${acc.current_balance},${acc.peak_equity},0,true`
      );
    } else {
      for (const entry of entries) {
        csvRows.push(
          `"${acc.label}","${acc.firm_slug}",${acc.account_size},${acc.starting_balance},${acc.current_balance},${acc.peak_equity},"${entry.date}",${entry.closing_balance},${entry.closing_equity},${entry.trades_taken},${entry.plan_adherence}`
        );
      }
    }
  }

  const csvContent = csvRows.join("\n");

  return new Response(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="propbench-tracked-accounts.csv"',
    },
  });
}
