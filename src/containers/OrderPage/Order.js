import { useState, useEffect } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import MediaQuery from "react-responsive";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import CartShortcut from "../../components/ShortCut/CartShortcut";
import ImgBanner from "../../components/Banner/ImgBanner";
import styles from "./Order.module.scss";
import DishService from "lib/api/DishService";

const image1 = "https://picsum.photos/1200/600";
const onClikcPutInCart = () => {};
function OrderContent(data) {
  console.log(data.data.length);
  const entreeList = [];
  const appetizerList = [];
  const dessertList = [];

  for (let i = 1; i < data.data.length; i++) {
    var popover = (
      <Popover id="popover-basic">
        <Popover.Body>{data.data[i].dishDescription}</Popover.Body>
      </Popover>
    );
    if (data.data[i].dishCategory === "전식") {
      appetizerList.push(
        <div className={styles.dish}>
          <div className={styles.dishImg}>
            <img
              href="#"
              // src={data.data[i].dishPhoto}
              src="https://picsum.photos/350/350"
              alt={data.data[i].dishName}
            />
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
                <h4>{data.data[i].dishName}</h4>
                <p>{data.data[i].dishDescription}</p>
              </div>
            </OverlayTrigger>
            <i>{data.data[i].dishPrice}원</i>
          </div>
        </div>
      );
    } else if (data.data[i].dishCategory === "본식") {
      entreeList.push(
        <div className={styles.dish}>
          <div className={styles.dishImg}>
            <img
              href="#"
              // src={data.data[i].dishPhoto}
              src="https://picsum.photos/350/350"
              alt={data.data[i].dishName}
            />
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
                <h4>{data.data[i].dishName}</h4>
                <p>{data.data[i].dishDescription}</p>
              </div>
            </OverlayTrigger>
            <i>{data.data[i].dishPrice}원</i>
          </div>
        </div>
      );
    } else if (data.data[i].dishCategory === "후식") {
      dessertList.push(
        <div className={styles.dish}>
          <div className={styles.dishImg}>
            <img
              href="#"
              // src={data.data[i].dishPhoto}
              src="https://picsum.photos/350/350"
              alt={data.data[i].dishName}
            />
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
                <h4>{data.data[i].dishName}</h4>
                <p>{data.data[i].dishDescription}</p>
              </div>
            </OverlayTrigger>
            <i>{data.data[i].dishPrice}원</i>
          </div>
        </div>
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
      <section id="entree" className={styles.dessert}>
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
}
const remoteController = //상단 바로가기 리모콘, dish에서 사용할 시 컴포넌트 폴더로 옮길 것
  (
    <ul>
      <li>
        <a href="#appetizer">Appetizer</a>
      </li>
      <li>
        <a href="#entree">Entree</a>
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
      //  window 에서 스크롤을 감시하도록 하는 함수
      window.addEventListener("scroll", handleScroll);
    }
    scrollListener(); // window 에서 스크롤을 감시
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }; //  window 에서 스크롤을 감시를 종료
  });
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
          <div>{isLoading ? "Loading..." : <OrderContent data={dish} />}</div>
        </div>
      </main>
      <CartShortcut />
      <Footer />
    </div>
  );
};

export default Order;
