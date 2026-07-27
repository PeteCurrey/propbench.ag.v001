-- Migration for Auth & Tracked Accounts (Prompt 10)

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  subscription_status TEXT NOT NULL DEFAULT 'free', -- 'free', 'pro', 'canceled'
  stripe_customer_id TEXT,
  subscription_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.tracked_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  firm_slug TEXT NOT NULL,
  program_slug TEXT NOT NULL,
  account_size NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  starting_balance NUMERIC NOT NULL,
  current_balance NUMERIC NOT NULL,
  peak_balance NUMERIC NOT NULL,
  peak_equity NUMERIC NOT NULL,
  phase TEXT NOT NULL DEFAULT 'evaluation', -- 'evaluation', 'funded'
  started_at DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.daily_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracked_account_id UUID NOT NULL REFERENCES public.tracked_accounts(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  closing_balance NUMERIC NOT NULL,
  closing_equity NUMERIC NOT NULL,
  trades_taken INTEGER NOT NULL DEFAULT 0,
  plan_adherence BOOLEAN NOT NULL DEFAULT true,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracked_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_entries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Profiles (scoped strictly to auth.uid())
CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for Tracked Accounts (scoped strictly to auth.uid())
CREATE POLICY "Users can read own tracked accounts" ON public.tracked_accounts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tracked accounts" ON public.tracked_accounts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tracked accounts" ON public.tracked_accounts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tracked accounts" ON public.tracked_accounts
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for Daily Entries (scoped via tracked_account_id ownership)
CREATE POLICY "Users can read own daily entries" ON public.daily_entries
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.tracked_accounts
      WHERE tracked_accounts.id = daily_entries.tracked_account_id
        AND tracked_accounts.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own daily entries" ON public.daily_entries
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.tracked_accounts
      WHERE tracked_accounts.id = daily_entries.tracked_account_id
        AND tracked_accounts.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own daily entries" ON public.daily_entries
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.tracked_accounts
      WHERE tracked_accounts.id = daily_entries.tracked_account_id
        AND tracked_accounts.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own daily entries" ON public.daily_entries
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.tracked_accounts
      WHERE tracked_accounts.id = daily_entries.tracked_account_id
        AND tracked_accounts.user_id = auth.uid()
    )
  );
