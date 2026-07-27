-- ============================================================================
-- TALENTOS: preços por item da loja + crédito de talentos comprados (Stripe).
-- Já aplicado em produção. R$ 1 = 20 talentos (na compra de talentos).
-- ============================================================================

-- Preços em talentos dos itens compráveis por moeda (só-talentos + ambos).
-- Itens não listados aqui só podem ser comprados com dinheiro.
INSERT INTO public.rpg_talent_prices (cosmetic_id, price) VALUES
('head:cap',40),('head:hat',40),
('robe:pilgrim',120),('robe:ephod',180),('robe:shepherd',180),('robe:sackcloth',180),
('weapon:staff',180),('weapon:sling',180),('weapon:spear',180),
('head:turban',120),('head:thorns',120),('head:kefiah',120),('head:olive',120),('head:fisher',120),
('aura:pillar',350),('wings:seraph',350),
('mount:horse',420),('mount:camel',420),('mount:donkey',420),
('pet:dove',260),('pet:flame',260),('pet:lamb',260),
('color:yellow',120),('color:red',120),('color:black',120),('color:white',120),('color:orange',120),('color:green',120)
ON CONFLICT (cosmetic_id) DO UPDATE SET price = EXCLUDED.price;

-- Crédito de talentos COMPRADOS (vai direto ao saldo). Idempotente por origem.
-- Chamado pelo stripe-webhook (service role) após confirmar o pagamento.
CREATE OR REPLACE FUNCTION public.credit_talents(p_user_id uuid, p_amount int, p_source text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_inserted int;
BEGIN
  IF p_amount IS NULL OR p_amount <= 0 THEN RETURN; END IF;
  INSERT INTO public.rpg_talent_grants (user_id, source, amount)
  VALUES (p_user_id, p_source, p_amount)
  ON CONFLICT (user_id, source) DO NOTHING;
  GET DIAGNOSTICS v_inserted = ROW_COUNT;
  IF v_inserted > 0 THEN
    INSERT INTO public.rpg_talents (user_id, balance, total_earned)
    VALUES (p_user_id, p_amount, p_amount)
    ON CONFLICT (user_id) DO UPDATE
      SET balance = rpg_talents.balance + p_amount,
          total_earned = rpg_talents.total_earned + p_amount,
          updated_at = now();
  END IF;
END; $$;
REVOKE ALL ON FUNCTION public.credit_talents(uuid,int,text) FROM anon, authenticated;
