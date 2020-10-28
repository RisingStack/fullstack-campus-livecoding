const express = require("express");
const mongoose = require("mongoose");

const { questionsController } = require("./questions/questions.controller");
const config = require("./config");

const port = 3000;
const app = express();

app.use(express.json());

app.use(questionsController);

// SESSIONS
// app.use(sessionsController);

// ANSWERS
// app.use(answersController);

// USERS
// app.use(usersController);

// db.connect(config.dbConnectionString)
mongoose
  .connect(config.dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log("Server is running on port:", port);
    });
  })
  .catch((ex) => {
    console.error(ex);
    process.exit(1);
  });
