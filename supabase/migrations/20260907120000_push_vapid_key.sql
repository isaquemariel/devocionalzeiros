-- A chave VAPID com que CADA inscrição foi criada.
--
-- Uma inscrição só recebe push se for assinada com a privada do par da pública
-- que o navegador usou para a criar. Quando as duas divergem, o Google recusa
-- com 403 e a Apple com 400 — em todos os envios, para sempre, e sem nada que
-- diga porquê. Sem guardar a chave, não havia como distinguir uma inscrição
-- morta por rotação de chave de uma inscrição boa, e todas ficavam na tabela a
-- ser tentadas indefinidamente.
--
-- Fica NULL nas linhas antigas: "não se sabe com que chave foi feita". O
-- enviador trata NULL como incógnita — tenta, e apaga se o servidor de push
-- recusar.
alter table public.push_subscriptions
  add column if not exists vapid_key text;

comment on column public.push_subscriptions.vapid_key is
  'Chave pública VAPID (base64url, sem padding) com que esta inscrição foi criada. NULL = desconhecida (linha anterior a esta coluna).';
