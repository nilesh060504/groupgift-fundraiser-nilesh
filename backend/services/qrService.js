const QRCode = require("qrcode");

const generateQrCodeDataUrl = async (text) => {
  return QRCode.toDataURL(text, {
    errorCorrectionLevel: "M",
    margin: 1,
    width: 280
  });
};

module.exports = {
  generateQrCodeDataUrl
};
