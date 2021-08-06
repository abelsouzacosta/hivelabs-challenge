# Desafio Hivelabs

## 🤖 Tecnologias Utilizadas

- Typescript
- Typeorm
- PostgresSQL
- Express

## 🔥 Rodando a aplicação

1. Faça clone do repositório e entre no diretório

```
git clone git@github.com:abelsouzacosta/hivelabs-challenge.git

cd hivelabs-challenge
```

2. Instale as dependencias: `yarn`

3. Renomeie os arquivos `.ormconfig.env` e `.env.local` para `ormconfig.env` e `.env`, respectivamente.

4. Crie um banco de dados **Postgres**

4.1. Após criar o banco é preciso também criar o plugin do Postgres que permite o uso de uuid, já que esse plugin não vem instalado por padrão, para fazer isso, conectado ao seu banco execute o seguinte comando:

> `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`

5. Dentro do arquivo `ormconfig.env` defina o username, password e nome do banco de dados nas seguintes variáveis:

```
# Username do banco de dados
TYPEORM_USERNAME =

# Senha do banco
TYPEORM_PASSWORD =

# Nome do banco
TYPEORM_DATABASE =
```

6. Neste projeto foi usado o typeorm, para que seja possível fazer o uso de migrations é preciso ter o pacote `ts-node` instalado globalmente, se você não possuir este pacote instalado de forma global pode instalá-lo usando o comando:

> `npm -g install ts-node` ou `sudo npm -g install ts-node` (caso em ambiente linux)

7. Execute a migration da tabela com o comando: `yarn typeorm migration:run`

8. Inicialize a aplicação com `yarn dev`

## Endpoints

Caso usando o Insomnia o ambiente dos endpoints pode ser baixado no botão abaixo:

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=hivelabs-challenge&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fabelsouzacosta%2Fhivelabs-challenge-endpoints%2Fmaster%2Fendpoints%3Ftoken%3DAHJQ6XH2CZIDZVEBDGDIZYTBBWBKY)
