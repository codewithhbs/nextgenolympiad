import nodemailer from "nodemailer";

let transporter;
function getTransporter() {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  return transporter;
}

const wrap = (title, body) => `
  <div style="font-family:Nunito,Arial,sans-serif;background:#F4F8FC;padding:32px">
    <div style="max-width:560px;margin:auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(15,44,92,.06)">
      <div style="background:#0F2C5C;padding:20px 28px;color:#fff">
        <h2 style="margin:0;font-size:20px">NextGen Olympiad Foundation</h2>
        <p style="margin:4px 0 0;color:#F4791F;font-size:13px;letter-spacing:1px">LEARN • COMPETE • EXCEL</p>
      </div>
      <div style="padding:28px;color:#0F2C5C">
        <h3 style="margin-top:0">${title}</h3>${body}
      </div>
      <div style="padding:16px 28px;background:#FBF7EF;color:#334E7E;font-size:12px">
        © NextGen Olympiad Foundation · Rohini, Delhi-110086
      </div>
    </div>
  </div>`;

export async function sendMail({ to, subject, html }) {
  const t = getTransporter();
  return t.sendMail({ from: process.env.MAIL_FROM || process.env.SMTP_USER, to, subject, html });
}

export const mailTemplates = {
  otp: (name, code) =>
    wrap("Verify your email", `<p>Hi ${name || "there"},</p><p>Your OTP is:</p>
      <p style="font-size:30px;font-weight:800;letter-spacing:6px;color:#F4791F">${code}</p>
      <p>This code expires in 10 minutes.</p>`),
  approved: (name) =>
    wrap("School approved 🎉", `<p>Hi ${name},</p><p>Your school registration has been approved. You can now log in and manage students & results.</p>`),
  rejected: (name, reason) =>
    wrap("Registration update", `<p>Hi ${name},</p><p>Your registration was not approved.</p><p><b>Reason:</b> ${reason || "Not specified"}</p>`),
  reset: (name, link) =>
    wrap("Reset your password", `<p>Hi ${name},</p><p>Click below to reset your password (valid 30 min):</p>
      <p><a href="${link}" style="background:#F4791F;color:#fff;padding:12px 22px;border-radius:10px;text-decoration:none;display:inline-block">Reset password</a></p>`),
  resultUploaded: (school, count) =>
    wrap("Results published", `<p>Hi ${school},</p><p>${count} result(s) have been published to your dashboard. Log in to view, download or print.</p>`),
  contactReply: (name, msg) =>
    wrap("Reply from NextGen Olympiad", `<p>Hi ${name},</p><p>${msg}</p>`),
};
