import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phoneNumber, message } = body;

    if (!name || !email || !phoneNumber || !message) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

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
    return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 });

  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Error sending message" }, { status: 500 });
  }
}
