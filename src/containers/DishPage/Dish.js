import React from "react";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import ChatShortcut from "components/ShortCut/ChatShortcut";
import ImgBanner from "../../components/Banner/ImgBanner";
import styles from "./Dish.module.scss";
import * as Authentication from "lib/api/Authentication";

const image1 =
  "https://images.unsplash.com/photo-1498092651296-641e88c3b057?auto=format&fit=crop&w=1778&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D";

const onClikcPutInCart = () => {};
const Dish = () => {
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
        <div>
          <section id="appetizer" className={styles.appetizer}>
            <header>
              <h1>Appetizer</h1>
            </header>
            <div className={styles.seperator}></div>
            <div className={styles.dish}>
              <div className={styles.dishImg}>
                <img
                  href="#"
                  src="https://images.unsplash.com/photo-1498092651296-641e88c3b057?auto=format&fit=crop&w=1778&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
                  alt=""
                />
                <button type="submit" onClick={onClikcPutInCart}>
                  장바구니
                </button>
              </div>
              <div className={styles.dishDetails}>
                <div>
                  <h4>Lorem Ipsum </h4>
                  <p>
                    is simply dummy text of the printing and typesetting
                    industry.
                  </p>
                </div>
                <i>46,000원</i>
              </div>
            </div>
            <div className={styles.dish}>
              <div className={styles.dishImg}>
                <img
                  href="#"
                  src="https://images.unsplash.com/photo-1498092651296-641e88c3b057?auto=format&fit=crop&w=1778&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
                  alt=""
                />
                <button type="submit" onClick={onClikcPutInCart}>
                  장바구니
                </button>
              </div>
              <div className={styles.dishDetails}>
                <div>
                  <h4>Lorem Ipsum </h4>
                  <p>
                    is simply dummy text of the printing and typesetting
                    industry.
                  </p>
                  <p>
                    is simply dummy text of the printing and typesetting
                    industry. is simply dummy text of the printing and
                    typesetting industry. is simply dummy text of the printing
                    and typesetting industry. is simply is simply dummy text of
                    the printing and typesetting industry. is
                  </p>
                </div>
                <i>46,000원</i>
              </div>
            </div>
          </section>
          <section id="dessert" className={styles.dessert}>
            <header>
              <h1>Dessert</h1>
            </header>
            <div className={styles.seperator}></div>
            <div className={styles.dish}>
              <div className={styles.dishImg}>
                <img
                  href="#"
                  src="https://images.unsplash.com/photo-1498092651296-641e88c3b057?auto=format&fit=crop&w=1778&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
                  alt=""
                />
                <button type="submit" onClick={onClikcPutInCart}>
                  장바구니
                </button>
              </div>
              <div className={styles.dishDetails}>
                <div>
                  <h4>Lorem Ipsum </h4>
                  <p>
                    is simply dummy text of the printing and typesetting
                    industry.
                  </p>
                </div>
                <i>46,000원</i>
              </div>
            </div>
          </section>
        </div>
      </main>
      <ChatShortcut />
      <Footer />
    </div>
  );
};

export default Dish;
