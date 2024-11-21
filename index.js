const Hapi = require("@hapi/hapi");
const Router = require("./src/routes");
const whatsapp = require("wa-multi-session");
const { config } = require("dotenv");
const checkApiKey = require("./src/middlewares/checkApiKey");

config();

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST
  });

  server.ext("onRequest", checkApiKey);
  server.route(Router);

  await server.start();
  console.log(`Server running on %s`, server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();

whatsapp.onConnected((session) => {
  console.log("connected => ", session);
});

whatsapp.onDisconnected((session) => {
  console.log("disconnected => ", session);
});

whatsapp.onConnecting((session) => {
  console.log("connecting => ", session);
});

whatsapp.loadSessionsFromStorage();