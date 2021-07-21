<h1 align='center'>
  <img src='https://cdn.discordapp.com/attachments/778765240082366516/863159405453377576/logo_vet.png'>
</h1>

# 🔎 Indice

- [About](#-about-the-project)
- [Tools](#-tools)
- [Building](#-building)
- [Developers](#-developers)

---

# 🏆 About the project

This project, **SomosUm**, which is an application for sales of products and advertisements.

---

## ⚒ Tools

The **Project** was developed with the following technologies:

- [Nodejs](https://nodejs.org/en/)
- [PostgresSQL](https://www.postgresql.org/)
- [Nodemailer](https://nodemailer.com/about/)
- [TypeORM](https://typeorm.io/#/)
- [Tsyringe](https://www.npmjs.com/package/tsyringe)
- [Typescript](https://www.typescriptlang.org/)
- [Eslint](https://eslint.org/)
- [Express](https://expressjs.com/)
- [JWT-token](https://jwt.io/)
- [Docker](https://www.docker.com/)

---

## 📜 Building

```bash

 #Clone the repository
 $ git clone https://github.com/ItaloFL/SomosUm-Project.git

 #Enter project folder
 $ cd SomosUM_api-main

 #Install dependencies
 $ yarn install

 #Start application
 $ yarn dev

```

---

## 💻 Developers

Ítalo Ferreira Lopes

- 🎫 [GitHub](https://github.com/ItaloFL)

Joey Felipe Albuquerque

- 🎫 [GitHub](https://github.com/J031F)

Ismael Alves Bandeira Filho

- 🎫 [GitHub](https://github.com/Isalvs)

# Assinatura

migration:
signature:
id - uuid
user_id - FK
paid - bool
created_at - Timestamp
users:
signature- FK

<!--

{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "777777",
  "database": "somosuum",
  "synchronize": false,
  "entities": [
    "./src/modules/**/entities/**.ts"
  ],
  "migrations": [
    "./src/shared/infra/typeorm/migrations/*.ts"
  ]
}


-->
