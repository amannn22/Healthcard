const QRCode = require("qrcode");

module.exports = async (patientId) => {
  // REPLACE '192.168.1.5' with your actual IPv4 Address from ipconfig
  const networkIP = "192.168.1.5"; 
  const portalUrl = `http://${networkIP}:3000/profile.html?id=${patientId}`;
  return await QRCode.toDataURL(portalUrl);
};