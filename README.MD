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

> > `npm -g install ts-node` ou `sudo npm -g install ts-node` (caso em ambiente linux)

7. Execute a migration da tabela com o comando: `yarn typeorm migration:run`

8. Inicialize a aplicação com `yarn dev`
