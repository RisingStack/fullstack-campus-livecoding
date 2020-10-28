const { ObjectId } = require("mongodb");

const Question = require("./questions.model");

class QuestionService {
  static createQuestion(text) {
    return Question.create({ text });
  }
  static async getQuestions() {
    return Question.find();
  }
  static async updateAnswer(questionId, answerId, isCorrect) {
    const question = await Question.findOneAndUpdate(
      {
        _id: questionId,
        "answers._id": answerId,
      },
      {
        $set: {
          "answers.$.isCorrect": isCorrect,
        },
      },
      {
        useFindAndModify: false,
        new: true,
      }
    );
    if (!question) {
      throw new Error("Question not found");
    }
    return question;
  }
  static async addAnswerToQuestion(questionId, answer) {
    return Question.findOneAndUpdate(
      { _id: ObjectId(questionId) },
      {
        $push: {
          answers: answer,
        },
      },
      {
        useFindAndModify: false,
        new: true,
      }
    );
  }
  static async updateQuestionById(questionId, text) {
    return Question.findOneAndUpdate(
      { _id: ObjectId(questionId) },
      {
        $set: {
          text,
        },
      },
      {
        useFindAndModify: false,
        new: true,
      }
    );
  }
  static async getQuestionById(questionId) {
    return Question.findById(questionId);
  }
  static async deleteQuestionById(questionId) {
    return Question.deleteOne({ _id: ObjectId(questionId) });
  }
}

module.exports = QuestionService;
