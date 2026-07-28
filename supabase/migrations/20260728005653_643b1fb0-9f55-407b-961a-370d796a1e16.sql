
-- chat_message_reactions
CREATE TABLE IF NOT EXISTS public.chat_message_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id uuid NOT NULL,
  user_id uuid NOT NULL,
  emoji text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (message_id, user_id, emoji)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_message_reactions TO authenticated;
GRANT ALL ON public.chat_message_reactions TO service_role;
ALTER TABLE public.chat_message_reactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Auth read reactions" ON public.chat_message_reactions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users manage own reactions" ON public.chat_message_reactions FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- gen_store_reviews
CREATE TABLE IF NOT EXISTS public.gen_store_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id uuid NOT NULL,
  user_id uuid NOT NULL,
  rating integer NOT NULL DEFAULT 5,
  comment text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gen_store_reviews TO authenticated;
GRANT SELECT ON public.gen_store_reviews TO anon;
GRANT ALL ON public.gen_store_reviews TO service_role;
ALTER TABLE public.gen_store_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone read reviews" ON public.gen_store_reviews FOR SELECT USING (true);
CREATE POLICY "Users insert own reviews" ON public.gen_store_reviews FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own reviews" ON public.gen_store_reviews FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users delete own reviews" ON public.gen_store_reviews FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ============ COLUMN ADDITIONS ============

-- chat_messages: content + reply_to_id (Chat.tsx expects these)
ALTER TABLE public.chat_messages
  ADD COLUMN IF NOT EXISTS content text,
  ADD COLUMN IF NOT EXISTS reply_to_id uuid;

-- global_chat_messages: also add content + reply_to_id (Chat page uses both shapes)
ALTER TABLE public.global_chat_messages
  ADD COLUMN IF NOT EXISTS content text,
  ADD COLUMN IF NOT EXISTS reply_to_id uuid;

-- chat_message_reads: rename to have read_at column
ALTER TABLE public.chat_message_reads
  ADD COLUMN IF NOT EXISTS read_at timestamptz NOT NULL DEFAULT now();

-- online_users: device_id + updated_at
ALTER TABLE public.online_users
  ADD COLUMN IF NOT EXISTS device_id text,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

-- profiles: gender
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS gender text;

-- premium_bonuses: bonus_type is required by type but code doesn't send it → give it a default
ALTER TABLE public.premium_bonuses
  ALTER COLUMN bonus_type SET DEFAULT 'premium_days',
  ALTER COLUMN bonus_type DROP NOT NULL;

-- gen_store_items: name is required by type but code sends title only → give default from title
ALTER TABLE public.gen_store_items
  ALTER COLUMN name DROP NOT NULL;
