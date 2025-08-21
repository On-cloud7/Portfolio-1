// send.js

const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail", // or use SMTP config
  auth: {
    user: process.env.SMTP_EMAIL, // your email
    pass: process.env.SMTP_PASS,  // app password
  },
});

/**
 * Send email function
 * @param {Object} data
 * @param {string} data.name - Sender name
 * @param {string} data.email - Sender email
 * @param {string} data.subject - Email subject
 * @param {string} data.message - Email body
 */
async function sendEmail({ name, email, subject, message }) {
  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.SMTP_EMAIL}>`,
    to: "immareddyaravind@gmail.com", // Replace with your email
    subject: subject || "New Contact Form Submission",
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent: ", info.response);
    return { success: true, message: "Message sent successfully!" };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return { success: false, message: "Failed to send message." };
  }
}

// Export function for external use
module.exports = sendEmail;

// Example test (remove if calling from another file)
// Run: node send.js
if (require.main === module) {
  sendEmail({
    name: "Test User",
    email: "test@example.com",
    subject: "Hello",
    message: "This is a test message.",
  });
}
