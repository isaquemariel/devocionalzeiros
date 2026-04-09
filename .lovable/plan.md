

# Integração Shopify + Correios para a Loja

## Resumo

Habilitar o Shopify como plataforma de e-commerce da loja, substituindo os links externos por um checkout nativo com carrinho, pagamento e gestão de pedidos. O Shopify possui integrações nativas com Correios brasileiros para cálculo de frete, rastreamento e etiquetas.

## Etapas

### 1. Habilitar a integração Shopify
- Criar uma nova loja de desenvolvimento Shopify (sem custo durante o desenvolvimento)
- Você poderá desenvolver e testar à vontade antes de ativar
- Ao "reivindicar" a loja, inicia um teste grátis de 30 dias no Shopify — após isso, será necessário um plano pago para vender

### 2. Configurar produtos no Shopify
- Migrar os produtos atuais da tabela `store_products` para o catálogo Shopify
- Configurar variantes, estoque, preços e imagens

### 3. Integração com Correios
- Instalar app de frete no Shopify (ex: Correios Frete, Melhor Envio, ou Kangu) que oferece:
  - Cálculo automático de frete (PAC, SEDEX) por CEP
  - Geração de etiquetas
  - Rastreamento de encomendas
- Essa configuração é feita diretamente no painel Shopify após reivindicar a loja

### 4. Atualizar a UI da Loja no app
- Conectar os componentes da loja (`/loja`) ao catálogo Shopify via API
- Substituir o botão "Comprar" (link externo) por um fluxo de carrinho + checkout Shopify
- Manter o design atual com categorias, busca e destaques

### 5. Fluxo do usuário final
```text
Navega na loja → Adiciona ao carrinho → Informa CEP → Vê opções de frete → Checkout Shopify → Pagamento → Rastreamento
```

## Observações
- Durante o desenvolvimento não há custos com Shopify
- Após reivindicar a loja: 30 dias grátis, depois plano pago necessário
- Os apps de frete dos Correios geralmente têm planos gratuitos para baixo volume

## Próximo passo
Habilitar a integração Shopify criando uma nova loja de desenvolvimento.

