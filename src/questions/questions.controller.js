const express = require("express");

const questionsService = require("./questions.service");

const router = express.Router();

// QUESTIONS
router.post("/questions", async (req, res) => {
  const question = req.body;
  const created = await questionsService.createQuestion(question.text);
  res.status(201).send(created);
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

router.post("/questions/:questionId/answers", async (req, res) => {
  const answer = req.body;
  const { questionId } = req.params;
  const question = await questionsService.addAnswerToQuestion(
    questionId,
    answer
  );
  return res.send(question);
});

router.put("/questions/:questionId/answers/:answerId", async (req, res) => {
  const { isCorrect } = req.body;
  const { questionId, answerId } = req.params;
  const question = await questionsService.updateAnswer(
    questionId,
    answerId,
    isCorrect
  );
  return res.send(question);
});

router.delete("/questions/:questionId", async (req, res) => {
  await questionsService.deleteQuestionById(req.params.questionId);
  return res.end();
});

router.get("/questions", async (req, res) => {
  const questions = await questionsService.getQuestions();
  res.send(questions);
});

module.exports = { questionsController: router };
