import React, { useState, useEffect } from "react";
import '../review/Review.css';
import "../../src/app/globals.css";

interface ReviewPageProps {
  id: string; // Product ID for fetching reviews
}

const ReviewPage: React.FC<ReviewPageProps> = ({ id }) => {
  const [recommended, setRecommended] = useState<boolean | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const [reviews, setReviews] = useState<{ comment: string; rating: number; recommended: boolean | null }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch Product Reviews from Backend
  useEffect(() => {
    if (!id) return;

    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/product/${id}/reviews`);
        if (!response.ok) throw new Error("Failed to fetch reviews");

        const data = await response.json();
        setReviews(data.reviews || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [id]);

  // Handle Recommendation
  const handleRecommendation = (value: boolean) => {
    setRecommended(value);
  };

  // Handle Rating
  const handleRating = (value: number) => {
    setRating(value);
  };

  // Handle Comment Change
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  // Submit Review to Backend
  const handleSubmit = async () => {
    if (!rating || !comment) {
      alert("Please provide both rating and a comment.");
      return;
    }

    const reviewData = { recommended, rating, comment };

    try {
      const response = await fetch(`/api/product/${id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      // Update UI after successful submission
      setReviews([...reviews, reviewData]);
      setComment("");
      setRecommended(null);
      setRating(null);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <>
      <div className="reviews-main">
        <section className="review">
          <h2>Do you recommend this product?</h2>
          <div className="reviewButton">
            <button className={recommended === true ? "selected" : ""} onClick={() => handleRecommendation(true)}>Yes</button>
            <button className={recommended === false ? "selected" : ""} onClick={() => handleRecommendation(false)}>No</button>
          </div>
        </section>

        {recommended !== null && (
          <section className="rating">
            <div className="stars">
              {[1, 2, 3, 4, 5].map((starValue) => (
                <span
                  key={starValue}
                  className={`star ${rating && rating >= starValue ? "selected-star" : ""}`}
                  data-value={starValue}
                  onClick={() => handleRating(starValue)}
                >
                  &#9733;
                </span>
              ))}
            </div>
          </section>
        )}

        {recommended !== null && (
          <section className="recommendtext">
            <textarea
              className="recommend-textarea"
              placeholder="Tell us why you recommend or don't recommend this product..."
              value={comment}
              onChange={handleCommentChange}
            ></textarea>
          </section>
        )}
        {recommended !== null && (
        <button className="submit" onClick={handleSubmit}>Submit Review</button>
        )}
      </div>

      {/* Customer Reviews Section */}
      <div className="reviews-section">
        <h2>Customer Reviews</h2>
        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review">
              <p><strong>Rating:</strong> {review.rating} ★</p>
              <p><strong>Recommended:</strong> {review.recommended ? "Yes" : "No"}</p>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      
    </>
  );
};

export default ReviewPage;
