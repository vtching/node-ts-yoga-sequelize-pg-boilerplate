# NodeJS TypeScript GraphQL Yoga + Sequelize + Postgres Template

node-ts-yoga-sequelize-pg-template

Boilerplate to setup API:
- Nodejs Express
- GraphQL Yoga
- Sequelize over Postgres

Dev setup involves using VSCode and Dev Containers

To use with the workspace to bootstrap the API that will setup prerequisites and replace [myproject] with actual project name in this repository.

A package.json is available to simplify setup.
Below are instructions on how to install the packages manually to better understand each package and role.

API will be available at http://localhost:8080/api/graphql

To use the user backend model and user GraphQL queries, run:
```
npx sequelize-cli db:migrate
```

In GraphiQL:
```
mutation UserRegister($email: String!, $password: String!) {
  register(input: {
    email: $email,
    password: $password
  }) {
    user {
      email
    }
    token
  }
}
```
with variables
```
{
  "email": "testgraphiql@test.com",
  "password": "testgraphiqlpwd"
}
```

## File Structure

Src folder contains:
- app.ts
- config.ts
- ...

Contains user Sequelize backend model + GraphQL User query/mutation

## Docker & Dev container setup

### Docker

Dockerfile

docker-compose

### Devcontainer

.devcontainer/devcontainer.json

.devcontainer/docker-compose.extend.yml

.devcontainer/Dockerfile

Start VSCode with dev container and within the dev container, proceed with the next steps to install necessary packages

## Install Express with GraphQL Yoga

Using Yoga over graphql-http for subscriptions and file upload (not using Apollo Server to keep it lightweight)
```
npm install express graphql-yoga graphql --save
```

Install GraphQL tools to load and create schemas
```
npm install @graphql-tools/load-files @graphql-tools/graphql-file-loader @graphql-tools/schema
```

## Install nodemon
To watch code changes
```
npm install -D nodemon
```

In package.json, replace node with nodemon. For example:
```
nodemon --ext js,ts,graphql --watch src src/app.ts
```

## Install GraphQL Codegen
Install GraphQL Codegen to get typescript types in resolvers
```
npm install -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-resolvers
```
For schemas change watch:
```
npm install -D concurrently @parcel/watcher
```

File codegen.ts

Update package.json to add codegen
```
  "scripts": {
    "build": "npm run codegen && npx tsc && cp -r src/graphql/typedefs dist/graphql/",
    "clean": "rm -rf node_modules dist",
    "start": "npm run build && node dist/app.js",
    "dev": "concurrently \"nodemon --ext js,ts,graphql --watch src src/app.ts\" \"npm run codegen --watch\"",
    "codegen": "npx graphql-codegen --config codegen.ts"
  },
```

GraphQL app setup is in src/initializers/graphql.ts

An error might occur when running codegen. A workaround here: package.json
```
  "overrides": {
    "@graphql-codegen/cli": {
      "node-fetch": "^3.3.2"
    }
  }
```

## Install Typescript

Install packages
```
npm install --save-dev typescript
```

Make Node/Express work with TS
```
npm install --save-dev @types/node @types/express @types/validator ts-node
```

Create a default tsconfig
```
npx tsc --init
```

## Install Sequelize with Postgres

Install packages
```
npm install sequelize pg

```

Support for Typescript
```
npm install reflect-metadata sequelize-typescript
```

Sequelize initialization
```
src/initializers/sequelize.ts
```

All models are in src/models. Sample user model
```
src/models/user.ts
```

Sequelize CLI
```
npm install -D sequelize-cli
```

CLI config
```
.sequelizerc
config/config.js
db/migrate
db/migrate/YYYYmmDDHHMMSS-create-user.js
db/seeders
```

Run to create Postgres user DB table
```
db:migrate
```

## Install Eslint

Install packages
```
npm install --save-dev eslint @eslint/js typescript-eslint
```

ESLint config
```
eslint.config.mjs
```

## Install User Authentication libs

Install Packages
```
npm install bcrypt jsonwebtoken @types/bcrypt @types/jsonwebtoken cors express-jwt
```

## Install Jest

TODO

## Install Others

```
npm install winston
```

## Make GraphQL server more secure

https://www.apollographql.com/blog/9-ways-to-secure-your-graphql-api-security-checklist
