import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "components/header/Header";
import Chat from "../../components/ChatBot/Chat";
import Footer from "components/footer/Footer";
import styles from "./DishDetails.module.scss";
import DishService from "lib/api/DishService";

const image1 = "https://picsum.photos/2000/1200";
const DishDetails = () => {
  const dish = useParams();
  const [dishDescription, setDishDescription] = useState();
  const [dishImage, setDishImage] = useState();
  const [dishPrice, setDishPrice] = useState();
  const [dishCategory, setDishCategory] = useState();
  const [dishNutritionFacts, setdishNutritionFacts] = useState([]);
  const [mount, setMount] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    DishService.findDish(dish.dishNumber).then((response) => {
      setDishDescription(response.data.data.dishDescription);
      setDishImage(response.data.data.dishPhoto);
      setDishPrice(response.data.data.dishPrice);
      setDishCategory(response.data.data.dishCategory);
      setdishNutritionFacts(response.data.data.dishNutritionFacts)
      console.log(response);
      setMount(true)
      setTimeout(() => setIsVisible(true), 1000);
    });
  }, []);
  return (
    <div id={styles.DishDetailPage}>
      <Header />
      <main className={styles.container}>
        <div className={styles.dishCategory}><h2>{dishCategory}</h2></div>
        {mount ? 
          <div className={styles.dishDetails} style={{backgroundImage: `url(${image1})`}}>
          {/* <div className={styles.dish} data-aos="zoom-in" style={`background-image: ${dishImage};`}> */}
            <div className={`${styles.dishDescriptionBox} ${isVisible ? styles.slideInRight : null}`}>
              <div className={styles.dishDescription}>
                <p className={styles.dishName}>{dish.dishName}</p>
                <p className={styles.description}>{dishDescription}</p>
                <div className={styles.dishNutritionFacts}>
                  <div className={styles.header}>
                    <p className={styles.title}>영양 성분표</p>
                    <p className={styles.servingSize}>총 용량: {dishNutritionFacts.dishServingSize}g</p>
                  </div>
                  <div className={styles.contents}>
									  <ul className={styles.leftUl}>
                      <li className={styles.kcal}>
                        <dl>
                          <dt>열량 (kcal)</dt>
                          <dd>{dishNutritionFacts.dishCalroies}</dd>
                        </dl>
                      </li>
                      <li className={styles.fat}>
                        <dl>
                          <dt>지방 (g)</dt>
                          <dd>{dishNutritionFacts.dishFat}</dd>
                        </dl>
                      </li>
                      <li className={styles.protein}>
                        <dl>
                          <dt>단백질 (g)</dt>
                          <dd>{dishNutritionFacts.dishProtein}</dd>
                        </dl>
                      </li>
                      <li className={styles.choles_FAT} style={{display: "none"}}>
                        <dl>
                          <dt>콜레스테롤 (g)</dt>
                          <dd>{dishNutritionFacts.dishCholesterol}</dd>
                        </dl>
                      </li>
                      <li className={styles.trans_FAT} style={{display: "none"}}>
                        <dl>
                          <dt>트랜스지방 (g)</dt>
                          <dd>{dishNutritionFacts.dishTransFat}</dd>
                        </dl>
                      </li>                      
                    </ul>
                    <ul className={styles.rightUl}>
                      <li className={styles.chabo}>
                        <dl>
                          <dt>탄수화물 (g)</dt>
                          <dd>{dishNutritionFacts.dishCarbohydrate}</dd>
                        </dl>
                      </li>
                      <li className={styles.sodium}>
                        <dl>
                          <dt>나트륨 (mg)</dt>
                          <dd>{dishNutritionFacts.dishSodium}</dd>
                        </dl>
                      </li>
                      <li className={styles.sugars}>
                        <dl>
                          <dt>당류 (g)</dt>
                          <dd>{dishNutritionFacts.dishSugars}</dd>
                        </dl>
                      </li>
                    </ul>
                  </div>
                </div>
                <p className={styles.dishPrice}>{dishPrice.toLocaleString('ko-KR')}원</p>
              </div>
            </div>
          </div> : null }
          <div className={styles.toBtn}>
            <ul>
              <Link to="/SelectRoom"><li className={styles.btnReservation}>식당 예약하기</li></Link>
              <Link to=""> <li className={styles.btnCart}>장바구니에 담기</li></Link>
            </ul>
          </div>
      </main>
      <Chat />
      <Footer />
    </div>
  );
};

export default DishDetails;
