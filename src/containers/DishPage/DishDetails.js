import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./DishDetails.module.scss";
import Header from "components/header/Header";
import Chat from "components/ChatBot/Chat";
import Footer from "components/footer/Footer";
import DishService from "lib/api/DishService";
import CartService from "lib/api/CartService";
import Authentication from "lib/api/Authentication";

const DishDetails = () => {
  let navigate = useNavigate();

  const dish = useParams();
  const [dishDescription, setDishDescription] = useState();
  const [dishImage, setDishImage] = useState();
  const [dishPrice, setDishPrice] = useState();
  const [dishCategory, setDishCategory] = useState();
  const [dishNutritionFacts, setdishNutritionFacts] = useState([]);
  const [mount, setMount] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    DishService.findDish(dish.dishNumber).then((response) => {
      setDishDescription(response.data.data.dishDescription);
      setDishImage(response.data.data.dishPhoto);
      setDishPrice(response.data.data.dishPrice);
      setDishCategory(response.data.data.dishCategory);
      setdishNutritionFacts(response.data.data.dishNutritionFacts);
      setMount(true);
      setTimeout(() => setIsVisible(true), 1000);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onClickAddCart(dishNumber) {
    if (Authentication.isUserLoggedIn()) {
      CartService.addCartDish(dishNumber, 1)
        .then(() => {
          if (window.confirm("장바구니에 추가되었습니다. 이동하시겠습니까?")) {
            navigate("/cart");
          }
        })
        .catch((error) => {
          console.log(error.response);
          alert("장바구니에 추가되지 못하였습니다. 잠시후 다시 시도해 주세요.");
        });
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }

  return (
    <div id={styles.DishDetailPage}>
      <Header />
      <main className={styles.container}>
        <div className={styles.dishCategory}>
          <h2>{dishCategory}</h2>
        </div>
        {mount ? (
          <div
            className={styles.dishDetails}
            style={{
              backgroundImage: `url(${dishImage})`,
              backgroundSize: "100% 100%",
            }}
          >
            <div
              className={`${styles.dishDescriptionBox} ${
                isVisible ? styles.slideInRight : null
              }`}
            >
              <div className={styles.dishDescription}>
                <p className={styles.dishName}>{dish.dishName}</p>
                <p className={styles.description}>{dishDescription}</p>
                <div className={styles.dishNutritionFacts}>
                  <div className={styles.header}>
                    <p className={styles.title}>영양 성분표</p>
                    <p className={styles.servingSize}>
                      총 용량: {dishNutritionFacts.dishServingSize}g
                    </p>
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
                      <li
                        className={styles.choles_FAT}
                        style={{ display: "none" }}
                      >
                        <dl>
                          <dt>콜레스테롤 (g)</dt>
                          <dd>{dishNutritionFacts.dishCholesterol}</dd>
                        </dl>
                      </li>
                      <li
                        className={styles.trans_FAT}
                        style={{ display: "none" }}
                      >
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
                <p className={styles.dishPrice}>
                  {dishPrice.toLocaleString("ko-KR")}원
                </p>
              </div>
              <div className={styles.toBtn}>
                <ul>
                  <Link to="/SelectRoom">
                    <li className={styles.btnReservation}>식당 예약하기</li>
                  </Link>
                  <li className={styles.btnCart}>
                    <button
                      className={styles.btn}
                      onClick={() => onClickAddCart(dish.dishNumber)}
                    >
                      장바구니에 담기
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : null}
      </main>
      <Chat />
      <Footer />
    </div>
  );
};

export default DishDetails;
