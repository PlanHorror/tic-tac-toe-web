const { ObjectId } = require("mongodb");
const Database = require("./db");
class User {
  constructor() {
    this.db = new Database();
    this.collection = null;
  }
  getCollection() {
    return this.db.getCollection("User").then((val) => (this.collection = val));
  }
  async getAll() {
    const users = await this.collection.find().toArray();
    return users;
  }
  async getById(id) {
    try {
      const user = await this.collection.findOne({
        _id: ObjectId.createFromHexString(id),
      });
      return user;
    } catch (error) {
      return null;
    }
  }
  async create(data) {
    const user = await this.collection.insertOne(data);
    return user;
  }
  async update(id, data) {
    const user = await this.collection.updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: data }
    );
    return user;
  }
  async delete(id) {
    const user = await this.collection.deleteOne({
      _id: ObjectId.createFromHexString(id),
    });
    return user;
  }
  async validNewUser(data) {
    let error = null;
    data.username ? null : (error = [...(error || []), "Username is required"]);
    data.password ? null : (error = [...(error || []), "Password is required"]);
    data.email ? null : (error = [...(error || []), "Email is required"]);
    (await this.collection.findOne({ email: data.email }))
      ? (error = [...(error || []), "Email already exists"])
      : null;
    (await this.collection.findOne({ username: data.username }))
      ? (error = [...(error || []), "Username already exists"])
      : null;
    data.username?.length < 3
      ? (error = [...(error || []), "Username must be at least 3 characters"])
      : null;
    data.password?.length < 8
      ? (error = [...(error || []), "Password must be at least 8 characters"])
      : null;
    data.email?.length < 3
      ? (error = [...(error || []), "Email must be at least 3 characters"])
      : null;
    data.email?.includes("@") &&
    data.email?.includes(".") &&
    data.email?.length > 5
      ? null
      : (error = [...(error || []), "Email is not valid"]);
    return error;
  }
}
module.exports = User;
