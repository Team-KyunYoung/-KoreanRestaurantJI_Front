import React, { useState, useEffect } from "react";

import styles from "./Review.module.scss";
import Header from "components/header/Header";
import Chat from "../../components/ChatBot/Chat";
import Footer from "components/footer/Footer";
import ReviewService from "lib/api/ReviewService";
import ClassNameSelect from './ClassNameSelect';

const image1 = "https://picsum.photos/600/600";
const image2 = "https://picsum.photos/300/600";
const image3 = "https://picsum.photos/600/300";
const image4 = "https://picsum.photos/300/300";
function imageSelect(num){
  if(num === 1) return image1
  else if(num === 2) return image2
  else if(num === 3) return image3
  else return image4
}

const Review = () => {
  let cnt = 0;
  function ReviewContent({content, image}){
    return (
      <div className={`${styles.review} ${ClassNameSelect(++cnt)}`}>
        <div className={styles.imgBox}>
          {/* <img src={image}></img> */}
          <img src={imageSelect(cnt%4+1)}></img>
        </div>
        <div className={styles.contents}>
          <p>{content}</p>
        </div>
      </div>
    )
  }

  const [reviewList, setReviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    ReviewService.findAllReview()
      .then((response) => {
        setReviewList(response.data.data.slice(0, 11))
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return (
    <div id={styles.ReviewPage}>
      <Header />
      <main className={styles.container}>
        { isLoading ? "Loading..." :
          reviewList.length == 0 ? <div className={styles.ReviewNone}>리뷰가 없습니다.</div>
          : reviewList.map( review => (
            <ReviewContent key={review.reviewContents}
              content={review.reviewContents}
              image={review.reviewImage}
            />
          ))
        }
      </main>
      <Chat />
      <Footer />
    </div>
  );
};

export default Review;
