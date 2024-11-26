const whatsapp = require("wa-multi-session");
const response = require("../utils/ResponseJson");
const path = require("path");
const fs = require("fs");
const ErrorLog = require("../utils/ErrorLog");

const sendMessage = async (request, h) => {
  try {
    const { session_id, receiver, message } = request.payload;

    if (!session_id || !receiver || !message) {
      return h
        .response({ message: "Session ID, Nomor, dan Pesan tidak boleh kosong!" })
        .code(400);
    }

    const fileImage = request.payload.file_image ?? null;

    if (fileImage) {
      const fileName = fileImage.hapi.filename;
      // console.log(__dirname);
      const uploadPath = path.join(__dirname, "../../public/uploads", fileName);

      const fileStream = fs.createWriteStream(uploadPath);
      await fileImage.pipe(fileStream);

      const payload = {
        sessionId: session_id,
        to: receiver,
        text: message,
        media: uploadPath,
      };

      const send = await whatsapp.sendImage(payload);

      response.success = true;
      response.message = "Pesan berhasil dikirim!";
      response.status_code = 200;
      response.data = {
        id: send?.key?.id,
        status: send?.status,
        message: send?.message?.extendedTextMessage?.text || "Not Text",
        remoteJid: send?.key?.remoteJid,
      };
    } else {
      const payload = {
        sessionId: session_id,
        to: receiver,
        text: message,
        isGroup: false,
      };
  
      
      const send = await whatsapp.sendTextMessage(payload);
  
      response.success = true;
      response.message = "Pesan berhasil dikirim!";
      response.status_code = 200;
      response.data = {
        id: send?.key?.id,
        status: send?.status,
        message: send?.message?.extendedTextMessage?.text || "Not Text",
        remoteJid: send?.key?.remoteJid,
      };
    }

    return h.response(response).code(200);
  } catch (e) {
    ErrorLog(e.stack);
    return h.response({ message: "Terjadi kesalahan server!" }).code(500);
  }
}

module.exports = {
  sendMessage
}