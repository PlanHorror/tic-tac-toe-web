// New server
const http = require("http");
const routes = require("./routes");
// require('mongoose') is a library that allows you to interact with MongoDB databases.
// require('http') is a built-in Node.js module that allows you to create an HTTP server.

const ser = http
  .createServer((req, res) => {
    routes(req, res);
  })
  .listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
// The http.createServer() method creates an HTTP server object.
// The server object can listen to ports on your computer and execute a response to a given HTTP request.
// The function passed into http.createServer() is called the requestListener.
// This function is executed when the server receives a request.
