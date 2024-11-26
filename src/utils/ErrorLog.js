const fs = require("fs");
const path = require("path");

const ErrorLog = (message) => {
  const logPath = path.join(__dirname, "../logs/error.log");
  const logMessage = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFile(logPath, logMessage, (err) => {
    if (err) {
      console.error("Gagal nulis log:", err);
    }
  });
}

module.exports = ErrorLog;