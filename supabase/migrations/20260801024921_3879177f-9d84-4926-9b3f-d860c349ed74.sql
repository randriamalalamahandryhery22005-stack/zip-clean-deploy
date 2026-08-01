-- Dédoublonnage (conserve la ligne la plus récente/pertinente)
DELETE FROM public.activation_codes a USING public.activation_codes b
  WHERE a.code_name = b.code_name AND a.updated_at < b.updated_at;

DELETE FROM public.game_access a USING public.game_access b
  WHERE a.user_id = b.user_id AND a.game_mode = b.game_mode AND a.granted_at < b.granted_at;

DELETE FROM public.protected_admins a USING public.protected_admins b
  WHERE a.user_id = b.user_id AND a.created_at < b.created_at;

DELETE FROM public.user_coins a USING public.user_coins b
  WHERE a.user_id = b.user_id AND a.updated_at < b.updated_at;

DELETE FROM public.gen_store_reviews a USING public.gen_store_reviews b
  WHERE a.item_id = b.item_id AND a.user_id = b.user_id AND a.created_at < b.created_at;

-- Contraintes d'unicité
CREATE UNIQUE INDEX IF NOT EXISTS activation_codes_code_name_uidx ON public.activation_codes (code_name);
CREATE UNIQUE INDEX IF NOT EXISTS game_access_user_game_uidx ON public.game_access (user_id, game_mode);
CREATE UNIQUE INDEX IF NOT EXISTS protected_admins_user_uidx ON public.protected_admins (user_id);
CREATE UNIQUE INDEX IF NOT EXISTS user_coins_user_uidx ON public.user_coins (user_id);
CREATE UNIQUE INDEX IF NOT EXISTS gen_store_reviews_item_user_uidx ON public.gen_store_reviews (item_id, user_id);