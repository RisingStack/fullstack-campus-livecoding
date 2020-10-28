const { MongoClient } = require("mongodb");

// Database Name
const dbName = "fullstack_campus_db";

let dbClient;
module.exports = {
  getDBClient() {
    return dbClient;
  },
  connect(connectionString) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(
        connectionString,
        {
          useUnifiedTopology: true,
        },
        function (err, client) {
          if (err) {
            reject();
          }
          const db = client.db(dbName);

          dbClient = db;
          resolve();
        }
      );
    });
  },
};
