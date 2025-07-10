# Desafio Full-Stack NodeJS & ReactJS

Segue as orientações para realização do teste:

- Para a vaga, você trabalhará com as seguintes tecnologias: NestJS/Express.js no
  backend, ReactJS/NextJS no frontend, e Prisma/TypeORM com PostgreSQL para o
  banco de dados. A estilização pode ser feita com Tailwind e/ou MUI.

- No entanto, para o desafio, o único requisito obrigatório é TypeScript no frontend e no
  backend. É fortemente recomendado separar o front do back também.
- Nossa avaliação será focada mais na sua abordagem para resolver problemas do que no
  uso exato das ferramentas. Queremos ver como você estrutura o código, aplica conceitos
  de backend e frontend, e organiza a aplicação para facilitar futuras manutenções.

Boa sorte e boa avaliação!

# Desafio

Uma empresa que vende produtos precisa de um sistema para gerenciar e acompanhar o
andamento de suas operações. O fluxo inicia-se com uma venda, que pode ter um ou mais
produtos associados. Após a venda, alguém deve realizar a compra desses produtos para
atender a demanda. Há um detalhe importante: uma venda pode ter uma ou mais compras
relacionadas. Por exemplo, se uma venda inclui 2 produtos, ela pode ser atendida por uma
única compra ou dividida em duas compras separadas. O sistema deve permitir o cadastro de
vendas e suas respectivas compras.

# Requisitos obrigatórios

O backend deve ser desenvolvido para atender as seguintes funcionalidades:

- **Cadastro de pedidos de vendas**
  - Interface para cadastrar uma nova venda
  - Interface para visualizar todas as vendas
- **Cadastro de pedidos de compras**
  - Interface para cadastrar uma compra, permitindo a escolha da venda e do(s)
    produto(s) que estão sendo comprados
  - Interface para visualizar todas as compras

# Requisitos opcionais

Se você concluir os requisitos obrigatórios e ainda tiver tempo, poderá se destacar com as
seguintes melhorias:

- Interfaces para visualizar os detalhes de cada venda e compra
- Desenvolvimento de testes unitários para o backend
- Documentação da API
- Documentação técnica do projeto (um `README.md` bem detalhado é suficiente)

Fique à vontade para adicionar funcionalidades extras, se desejar.
