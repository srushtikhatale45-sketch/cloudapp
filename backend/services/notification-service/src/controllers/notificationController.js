const { query } = require('../config/database');
const transporter = require('../config/email');

exports.sendNotification = async (req, res) => {
  const { userId, subject, message } = req.body;

  if (!userId || !subject || !message) {
    return res.status(400).json({ error: 'userId, subject, and message are required' });
  }

  try {
    // Fetch user email from database
    const userResult = await query('SELECT email FROM users WHERE id = $1', [userId]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userEmail = userResult.rows[0].email;

    // Send email
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Cloud Backup" <noreply@cloudbackup.com>',
      to: userEmail,
      subject,
      text: message,
      html: message.replace(/\n/g, '<br>'), // simple HTML conversion
    });

    console.log(`📨 Email sent to ${userEmail}: ${info.messageId}`);
    res.json({ success: true, messageId: info.messageId });

  } catch (err) {
    console.error('❌ Notification error:', err.message);
    res.status(500).json({ error: 'Failed to send notification', details: err.message });
  }
};