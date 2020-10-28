const { ObjectId } = require("mongodb");

const db = require("../db");

function createQuestion(text) {
  return db.getDBClient().collection("questions").insertOne({ text });
}

async function getQuestions() {
  return db.getDBClient().collection("questions").find().toArray();
}

async function updateQuestionById(questionId, text) {
  return db
    .getDBClient()
    .collection("questions")
    .findOneAndUpdate(
      { _id: ObjectId(questionId) },
      {
        $set: {
          text,
        },
      },
      {
        returnNewDocument: true,
      }
    );
}

async function getQuestionById(questionId) {
  return db
    .getDBClient()
    .collection("questions")
    .findOne({ _id: ObjectId(questionId) });
}

async function deleteQuestionById(questionId) {
  return db
    .getDBClient()
    .collection("questions")
    .deleteOne({ _id: ObjectId(questionId) });
}

module.exports = {
  createQuestion,
  getQuestions,
  updateQuestionById,
  getQuestionById,
  deleteQuestionById,
};
