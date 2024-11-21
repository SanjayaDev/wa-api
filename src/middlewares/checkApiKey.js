const { config } = require("dotenv");

config();

const checkApiKey = async (request, h) => {
  const apiKey = request.headers["x-api-key"] ?? null;
  if (apiKey !== process.env.API_KEY) {
    return h.response({ message: "Unauthorized" }).code(401).takeover(); 
  }
  return h.continue;
}

module.exports = checkApiKey;