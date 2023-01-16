import { readFileSync } from "fs";
import Handlebars from "handlebars";
import { User } from "next-auth";
import { SendVerificationRequestParams } from "next-auth/providers";
import nodemailer from "nodemailer";
import path from "path";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD
  },
  secure: true
});

const emailsDir = path.resolve(process.cwd(), "email/templates");

export const sendVerificationRequest = ({
  identifier,
  url
}: SendVerificationRequestParams) => {
  const emailFile = readFileSync(path.join(emailsDir, "auth.html"), {
    encoding: "utf8"
  });
  const emailTemplate = Handlebars.compile(emailFile);
  transporter.sendMail({
    from: `"✨ SupaVacation" ${process.env.EMAIL_FROM}`,
    to: identifier,
    subject: "Your sign-in link for SupaVacation",
    html: emailTemplate({
      base_url: process.env.NEXTAUTH_URL,
      signin_url: url,
      email: identifier
    })
  });
};

export const sendWelcomeEmail = async ({ user }: { user: User }) => {
  const { email } = user;

  try {
    const emailFile = readFileSync(path.join(emailsDir, "welcome.html"), {
      encoding: "utf8"
    });
    const emailTemplate = Handlebars.compile(emailFile);
    if (email) {
      transporter.sendMail({
        from: `"✨ SupaVacation" ${process.env.EMAIL_FROM}`,
        to: email,
        subject: "Welcome to SupaVacation! 🎉",
        html: emailTemplate({
          base_url: process.env.NEXTAUTH_URL,
          support_email: "ivo@vist.gg"
        })
      });
    }
  } catch (error) {
    console.log(`❌ Unable to send welcome email to user (${email})`);
  }
};
