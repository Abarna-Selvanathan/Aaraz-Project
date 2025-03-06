import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import DBconnect from "../../../../../lib/dbConnect";
import UserSchema from "../../../../../models/User";
import bcrypt from 'bcrypt' 
const JWT_SECRET = process.env.JWT_SECRET;


export const POST = async (req: NextRequest) => {
  try {
    await DBconnect();
    const { email, password } = await req.json();
    const user = await UserSchema.findOne({ email });
    console.log (user)
    
    
    // Decrypt code was correct. But this function most important to login. First I didn't notice this function
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        userType: user.userType
      },
      JWT_SECRET!,
      { expiresIn: 115552000 }
    );

    const response = NextResponse.json(
      { message: "Login successful", token, userType: user.userType },
      { status: 201 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15552000,
      path: "/"
    })

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};