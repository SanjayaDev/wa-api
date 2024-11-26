const { startSession } = require("../controllers/SessionController");
const { sendMessage } = require("../controllers/MessageController");

const Router = [
  {
    method: "GET",
    path: "/",
    handler: function (request, h) {
      return "Hello World!";
    },
  },
  {
    method: "POST",
    path: "/start-session",
    handler: startSession,
  },
  {
    method: "POST",
    path: "/send-message",
    handler: sendMessage,
  },
];

module.exports = Router;