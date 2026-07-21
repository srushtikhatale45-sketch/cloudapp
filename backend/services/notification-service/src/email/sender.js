const resend = require("../config/email");

const sendEmail = async ({ to, subject, text, html }) => {
  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM || "onboarding@resend.dev",
    to,
    subject,
    text,
    html,
  });

  if (error) throw new Error(error.message || JSON.stringify(error));
  return data;
};

module.exports = { sendEmail };
