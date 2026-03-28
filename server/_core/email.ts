import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, html: string) {
  const smtpHost = process.env.SMTP_HOST ?? "";
  const smtpPort = process.env.SMTP_PORT ?? "";
  const smtpUser = process.env.SMTP_USER ?? "";
  const smtpPass = process.env.SMTP_PASS ?? "";

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    console.warn("SMTP environment variables are not fully configured. Skipping email sending.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: parseInt(smtpPort, 10),
    secure: parseInt(smtpPort, 10) === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    await transporter.sendMail({
      from: smtpUser,
      to: to,
      subject: subject,
      html: html,
    });
    console.log("Email sent successfully to", to);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
