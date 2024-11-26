const whatsapp = require("wa-multi-session");
const response = require("../utils/ResponseJson");

const sendMessage = async (request, h) => {
  try {
    const { sessionId, receiver, message } = request.payload;

    if (!sessionId || !receiver || !message) {
      return h
        .response({ message: "Session ID, Nomor, dan Pesan tidak boleh kosong!" })
        .code(400);
    }

    const payload = {
      sessionId,
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

    return h.response(response).code(200);
  } catch (e) {
    console.log(e);
    return h.response({ message: "Terjadi kesalahan server!" }).code(500);
  }
}

module.exports = {
  sendMessage
}