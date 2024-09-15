import { formatCurrency } from "@/utils/formatters";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  // host: "smtp.gmail.com",
  // port: 587,
  // secure: false,
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

// sending reset link to set password
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/new-password?token=${token}`;

  transporter.sendMail({
    from: process.env.APP_EMAIL,
    to: email,
    subject: "Reset your password",
    html: `<a href="${resetLink}">click to reset your password</a>`, // HTML body
  });
};

// sending confimation link to verifiy the user
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `
    ${process.env.NEXT_PUBLIC_SERVER_URL}/auth/new-verification?token=${token}&email=${email}
  `;

  transporter.sendMail({
    from: process.env.APP_EMAIL,
    to: email,
    subject: "Confirm Your Email",
    text: "please confirm your email",
    html: `<a href="${confirmLink}">Click to confirm email</a>`, // HTML body
  });
};

// send code to verfiy
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  transporter.sendMail({
    from: process.env.APP_EMAIL,
    to: email,
    subject: "2FA Code",
    html: `<p>your 2FA code: ${token}</p>`, // HTML body
  });
};

export const sendOrderConfirmation = async (
  email: string,
  pricePaidInCents: number
) => {
  transporter.sendMail({
    from: process.env.APP_EMAIL,
    to: email,
    subject: "Order Confirmation",
    html: `<div>
      <p>Successful Purchase</p>
      <p>${formatCurrency(pricePaidInCents / 100)}</p>
    </div>`,
  });
};

export const sendContactEmail = async (email: string, subject: string) => {
  transporter.sendMail({
    from: process.env.APP_EMAIL,
    to: email,
    subject,
    html: `<p>your 2FA code: ${5}</p>`, // HTML body
  });
};
