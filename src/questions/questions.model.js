const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, default: false },
});

const questionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    answers: [answerSchema],
  },
  {
    versionKey: null,
  }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
