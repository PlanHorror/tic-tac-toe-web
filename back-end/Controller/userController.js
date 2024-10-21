const userModels = require("../Models/userModels");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const mongodb = require("mongodb");
class UserController {
  constructor() {
    this.user = new userModels();
  }
  handleMethod(req, res, url) {
    switch (req.method) {
      case "GET":
        this.user.getCollection().then(() => {
          if (url.length === 2) {
            this.user.getAll().then((users) => {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.write(JSON.stringify(users));
              res.end();
            });
          } else {
            this.user.getById(url[2]).then((user) => {
              if (user) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.write(JSON.stringify(user));
                res.end();
              } else {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.write(JSON.stringify({ message: "User not found" }));
                res.end();
              }
            });
          }
        });
        break;
      case "POST":
        if (url.length > 2) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.write(JSON.stringify({ message: "Not Found" }));
          res.end();
          break;
        }
        let body = "";
        try {
          req.on("data", (chunk) => {
            body += chunk.toString();
          });
          req.on("end", () => {
            const data = JSON.parse(body);
            this.user.getCollection().then(() => {
              this.user.validNewUser(data).then((error) => {
                console.log(data.username || 0, error);
                if (error) {
                  res.writeHead(400, { "Content-Type": "application/json" });
                  res.write(JSON.stringify({ message: error }));
                  res.end();
                } else {
                  data.active = true;
                  data.auth = false;
                  this.user.create(data).then((user) => {
                    res.writeHead(201, { "Content-Type": "application/json" });
                    res.write(
                      JSON.stringify({ message: "User created", user: user })
                    );
                    res.end();
                  });
                }
              });
            });
          });
        } catch (error) {
          console.log(error);
        }
        break;
      case "PUT" || "PATCH":
        this.user.validUpdateUser(data, user_id).then((error) => {
          if (error) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ message: error }));
            res.end();
          } else {
            this.user.update(url[2], data).then((user) => {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.write(
                JSON.stringify({ message: "User updated", user: user })
              );
              res.end();
            });
          }
        });
        break;
      //   this.updateUser(req, res);
      //   break;
      case "DELETE":
        if (url.length !== 3) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.write(JSON.stringify({ message: "Not Found" }));
          res.end();
          break;
        }
        this.user.getCollection().then(() => {
          this.user.getById(url[2]).then((user) => {
            if (user) {
              this.user.delete(url[2]).then(() => {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.write(JSON.stringify({ message: "User deleted" }));
                res.end();
              });
            } else {
              res.writeHead(404, { "Content-Type": "application/json" });
              res.write(JSON.stringify({ message: "User not found" }));
              res.end();
            }
          });
        });
        break;
      default:
        res.writeHead(404, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "Method not allowed" }));
        res.end();
        break;
    }
  }
}
module.exports = UserController;
