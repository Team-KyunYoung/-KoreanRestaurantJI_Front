import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import ChatShortcut from "components/ShortCut/ChatShortcut";
import ImgBanner from "../../components/Banner/ImgBanner";
import styles from "./Dish.module.scss";
import DishService from "lib/api/DishService";

const image1 =
  "https://images.unsplash.com/photo-1498092651296-641e88c3b057?auto=format&fit=crop&w=1778&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D";

const onClikcPutInCart = () => {};
function DishContent(data) {
  console.log(data.data.length);
  const entreeList = [];
  const appetizerList = [];
  const dessertList = [];

  for (let i = 1; i < data.data.length; i++) {
    if (data.data[i].dishCategory === "전식") {
      appetizerList.push(
        <Link
          to={"./" + data.data[i].dishNumber + "/" + data.data[i].dishName}
          key={i}
        >
          <div className={styles.dish}>
            <div className={styles.dishImg}>
              <img
                href="#"
                src={data.data[i].dishPhoto}
                alt={data.data[i].dishName}
              />
              <button type="submit" onClick={onClikcPutInCart}>
                장바구니
              </button>
            </div>
            <div className={styles.dishDescription}>
              <div>
                <h4>{data.data[i].dishName}</h4>
                <p>{data.data[i].dishDescription}</p>
              </div>
              <i>{data.data[i].dishPrice}원</i>
            </div>
          </div>
        </Link>
      );
    } else if (data.data[i].dishCategory === "본식") {
      entreeList.push(
        <Link to={"./" + data.data[i].dishName} key={i}>
          <div className={styles.dish}>
            <div className={styles.dishImg}>
              <img
                href="#"
                src={data.data[i].dishPhoto}
                alt={data.data[i].dishName}
              />
              <button type="submit" onClick={onClikcPutInCart}>
                장바구니
              </button>
            </div>
            <div className={styles.dishDescription}>
              <div>
                <h4>{data.data[i].dishName}</h4>
                <p>{data.data[i].dishDescription}</p>
              </div>
              <i>{data.data[i].dishPrice}원</i>
            </div>
          </div>
        </Link>
      );
    } else {
      dessertList.push(
        <Link to={"./" + data.data[i].dishName} key={i}>
          <div className={styles.dish}>
            <div className={styles.dishImg}>
              <img
                href="#"
                src={data.data[i].dishPhoto}
                alt={data.data[i].dishName}
              />
              <button type="submit" onClick={onClikcPutInCart}>
                장바구니
              </button>
            </div>
            <div className={styles.dishDescription}>
              <div>
                <h4>{data.data[i].dishName}</h4>
                <p>{data.data[i].dishDescription}</p>
              </div>
              <i>{data.data[i].dishPrice}원</i>
            </div>
          </div>
        </Link>
      );
    }
  }
  return (
    <>
      <section id="appetizer" className={styles.appetizer}>
        <header>
          <h1>Appetizer</h1>
        </header>
        <div className={styles.seperator}></div>
        {appetizerList}
      </section>
      <section id="entree" className={styles.entree}>
        <header>
          <h1>Entree</h1>
        </header>
        <div className={styles.seperator}></div>
        {entreeList}
      </section>
      <section id="dessert" className={styles.dessert}>
        <header>
          <h1>Dessert</h1>
        </header>
        <div className={styles.seperator}></div>
        {dessertList}
      </section>
    </>
  );
  // return (
  //   <Link to="/">
  //     <div className={styles.dish} key={data.data[3]}>
  //       <div className={styles.dishImg}>
  //         <img
  //           href="#"
  //           src="https://images.unsplash.com/photo-1498092651296-641e88c3b057?auto=format&fit=crop&w=1778&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
  //           alt=""
  //         />
  //         <button type="submit" onClick={onClikcPutInCart}>
  //           장바구니
  //         </button>
  //       </div>
  //       <div className={styles.dishDetails}>
  //         <div>
  //           <h4>{data.data[3].dishName}</h4>
  //           <p>{data.data[3].dishDescription}</p>
  //         </div>
  //         <i>{data.data[3].dishPrice}원</i>
  //       </div>
  //     </div>
  //   </Link>
  // );
}
const Dish = () => {
  const [dish, setDish] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    DishService.findAllDish().then((response) => {
      console.log(response);
      setDish(response.data.data);
      setIsLoading(false);
    });
  }, []);
  return (
    <div id="CoursePage">
      <Header />
      <main className={styles.container}>
        <ImgBanner
          img={image1}
          pageTitle="Dish"
          pageDetails="Lorem Ipsum is simply dummy text of the printing and typesetting
      industry."
        />
        <div>{isLoading ? "Loading..." : <DishContent data={dish} />}</div>
      </main>
      <ChatShortcut />
      <Footer />
    </div>
  );
};

export default Dish;
