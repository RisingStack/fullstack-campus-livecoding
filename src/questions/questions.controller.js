const express = require("express");

const questionsService = require("./questions.service");

const router = express.Router();

// QUESTIONS
router.post("/questions", async (req, res) => {
  const question = req.body;
  const { insertedId } = await questionsService.createQuestion(question.text);
  res.status(201).send({ id: insertedId });
});

router.get("/questions/:questionId", async (req, res) => {
  const found = await questionsService.getQuestionById(req.params.questionId);
  if (found) {
    return res.send(found);
  }
  res.status(404).send({
    message: "Question not found",
  });
});

router.put("/questions/:questionId", async (req, res) => {
  const found = await questionsService.updateQuestionById(
    req.params.questionId,
    req.body.text
  );
  if (found) {
    return res.send(found);
  }
  res.status(404).send({
    message: "Question not found",
  });
});

router.delete("/questions/:questionId", async (req, res) => {
  await questionsService.deleteQuestionById(req.params.questionId);
  return res.end();
});

router.get("/questions", async (req, res) => {
  const questions = await questionsService.getQuestions();
  res.send(questions);
});

const resolver = {
  Query: {
    questions: () => questions,
  },
  Mutation: {
    createQuestion: (_, { c: question }) => {
      question.id = Math.round(Math.random() * 100);
      questions.push(question);
      return question;
    },
  },
};

module.exports.REST = router;
module.exports.GRAPHQL = resolver;
