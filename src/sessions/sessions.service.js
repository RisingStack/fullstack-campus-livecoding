const Session = require("./sessions.model");

class SessionService {
  static createSession(name) {
    return Session.create({ name }).exec();
  }
  static getSessions() {
    return Session.find().populate("users").populate("questions").exec();
  }
  static async addQuestionToSession(sessionId, questionId) {
    const session = Session.findOneAndUpdate(
      { _id: sessionId },
      {
        $addToSet: {
          questions: questionId,
        },
      },
      {
        useFindAndModify: false,
        new: true,
      }
    )
      .populate("questions")
      .populate("users")
      .exec();

    return session;
  }

  static joinSession(sessionId, userId) {
    console.log({ sessionId, userId });
    return Session.findOneAndUpdate(
      { _id: sessionId },
      {
        $addToSet: {
          // FIXME(anyone): this doesn't insert any documents
          users: { userId },
        },
      },
      {
        useFindAndModify: false,
        new: true,
      }
    )
      .populate("questions")
      .populate("users")
      .exec();
  }
}

module.exports = SessionService;
