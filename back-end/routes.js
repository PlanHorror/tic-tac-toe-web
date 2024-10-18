const UserController = require("./Controller/userController");
const routes = (req, res) => {
  const url = req.url.split("/");
  const userController = new UserController();
  if (url.length > 3) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "Not Found" }));
    res.end();
  } else {
    switch (url[1]) {
      case "user":
        userController.handleMethod(req, res, url);
        break;
      case "test":
        const id = req.url.search;
        console.log(id);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "Test" }));
        res.end();
        break;
      default:
        res.writeHead(404, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "Not Found" }));
        res.end();
        break;
    }
  }
};
module.exports = routes;
