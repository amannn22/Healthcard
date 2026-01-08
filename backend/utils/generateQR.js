const QRCode = require("qrcode");

module.exports = async (patientId) => {
  // Use Render's provided URL or your custom domain from environment variables
  const baseUrl = process.env.RENDER_EXTERNAL_URL || "http://localhost:3000"; 
  const portalUrl = `${baseUrl}/profile.html?id=${patientId}`;
  return await QRCode.toDataURL(portalUrl);
};