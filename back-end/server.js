// New server
const http = require("http");
const routes = require("./routes");
const WebSocket = require("ws");
// require('mongoose') is a library that allows you to interact with MongoDB databases.
// require('http') is a built-in Node.js module that allows you to create an HTTP server.

const ser = http.createServer((req, res) => {
  routes(req, res);
});

const io = new WebSocket.Server({ server: ser });
io.on("connection", () => {
  console.log("a user connected");
});
io.on("close", () => {
  console.log("user disconnected");
});
ser.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});

// The http.createServer() method creates an HTTP server object.
// The server object can listen to ports on your computer and execute a response to a given HTTP request.
// The function passed into http.createServer() is called the requestListener.
// This function is executed when the server receives a request.
