const transporter = require('../config/email');
const { query } = require('../../shared/database'); // if you have a shared DB util, otherwise use your own

exports.sendNotification = async (req, res) => {
  const { userId, subject, message } = req.body;
  // Fetch user email from database
  // For demo, we assume a dummy email
  const userEmail = 'demo@example.com';

  try {
    await transporter.sendMail({
      to: userEmail,
      subject,
      text: message,
    });
    res.json({ sent: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};