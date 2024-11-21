const { startSession } = require("../controllers/SessionController");

const Router = [
  {
    method: "GET",
    path: "/",
    handler: function(request, h) {
      return "Hello World!";
    }
  },
  {
    method: "POST",
    path: "/start-session",
    handler: startSession
  }
];

module.exports = Router;