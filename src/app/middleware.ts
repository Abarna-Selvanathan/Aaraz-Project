import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export function middleware(req: NextRequest) {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url)); 
  } 

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      userType: string;
    }; 
 
    const userType = decoded.userType; 
    const url = req.nextUrl.clone();

    
    if (url.pathname.startsWith("/admin") && userType !== "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url)); 
    }
    if (url.pathname.startsWith("/home") && userType !== "customer") {
      return NextResponse.redirect(new URL("/", req.url)); 
    }

    return NextResponse.next(); 
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/login", req.url)); 
  }

  
}