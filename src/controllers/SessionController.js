const whatsapp = require("wa-multi-session");
const { toDataURL } = require("qrcode");

const startSession = async (request, h) => {
  try {
    const sessionName = request.payload?.session_name;

    if (!sessionName) {
      return h
        .response({
          message: "Session name is required",
        })
        .code(400);
    }
    await whatsapp.startSession(sessionName, { printQR: true });
    
    return new Promise((resolve, reject) => {
      whatsapp.onQRUpdated(async (data) => {
        const qr = await toDataURL(data.qr);
        const response = {
          message: "Get QR",
          qr: qr,
        };

        resolve(h.response(response).code(200));
      })
    });
  } catch(e) {
    console.log(e);
    return h.response({ message: "Error Server!" }).code(500);
  }
}

const deleteSession = async (request, h) => {
  const sessionId = request.payload.session_id;

  if (!sessionId) {
    return h
      .response({
        message: "Session ID is required",
      })
      .code(400);
  }

  whatsapp.deleteSession(sessionId);

  return h.response({ message: "Success delete session" }).code(200);
}

module.exports = {
  startSession,
  deleteSession,
};