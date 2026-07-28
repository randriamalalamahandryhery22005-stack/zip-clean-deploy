
-- ============ MISSING TABLES ============

-- voice_calls (voice call room per user session)
CREATE TABLE IF NOT EXISTS public.voice_calls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  caller_id uuid NOT NULL,
  callee_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'active',
  started_at timestamptz,
  ended_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.voice_calls TO authenticated;
GRANT ALL ON public.voice_calls TO service_role;
ALTER TABLE public.voice_calls ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own voice calls" ON public.voice_calls FOR SELECT TO authenticated USING (auth.uid() = caller_id OR auth.uid() = callee_id);
CREATE POLICY "Users insert own voice calls" ON public.voice_calls FOR INSERT TO authenticated WITH CHECK (auth.uid() = caller_id);
CREATE POLICY "Users update own voice calls" ON public.voice_calls FOR UPDATE TO authenticated USING (auth.uid() = caller_id OR auth.uid() = callee_id);
CREATE POLICY "Admins manage voice calls" ON public.voice_calls FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- global_chat_messages
CREATE TABLE IF NOT EXISTS public.global_chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  message text,
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.global_chat_messages TO authenticated;
GRANT ALL ON public.global_chat_messages TO service_role;
ALTER TABLE public.global_chat_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Auth read global chat" ON public.global_chat_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Auth insert own global chat" ON public.global_chat_messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own global chat" ON public.global_chat_messages FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins manage global chat" ON public.global_chat_messages FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- chat_message_reads
CREATE TABLE IF NOT EXISTS public.chat_message_reads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  message_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, message_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_message_reads TO authenticated;
GRANT ALL ON public.chat_message_reads TO service_role;
ALTER TABLE public.chat_message_reads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own reads" ON public.chat_message_reads FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- prediction_logs
CREATE TABLE IF NOT EXISTS public.prediction_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  mode text NOT NULL,
  custom_prediction_id uuid,
  input_params jsonb,
  results jsonb,
  reliability_avg numeric,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.prediction_logs TO authenticated;
GRANT ALL ON public.prediction_logs TO service_role;
ALTER TABLE public.prediction_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users insert own log" ON public.prediction_logs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users read own logs" ON public.prediction_logs FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins read all logs" ON public.prediction_logs FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- custom_predictions
CREATE TABLE IF NOT EXISTS public.custom_predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  icon text,
  is_active boolean NOT NULL DEFAULT true,
  requires_subscription boolean NOT NULL DEFAULT false,
  subscription_key text,
  config jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.custom_predictions TO authenticated, anon;
GRANT ALL ON public.custom_predictions TO service_role;
ALTER TABLE public.custom_predictions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads active customs" ON public.custom_predictions FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage customs" ON public.custom_predictions FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ COLUMN ADDITIONS ============

-- profiles extra fields
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS full_name text,
  ADD COLUMN IF NOT EXISTS country_code text,
  ADD COLUMN IF NOT EXISTS region text,
  ADD COLUMN IF NOT EXISTS birth_date date,
  ADD COLUMN IF NOT EXISTS trial_started_at timestamptz;

-- gen_store_items extras
ALTER TABLE public.gen_store_items
  ADD COLUMN IF NOT EXISTS title text,
  ADD COLUMN IF NOT EXISTS post_type text,
  ADD COLUMN IF NOT EXISTS body text,
  ADD COLUMN IF NOT EXISTS link_url text,
  ADD COLUMN IF NOT EXISTS file_path text,
  ADD COLUMN IF NOT EXISTS file_url text,
  ADD COLUMN IF NOT EXISTS file_name text,
  ADD COLUMN IF NOT EXISTS file_size bigint,
  ADD COLUMN IF NOT EXISTS mime_type text,
  ADD COLUMN IF NOT EXISTS created_by uuid,
  ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS download_count integer NOT NULL DEFAULT 0;

-- premium_bonuses extras
ALTER TABLE public.premium_bonuses
  ADD COLUMN IF NOT EXISTS days integer,
  ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS granted_by uuid,
  ADD COLUMN IF NOT EXISTS granted_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS reason text;

-- user_coins extras (subscription plan tracking)
ALTER TABLE public.user_coins
  ADD COLUMN IF NOT EXISTS balance integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_granted integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_consumed integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS plan_type text,
  ADD COLUMN IF NOT EXISTS plan_started_at timestamptz,
  ADD COLUMN IF NOT EXISTS plan_expires_at timestamptz,
  ADD COLUMN IF NOT EXISTS consumption_rate_per_hour numeric NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_consumed_at timestamptz;

-- user_points extras
ALTER TABLE public.user_points
  ADD COLUMN IF NOT EXISTS reason text,
  ADD COLUMN IF NOT EXISTS game_name text;

-- login_history extras
ALTER TABLE public.login_history
  ADD COLUMN IF NOT EXISTS device_info text,
  ADD COLUMN IF NOT EXISTS ip_address text,
  ADD COLUMN IF NOT EXISTS location text;

-- game_access extras
ALTER TABLE public.game_access
  ADD COLUMN IF NOT EXISTS days_requested integer,
  ADD COLUMN IF NOT EXISTS price_amount numeric,
  ADD COLUMN IF NOT EXISTS rejection_reason text;

-- app_config extras (rich config)
ALTER TABLE public.app_config
  ADD COLUMN IF NOT EXISTS config jsonb,
  ADD COLUMN IF NOT EXISTS version integer NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT false;
-- allow the older required column to accept default
ALTER TABLE public.app_config ALTER COLUMN config_key DROP NOT NULL;

-- Seed a default active config row so useAppConfig has data
INSERT INTO public.app_config (config_key, config, version, is_active)
VALUES ('active', '{}'::jsonb, 1, true)
ON CONFLICT DO NOTHING;
