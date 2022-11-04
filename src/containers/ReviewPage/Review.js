import React, { useState, useEffect } from "react";

import styles from "./Review.module.scss";
import Header from "components/header/Header";
import Chat from "../../components/ChatBot/Chat";
import Footer from "components/footer/Footer";
import ReviewService from "lib/api/ReviewService";
import ClassNameSelect from "./ClassNameSelect";

const Review = () => {
  let cnt = 0;
  function ReviewContent({ content, image }) {
    return (
      <div className={`${styles.review} ${ClassNameSelect(++cnt)}`}>
        <div className={styles.imgBox}>
          <img src={image} alt="review"></img>
        </div>
        <div className={styles.contents}>
          <p>{content}</p>
        </div>
      </div>
    );
  }

  const [reviewList, setReviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    ReviewService.findAllReview()
      .then((response) => {
        setReviewList(response.data.data.slice(0, 11));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return (
    <div id={styles.ReviewPage}>
      <Header />
      <main className={styles.container}>
        {isLoading ? (
          "Loading..."
        ) : reviewList.length === 0 ? (
          <div className={styles.ReviewNone}>리뷰가 없습니다.</div>
        ) : (
          reviewList.map((review) => (
            <ReviewContent
              key={review.reviewContents}
              content={review.reviewContents}
              image={review.reviewImage}
            />
          ))
        )}
      </main>
      <Chat />
      <Footer />
    </div>
  );
};

export default Review;
