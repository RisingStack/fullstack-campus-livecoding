const express = require("express");

const sessionsService = require("./sessions.service");

const router = express.Router();

router.post("/sessions", async (req, res) => {
  const { name } = req.body;
  const session = await sessionsService.createSession(name);
  res.status(201).send(session);
});

router.post("/sessions/:sessionId/questions", async (req, res) => {
  const { questionId } = req.body;
  const { sessionId } = req.params;
  const session = await sessionsService.addQuestionToSession(
    sessionId,
    questionId
  );
  res.status(201).send(session);
});

router.post("/sessions/:sessionId/users", async (req, res) => {
  const { userId } = req.body;
  const { sessionId } = req.params;
  const session = await sessionsService.joinSession(sessionId, userId);
  res.status(201).send(session);
});

router.get("/sessions", async (req, res) => {
  const sessions = await sessionsService.getSessions();
  res.send(sessions);
});

module.exports = { sessionsController: router };
