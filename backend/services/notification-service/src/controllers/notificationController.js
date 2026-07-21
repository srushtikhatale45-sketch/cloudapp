const { notifyBackupComplete, notifyRestoreComplete, notifyCustom } = require("../services/notificationService");

const sendNotification = async (req, res) => {
  try {
    const { type, to, filename, subject, message } = req.body;

    if (!to) {
      return res.status(400).json({ message: "Recipient email (to) is required" });
    }

    let info;
    if (type === "backup") {
      info = await notifyBackupComplete(to, filename);
    } else if (type === "restore") {
      info = await notifyRestoreComplete(to, filename);
    } else {
      info = await notifyCustom(to, subject || "Notification", message || "");
    }

    return res.status(200).json({ message: "Notification sent", messageId: info.messageId });
  } catch (err) {
    console.error("Notification error:", err.message);
    return res.status(500).json({ message: "Failed to send notification", error: err.message });
  }
};

module.exports = { sendNotification };
