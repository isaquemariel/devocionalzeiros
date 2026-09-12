-- ENTREGA DO ANÚNCIO AGENDADO: o que aconteceu com o push, guardado na linha.
--
-- O processador marcava o anúncio como enviado e já o reagendava ANTES de o
-- push sair. Quando a função de envio ficava inalcançável (foi um "521 Web
-- server is down" do Cloudflare), aquela ocorrência sumia para sempre: ninguém
-- recebia e o admin via "1× enviado". Trocar a ordem não serve — foi por isso
-- que o reagendamento veio para a frente, senão um erro no meio deixava a
-- recorrência presa. A saída é registrar o RESULTADO e reagendar uma
-- retentativa curta, sem mexer na cadência normal.
--
--   last_error     — a última falha de entrega (nulo quando entregou)
--   last_error_at  — quando ela aconteceu
--   retry_count    — tentativas já gastas nesta ocorrência (zera ao entregar)
alter table public.admin_push_announcements
  add column if not exists last_error text,
  add column if not exists last_error_at timestamptz,
  add column if not exists retry_count integer not null default 0;
