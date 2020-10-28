const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const sessionAnswerSchema = new mongoose.Schema(
  {
    questionId: { type: ObjectId, required: true },
    answerId: { type: ObjectId, required: true },
  },
  {
    versionKey: null,
  }
);

const sessionUserSchema = new mongoose.Schema(
  {
    userId: { type: ObjectId, required: true },
    answers: [{ type: sessionAnswerSchema, required: true }],
  },
  {
    versionKey: null,
  }
);

const sessionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    questions: [{ type: ObjectId, required: true, ref: "Question" }],
    users: [{ type: sessionUserSchema, required: true, ref: "User" }],
  },
  {
    versionKey: null,
  }
);

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
