import express, { Express } from "express"
import logger from "winston";
import db from './initializers/sequelize';
import { graphqlRequestHandler } from './initializers/graphql';
import AppConfig from "./config";

const app: Express = express()

app.use(express.json())

// Create and use the GraphQL handler.
app.all("/api/graphql", graphqlRequestHandler)


// Start the server at port
// Synchronizing any model changes with database.
db.sequelize
  .sync()
  .then(() => {
    console.log('Database sync successful');
    app.listen(AppConfig.port, () => {
      console.log("Running a GraphQL API server at http://localhost:8080/api/graphql")
    })
  }).catch((error: Error) => {
    if (error) {
      logger.error('An error occured: ', error);
    }
  });
