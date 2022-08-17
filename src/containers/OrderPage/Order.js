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
const remoteController = //상단 바로가기 리모콘, dish에서 사용할 시 컴포넌트 폴더로 옮길 것
  (
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
  const [scrollY, setScrollY] = useState(0); // window 의 pageYOffset값을 저장
  const [scrollOver, setScrollOver] = useState(false); //스크롤이 550을 넘겼는지에 대한 정보
  function handleScroll() {
    console.log(scrollY + "," + scrollOver);
    if (scrollY > 550) {
      //바로가기 리모콘 우단으로 옮김
      //헤더+carousel 대충 높이, jsx 내 px,vh calc계산 모르겠음
      setScrollY(window.pageYOffset);
      setScrollOver(true);
    } else {
      //바로가기 리모콘 상단 고정
      setScrollY(window.pageYOffset);
      setScrollOver(false);
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
            {scrollOver && ( //550이상 scrollOver:true
              <div className={[styles.fixedBox, styles.rightside].join(" ")}>
                {remoteController}
              </div>
            )}
            {!scrollOver && ( //550px이내 scrollOver:false
              <div className={[styles.fixedBox, styles.upside].join(" ")}>
                {remoteController}
              </div>
            )}
          </MediaQuery>

          {/* 태블리 + 모바일ver */}
          <MediaQuery maxWidth={992}>
            <div className={[styles.fixedBox, styles.upside].join(" ")}>
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
                  {/*hover시 팝오버가 나타남,콘솔 경고 확인할 것*/}
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
