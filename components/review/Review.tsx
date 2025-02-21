import React, { useState, useEffect } from "react";
import '../review/Review.css';
import "../../src/app/globals.css";
import axios from "axios";
import { XCircle } from "lucide-react";
import router from "next/router";



interface UserData {
  _id: string;
  name: string;
  email: string;
  phoneNumber: number;
}

interface ReviewPageProps {
  id: string;
}

const ReviewPage: React.FC<ReviewPageProps> = ({ id }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [recommended, setRecommended] = useState<boolean | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const [reviews, setReviews] = useState<{ comment: string; rating: number; recommended: boolean | null }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserAndReviewData = async () => {
      setLoading(true)
      try {
        const userId = id
        const userResponse = await axios.post("/api/user/getUserById", { id: userId });
        const response = await axios.get(`/api/product/review?id=${id}`);
        if (response.status !== 200) throw new Error("Failed to fetch reviews");

        setUserData(userResponse.data);
        setReviews(response.data.reviews || []);
      } catch (error) {
        console.log("Error fetching user:", error);
      } finally {
        setLoading(false)
      }
    };

    fetchUserAndReviewData();
  }, [id]);

  const handleRecommendation = (value: boolean) => {
    setRecommended(value);
  };

  const handleRating = (value: number) => {
    setRating(value);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    if (!rating || !comment) {
      alert("Please provide both rating and a comment.");
      return;
    }

    const reviewData = { productId: id, userId: userData?._id, recommended, rating, comment };

    try {
      const response = await axios.post("/api/product/review", reviewData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Review submitted successfully:", response.data);
      alert("Review submitted successfully!");

      setReviews([...reviews, reviewData]);
      setComment("");
      setRecommended(null);
      setRating(null);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  const handleClosePage = () => {
    router.push("/");
  };
  return (
    <>
      <div className="review">
        <div className="closeButton" onClick={handleClosePage}>
          <XCircle size={30} />
        </div>
        <div className="reviews-main">

          <section className="review">
            <h2>Do you recommend this product?</h2>
            <div className="reviewButton">
              <button className={recommended === true ? "selected" : ""} onClick={() => handleRecommendation(true)}>Yes</button>
              <button className={recommended === true ? "selected" : ""} onClick={() => handleRecommendation(true)}>No</button>

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

        <div className="reviews-section">
          <h2>Customer Reviews</h2>
          {loading ? (
            <p>Loading reviews...</p>
          ) : reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="review">
                <p ><strong >Rating:</strong> <strong className="star" >{review.rating} &#9733;</strong></p>
                <p><strong>Recommended:</strong> {review.recommended ? "No" : "Yes"}</p>
                <p>{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ReviewPage;