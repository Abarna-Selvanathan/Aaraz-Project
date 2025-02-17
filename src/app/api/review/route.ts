import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/dbConnect";
import Review from "../../../../models/Review";

// Connect to the database
dbConnect();

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { id } = query; // productId from the URL

  if (method === "GET") {
    try {
      // Fetch all reviews for the specific product
      const reviews = await Review.find({ productId: id });
      return res.status(200).json({ reviews });
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch reviews" });
    }
  }

  if (method === "POST") {
    try {
      // Validate and create a new review
      const { rating, recommended, comment } = req.body;

      if (!rating || !comment || recommended === null) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const newReview = new Review({
        productId: id,
        rating,
        recommended,
        comment,
      });

      await newReview.save();
      return res.status(201).json({ message: "Review submitted successfully!" });
    } catch (error) {
      return res.status(500).json({ message: "Failed to submit review" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
