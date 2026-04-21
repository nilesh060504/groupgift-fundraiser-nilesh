const nodemailer = require("nodemailer");
let warnedMissingSmtp = false;

const createTransporter = () => {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    if (!warnedMissingSmtp) {
      warnedMissingSmtp = true;
      console.warn("Email service is running in dev mode (jsonTransport). Configure SMTP_* env vars for real emails.");
    }
    return nodemailer.createTransport({ jsonTransport: true });
  }

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || "false") === "true",
    auth: { user, pass }
  });
};

const sendPaymentEmail = async ({ to, fundTitle, amount, phonePeLink, upiLink }) => {
  const transporter = createTransporter();
  const from = process.env.SMTP_FROM || "GroupGift <no-reply@groupgift.local>";
  const subject = `Your GroupGift payment link for ${fundTitle}`;

  const text = [
    `Hi,`,
    ``,
    `Your share for "${fundTitle}" is INR ${amount}.`,
    `PhonePe link: ${phonePeLink}`,
    `UPI fallback link: ${upiLink}`,
    ``,
    `If PhonePe does not open directly, copy the UPI link into your preferred UPI app.`,
    ``,
    `- GroupGift`
  ].join("\n");

  const html = `
    <p>Hi,</p>
    <p>Your share for <strong>${fundTitle}</strong> is <strong>INR ${amount}</strong>.</p>
    <p><a href="${phonePeLink}">Pay with PhonePe</a></p>
    <p><a href="${upiLink}">UPI fallback link</a></p>
    <p>If PhonePe does not open directly, copy the UPI link into your preferred UPI app.</p>
    <p>- GroupGift</p>
  `;

  return transporter.sendMail({ from, to, subject, text, html });
};

const sendPaymentReceiptEmail = async ({ to, fundTitle, amount, transactionId }) => {
  const transporter = createTransporter();
  const from = process.env.SMTP_FROM || "GroupGift <no-reply@groupgift.local>";
  const subject = `Payment receipt for ${fundTitle}`;

  const text = [
    `Hi,`,
    ``,
    `Your payment has been verified successfully.`,
    `Fund: ${fundTitle}`,
    `Amount: INR ${amount}`,
    `Transaction ID: ${transactionId}`,
    ``,
    `Thank you for contributing.`,
    ``,
    `- GroupGift`
  ].join("\n");

  const html = `
    <p>Hi,</p>
    <p>Your payment has been verified successfully.</p>
    <p><strong>Fund:</strong> ${fundTitle}</p>
    <p><strong>Amount:</strong> INR ${amount}</p>
    <p><strong>Transaction ID:</strong> ${transactionId}</p>
    <p>Thank you for contributing.</p>
    <p>- GroupGift</p>
  `;

  return transporter.sendMail({ from, to, subject, text, html });
};

module.exports = {
  sendPaymentEmail,
  sendPaymentReceiptEmail
};
