import { useState, useEffect } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import MediaQuery from "react-responsive";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import CartShortcut from "../../components/ShortCut/CartShortcut";
import ImgBanner from "../../components/Banner/ImgBanner";
import styles from "./Order.module.scss";
import * as Authentication from "lib/api/Authentication";

const image1 = "https://picsum.photos/1200/600";
const onClikcPutInCart = () => {};
const popover = (
  <Popover id="popover-basic">
    <Popover.Body>
      is simply dummy text of the printing and typesetting industry. Lorem Ipsum
      is simply dummy text of the printing and typesetting industry.
    </Popover.Body>
  </Popover>
);
const remoteController = (
  <ul>
    <li>
      <a href="#appetizer">Appetizer</a>
    </li>
    <li>
      <a href="#main">Main</a>
    </li>
    <li>
      <a href="#dessert">Dessert</a>
    </li>
  </ul>
);
const Order = () => {
  const [ScrollY, setScrollY] = useState(0); // window 의 pageYOffset값을 저장
  const [ScrollActive, setScrollActive] = useState(false);
  function handleScroll() {
    if (ScrollY > 550) {
      //헤더+carousel 대충 높이, 리액트 내 calc계산 모르겠음
      setScrollY(window.pageYOffset);
      setScrollActive(true);
    } else {
      setScrollY(window.pageYOffset);
      setScrollActive(false);
    }
  }
  useEffect(() => {
    function scrollListener() {
      window.addEventListener("scroll", handleScroll);
    } //  window 에서 스크롤을 감시 시작
    scrollListener(); // window 에서 스크롤을 감시
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }; //  window 에서 스크롤을 감시를 종료
  });
  return (
    <div id="CoursePage">
      <Header />
      <main className={styles.container}>
        <ImgBanner
          img={image1}
          pageTitle="Order"
          pageDetails="Lorem Ipsum is simply dummy text of the printing and typesetting
              industry."
        />
        <div>
          {/* 모니터ver */}
          <MediaQuery minWidth={993}>
            {ScrollActive && (
              <div className={[styles.fixedBox, styles.nonFixed].join(" ")}>
                {remoteController}
              </div>
            )}
            {!ScrollActive && ( //300px이내
              <div className={[styles.fixedBox, styles.fixed].join(" ")}>
                {remoteController}
              </div>
            )}
          </MediaQuery>

          {/* 태블리 + 모바일ver */}
          <MediaQuery maxWidth={992}>
            <div className={[styles.fixedBox, styles.fixed].join(" ")}>
              {remoteController}
            </div>
          </MediaQuery>
          <section id="appetizer">
            <header>
              <h1>Appetizer</h1>
            </header>
            <div className={styles.seperator}></div>
            <div className={styles.dish}>
              <div className={styles.dishImg}>
                <img href="#" src="https://picsum.photos/350/350" alt="" />
                <button type="submit" onClick={onClikcPutInCart}>
                  장바구니
                </button>
              </div>
              <div className={styles.dishDetails}>
                <OverlayTrigger
                  trigger="hover"
                  placement="bottom"
                  overlay={popover}
                >
                  <div>
                    <h4>Lorem Ipsum </h4>
                    <p>
                      is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum is simply dummy text of the printing
                      and typesetting industry. Lorem Ipsum is simply dummy text
                      of the printing and typesetting industry.
                    </p>
                  </div>
                </OverlayTrigger>
                <i>46,000원</i>
              </div>
            </div>
            <div className={styles.dish}>
              <div className={styles.dishImg}>
                <img href="#" src="https://picsum.photos/350/350" alt="" />
                <button type="submit" onClick={onClikcPutInCart}>
                  장바구니
                </button>
              </div>
              <div className={styles.dishDetails}>
                <OverlayTrigger
                  trigger="hover"
                  placement="bottom"
                  overlay={popover}
                >
                  <div>
                    <h4>Lorem Ipsum </h4>
                    <p>
                      is simply dummy text of the printing and typesetting
                      industry.
                    </p>
                  </div>
                </OverlayTrigger>
                <i>46,000원</i>
              </div>
            </div>
          </section>
          <section id="dessert">
            <header>
              <h1>Dessert</h1>
            </header>
            <div className={styles.seperator}></div>
            <div className={styles.dish}>
              <div className={styles.dishImg}>
                <img href="#" src="https://picsum.photos/350/350" alt="" />
                <button type="submit" onClick={onClikcPutInCart}>
                  장바구니
                </button>
              </div>
              <div className={styles.dishDetails}>
                <OverlayTrigger
                  trigger="hover"
                  placement="bottom"
                  overlay={popover}
                >
                  <div>
                    <h4>Lorem Ipsum </h4>
                    <p>
                      is simply dummy text of the printing and typesetting
                      industry.
                    </p>
                  </div>
                </OverlayTrigger>
                <i>46,000원</i>
              </div>
            </div>
          </section>
        </div>
      </main>
      <CartShortcut />
      <Footer />
    </div>
  );
};

export default Order;
