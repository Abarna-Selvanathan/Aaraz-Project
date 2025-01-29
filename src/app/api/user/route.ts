import { NextRequest, NextResponse } from "next/server";
import DBconnect from "../../../../lib/dbConnect";
import UserSchema from "../../../../models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const POST = async (req: NextRequest)=> {
  try {
    await DBconnect(); 

    // Parse and validate the request body
    const body = await req.json();
    console.log(body)
    const { name, email, phoneNumber, password, address } = body;

    console.log({ name, email, phoneNumber, address });

    // Check if the user already exists
    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }



    
    // Create a new user instance with userId explicitly set
    const newUser = new UserSchema({
      name,
      email,
      phoneNumber,
      password,
      address,
    });
    console.log("New user created:", newUser);

    
    // Save the user to the database
    await newUser.save();
    console.log("User saved successfully");
    
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET!, { expiresIn: "1h" });

    console.log(newUser, token)

    return NextResponse.json(
      { message: "Account created successfully", user: newUser, token },
      { status: 201 } 
    );
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Failed to create account.", error: error.message },
      { status: 500 }
    );
  }
};

// get all


export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    await DBconnect();

    const users = await UserSchema.find();
    return NextResponse.json(
      { users }, // Wrap users array in an object
      { status: 200 } // Use 200 for successful GET requests
    );
  } catch (error: any) {
    console.error("Error fetching users:", error.message);
    return NextResponse.json(
      { message: "Failed to fetch users.", error: error.message },
      { status: 500 }
    );
  }
};

