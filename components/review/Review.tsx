import React, { useState } from "react";
import '../review/Review.css'
import "../../src/app/globals.css"


const Reviewpage: React.FC = () => {
  // State for recommendation and rating
  const [recommended, setRecommended] = useState<boolean | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");

  // Handle recommendation button click
  const handleRecommendation = (value: boolean) => {
    setRecommended(value);
  };

  // Handle rating button click
  const handleRating = (value: number) => {
    setRating(value);
  };

  // Handle comment change
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  // Handle form submission
  const handleSubmit = () => {
    const reviewData = {
      recommended,
      rating,
      comment,
    };
    console.log("Review submitted:", reviewData);
    // You can send the data to the server here
  };

  return (
    <>
      

      <div className="reviews">
        <h1>Reviews</h1>

        {/* Recommendation Section */}
        <section className="review">
          <h2>Do you recommend this product?</h2>
          <div className="reviewButton">
            <button onClick={() => handleRecommendation(true)}>Yes</button>
            
            <button onClick={() => handleRecommendation(false)}>No</button>
          </div>
        </section>

        {/* Recommendation Text */}
        <section className="recommendtext">
          {recommended !== null && (
            <>
              <textarea
                className="recommend-textarea"
                placeholder="Tell us why you recommend or don't recommend this product..."
                value={comment}
                onChange={handleCommentChange}
              ></textarea>
              <button className="submit-comment" onClick={handleSubmit}>
                Submit
              </button>
            </>
          )}
        </section>

        {/* Rating Section */}
        <section className="rating">
          <h2>Rate This Product</h2>
          <p>How would you rate your experience?</p>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((starValue) => (
              <span
                key={starValue}
                className="star"
                data-value={starValue}
                onClick={() => handleRating(starValue)}
              >
                &#9733;
              </span>
            ))}
          </div>
          <button className="submit-rating" onClick={handleSubmit}>
            Submit Rating
          </button>
        </section>
      </div>

    </>
  );
};

export default Reviewpage;
