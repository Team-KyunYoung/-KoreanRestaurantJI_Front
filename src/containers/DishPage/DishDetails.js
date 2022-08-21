import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import ChatShortcut from "components/ShortCut/ChatShortcut";
import ImgBanner from "../../components/Banner/ImgBanner";
import styles from "./Dish.module.scss";
import DishService from "lib/api/DishService";

const image1 = "https://picsum.photos/1200/600";
const DishDetails = () => {
  const dish = useParams();
  const [dishDescription, setDishDescription] = useState();
  const [dishImage, setDishImage] = useState();
  const [dishPrice, setDishPrice] = useState();
  const [dishCategory, setDishCategory] = useState();
  useEffect(() => {
    DishService.findDish(dish.dishNumber).then((response) => {
      setDishDescription(response.data.data.dishDescription);
      setDishImage(response.data.data.dishPhoto);
      setDishPrice(response.data.data.dishPrice);
      setDishCategory(response.data.data.dishCategory);
      console.log(response);
    });
  });
  return (
    <div id="CoursePage">
      <Header />
      <main className={styles.dishDetails}>
        <div className={styles.dish}>
          <div className={styles.dishImg}>
            {/* <img href="#" src={dishImage} alt={dishDescription} /> */}
            <img href="#" src={image1} alt={dishDescription} />
          </div>
          <div className={styles.dishDescription}>
            <div>
              <i>{dishCategory}</i>
              <h4>{dish.dishName}</h4>
              <p>{dishDescription}</p>
            </div>
            <i>{dishPrice}원</i>
          </div>
        </div>
      </main>
      <ChatShortcut />
      <Footer />
    </div>
  );
};

export default DishDetails;
