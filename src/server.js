const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const {
  REST: questionsController,
  GRAPHQL: questionsResolver,
} = require("./questions/questions.controller");
const db = require("./db");
const config = require("./config");

const typeDefs = gql`
  type Question {
    id: ID
    text: String
  }

  input CreateQuestionInput {
    text: String!
  }

  type Query {
    questions: [Question]
  }

  type Mutation {
    createQuestion(c: CreateQuestionInput!): Question
  }
`;

// const server = new ApolloServer({ typeDefs, resolvers: questionsResolver });

const port = 3000;
const app = express();

const path = "/graphql";

app.use(express.json());

// server.applyMiddleware({ app, path });

app.use(questionsController);

// SESSIONS
// app.use(sessionsController);

// ANSWERS
// app.use(answersController);

// USERS
// app.use(usersController);

db.connect(config.dbConnectionString)
  .then(() => {
    app.listen(port, () => {
      console.log("Server is running on port:", port);
    });
  })
  .catch((ex) => {
    console.error(ex);
    process.exit(1);
  });
