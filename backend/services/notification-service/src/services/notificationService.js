const { sendEmail } = require("../email/sender");

const notifyBackupComplete = async (to, filename) => {
  return sendEmail({
    to,
    subject: "Backup Completed",
    text: `Your backup "${filename}" completed successfully.`,
    html: `<p>Your backup <strong>${filename}</strong> completed successfully.</p>`,
  });
};

const notifyRestoreComplete = async (to, filename) => {
  return sendEmail({
    to,
    subject: "Restore Completed",
    text: `Your file "${filename}" has been restored successfully.`,
    html: `<p>Your file <strong>${filename}</strong> has been restored successfully.</p>`,
  });
};

const notifyCustom = async (to, subject, message) => {
  return sendEmail({ to, subject, text: message, html: `<p>${message}</p>` });
};

module.exports = { notifyBackupComplete, notifyRestoreComplete, notifyCustom };
