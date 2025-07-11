<h1 align="center">Desafio Full-Stack NodeJS & ReactJS</h1>

<p align="center">
  <a href="#descrição">Descrição</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#conteúdo-técnico">Conteúdo técnico</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#requisitos">Requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#inicializando-a-aplicação">Inicializando a aplicação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <br/>
  <a href="#scripts-da-aplicação">Scripts da aplicação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#documentação-da-api">Documentação da API</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#teste">Teste</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#comandos-do-docker-compose">Comandos do docker-compose</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#licença">Licença</a>
</p>

# Descrição

Este é um teste para desenvolvedor full-stack Node.JS & React.JS

## Conteúdo técnico

- [DDD](https://khalilstemmler.com/articles/domain-driven-design-intro/)
- [TDD](https://khalilstemmler.com/articles/test-driven-development/introduction-to-tdd/)
- [SOLID](https://www.youtube.com/watch?v=vAV4Vy4jfkc)
- [In Memory Database](https://www.martinfowler.com/bliki/InMemoryTestDatabase.html)
- [Factory Pattern](https://www.digitalocean.com/community/tutorials/js-factory-pattern)

## Tecnologias

- [Node.js LTS](https://nodejs.org/pt-br/)
- [Express](https://expressjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Requisitos

- [Node.js LTS](https://nodejs.org/pt-br/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Inicializando a aplicação

### Adicione as variáveis de ambiente

Execute o comando

```bash
cat .env.example >> .env
```

esse comando criará o arquivo .env com todo o conteúdo do arquivo .env.example, ou se preferir fazer manualmente,
crie um arquivo na raiz do projeto chamado `.env`, copie os exemplos contidos neste arquivo [.env.example]('./.env.example') e cole dentro do arquivo `.env` recém criado, altere se necessário, os valores das variáveis.

### Instalar as dependências

```bash
npm install
```

### Subir os containers do docker

```bash
sudo make up
```

Após o servidor executar, abra [http://localhost:3333/api-docs/](http://localhost:3333/api-docs/) com seu navegador para ver o resultado.

## Scripts da aplicação

### executar a aplicação em modo de desenvolvimento

```bash
npm run start:dev
```

### executar testes unitários

```bash
npm run test:unit
```

### observar alterações nos testes unitários

```bash
npm run test:watch
```

### executar testes e2e(Ponta à ponta)

```bash
npm run test:e2e
```

### observar alterações nos testes e2e(Ponta à ponta)

```bash
npm run test:watch:e2e
```

### executar migrações para o banco de dados

```bash
npm run prisma:migrate
```

### executar seeds em modo desenvolvimento ou produção para o banco de dados

```bash
npm run prisma:seed:prod
```

### executar seeds em modo de teste para o banco de dados

```bash
npm run prisma:seed:test
```

## Documentação da API

Se os containers do banco de dados e do servidor estão ativos, basta clicar [aqui](http://localhost:3333/api-docs) para ser redirecionado à página da documentação, se os containers não estão ativos, execute este comando para ativa-los

```bash
sudo make up
```

## Teste

⚠️ **ATENÇÃO** ⚠️

> **Os scripts de testes unitários e end-to-end(E2E) só podem ser executados dentro do terminal do container do servidor**

### Para testes unitários

Execute o comando

```bash
sudo make test-unit
```

### Para testes e2e (ponta à ponta)

Execute o comando

```bash
sudo make test-e2e
```

### Para observar alterações nos testes unitários

Execute o comando

```bash
sudo make test-watch
```

### Para observar alterações nos testes e2e (ponta à ponta)

Execute o comando

```bash
sudo make test-watch-e2e
```

## Comandos do docker-compose

### Subir os containers

```bash
sudo make up
```

### Remover os containers

```bash
sudo make down
```

#### Banco de dados

##### Subir o container

```bash
sudo make start-database
```

##### Mostrar os logs

```bash
sudo make logs-database
```

##### Reiniciar o container

```bash
sudo make restart-database
```

##### Parar o container

```bash
sudo make stop-database
```

#### Servidor

##### Subir o container

```bash
sudo make start-server
```

##### Mostrar os logs

```bash
sudo make logs-server
```

##### Reiniciar o container

```bash
sudo make restart-server
```

##### Parar o container

```bash
sudo make stop-server
```

##### Executar testes unitários

```bash
sudo make test-unit
```

##### Executar testes e2e (ponta à ponta)

```bash
sudo make test-e2e
```

##### Observar alterações nos testes unitários

```bash
sudo make test-watch-unit
```

##### Observar alterações nos testes e2e (ponta à ponta)

```bash
sudo make test-watch-e2e
```

##### Entrar o terminal do container

```bash
sudo make server-container-terminal
```

## Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](../LICENSE.md) para mais detalhes.
