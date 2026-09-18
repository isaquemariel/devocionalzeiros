# Corrigir alertas de monitoramento

## Implementação
- Corrigir o login para verificar o resultado real do reenvio de confirmação, informar o tempo de espera quando houver limite e impedir reenvios automáticos repetidos na mesma sessão.
- Restaurar no webhook da Kiwify o vínculo entre compra e curso, o e-mail de boas-vindas idempotente e a revogação do acesso em reembolso/cancelamento.
- Tornar as tentativas de anúncios recorrentes específicas de cada ocorrência, preservando uma única notificação no sino durante retentativas.
- Não alterar o efeito de água em sangue: o código atual já contém a correção centralizada e o alerta está desatualizado.

## Validação
- Rodar a checagem TypeScript e as validações do projeto.
- Rodar as validações obrigatórias das cenas e inspecionar a cena de Êxodo 7.
- Validar as funções alteradas e registrar o resultado dos quatro alertas no monitoramento.

## Detalhes técnicos
- A correção do login ficará limitada à tela de autenticação; o fluxo de sessão não muda.
- A restauração da Kiwify reaproveitará o bloco anteriormente testado no histórico do próprio repositório.
- O contador de retentativas será zerado quando uma nova ocorrência recorrente começar, sem duplicar o aviso no sino durante as retentativas daquela ocorrência.
