import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.imitate.email",
  port: 587,
  secure: false,
  auth: {
    user: "7ee1cee9-2ddd-4b3a-8183-018f285f653e",
    pass: "499d3f75-b422-444a-9911-166260334fd7",
  },
});

async function sendMail(email: string, id: string, type: string) {
  const info = await transporter.sendMail({
    from: `"Your company" <anything@rawatayush711-personal-pjsj.imitate.email>}`,
    to: `${email}`,
    subject: `${
      type === "emailVerification"
        ? "Please verify your email..."
        : "Reset your Password"
    }`,
    html: `<p>${
      type === "emailVerification"
        ? "Hello, verify your email address by clicking on this"
        : "Click to Reset Password"
    }</p>
        <br>
        <a href=http://localhost:8000/${
          type === "emailVerification" ? "verifyEmail" : "resetPassword"
        }?userId=${id}>${
      type === "emailVerification"
        ? "Click here to verify"
        : "Click here to Reset"
    }</a>
        `,
  });

  console.log("Message sent: %s", info.messageId);
}
export default sendMail;
