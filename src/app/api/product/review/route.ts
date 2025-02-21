import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect";
import Review from "../../../../../models/Review";

// Connect to the database
dbConnect();

// POST handler for submitting a review
export async function POST(request: Request) {
  try {
    const { productId, userId, rating, recommended, comment } = await request.json();

    // Validate required fields
    if (!productId || !userId || !rating || !comment || recommended === null) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert "recommended" to a boolean
    const isRecommended = recommended === "yes";

    // Create and save the new review
    const newReview = new Review({
      productId,
      userId,
      rating,
      recommended: isRecommended,
      comment,
    });

    await newReview.save();

    return NextResponse.json(
      { message: "Review submitted successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to submit review" },
      { status: 500 }
    );
  }
}

// GET handler for fetching reviews
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("id");
    console.log('ProductId: ',productId)
    // Validate productId
    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    // Fetch reviews for the product
    const reviews = await Review.find({ productId });

    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
} 