# Desafio Full-Stack NodeJS & ReactJS

Segue as orienta��es para realiza��o do teste:

- Para a vaga, voc� trabalhar� com as seguintes tecnologias: NestJS/Express.js no
  backend, ReactJS/NextJS no frontend, e Prisma/TypeORM com PostgreSQL para o
  banco de dados. A estiliza��o pode ser feita com Tailwind e/ou MUI.

- No entanto, para o desafio, o �nico requisito obrigat�rio � TypeScript no frontend e no
  backend. � fortemente recomendado separar o front do back tamb�m.
- Nossa avalia��o ser� focada mais na sua abordagem para resolver problemas do que no
  uso exato das ferramentas. Queremos ver como voc� estrutura o c�digo, aplica conceitos
  de backend e frontend, e organiza a aplica��o para facilitar futuras manuten��es.

Boa sorte e boa avalia��o!

# Desafio

Uma empresa que vende produtos precisa de um sistema para gerenciar e acompanhar o
andamento de suas opera��es. O fluxo inicia-se com uma venda, que pode ter um ou mais
produtos associados. Ap�s a venda, algu�m deve realizar a compra desses produtos para
atender a demanda. H� um detalhe importante: uma venda pode ter uma ou mais compras
relacionadas. Por exemplo, se uma venda inclui 2 produtos, ela pode ser atendida por uma
�nica compra ou dividida em duas compras separadas. O sistema deve permitir o cadastro de
vendas e suas respectivas compras.

# Requisitos obrigat�rios

O backend deve ser desenvolvido para atender as seguintes funcionalidades:

- **Cadastro de pedidos de vendas**
  - Interface para cadastrar uma nova venda
  - Interface para visualizar todas as vendas
- **Cadastro de pedidos de compras**
  - Interface para cadastrar uma compra, permitindo a escolha da venda e do(s)
    produto(s) que est�o sendo comprados
  - Interface para visualizar todas as compras

# Requisitos opcionais

Se voc� concluir os requisitos obrigat�rios e ainda tiver tempo, poder� se destacar com as
seguintes melhorias:

- Interfaces para visualizar os detalhes de cada venda e compra
- Desenvolvimento de testes unit�rios para o backend
- Documenta��o da API
- Documenta��o t�cnica do projeto (um `README.md` bem detalhado � suficiente)

Fique � vontade para adicionar funcionalidades extras, se desejar.
