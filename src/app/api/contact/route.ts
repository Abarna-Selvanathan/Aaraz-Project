import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  } 

  const { name, email, phoneNumber, message } = req.body;

  if (!name || !email || !phoneNumber || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER, 
          pass: process.env.GMAIL_PASS, 
        },
      });
      
      const mailOptions = {
        from: `"Aaraz Business" <${process.env.GMAIL_USER}>`, 
        replyTo: email,
        to: process.env.GMAIL_USER,
        subject: `New Contact from ${name}`,
        text: `
          Name: ${name}
          Email: ${email}
          Phone: ${phoneNumber}
          Message: ${message}
        `,
      };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Error sending message" });
  }
}


