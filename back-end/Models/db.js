// Connect mongoDB without mongoose
const { MongoClient } = require("mongodb");
class Database {
  constructor() {
    this.url = "mongodb://localhost:27017";
    this.dbName = "TicTacToe";
    this.client = new MongoClient(this.url);
    this.db = this.client.db(this.dbName);
    this.client.connect();
  }
  // getDb = async function (db) {
  //   const list_db = await db.admin().listDatabases();
  //   const dbExists = list_db.databases.some((db) => db.name === dbName);
  //   let database;
  //   dbExists
  //     ? (database = client.db(dbName))
  //     : (database = await client.db(dbName));
  //   return database;
  // };
  getCollection = async function (collectionName) {
    // Check if collection exists
    const collections = await this.db.listCollections().toArray();
    const collectionExists = collections.some(
      (collection) => collection.name === collectionName
    );
    let collection;
    collectionExists ? (collection = this.db.collection(collectionName)) : null;
    return collection;
  };
}
module.exports = Database;
