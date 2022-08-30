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
import CartService from "lib/api/CartService";

const image1 = "https://picsum.photos/1200/600";

function onClicktoModal(dishNumber, dishName, dishPhoto, dishPrice) {
  //React Modal 띄워서 dish 간략한 설명과 수량 선택 후 장바구니(또는 구매하기) 추가)
};

function onClickAddCart(dishNumber, cartQuantity){
  CartService.addCartDish(dishNumber, cartQuantity)
    .then((response) => {
      console.log(response.data.data);
      //Modal 창 내용을 '장바구니에 추가 되었습니다. 이동하시겠습니까? 예/계속 쇼핑하기' 바꾸던가 새 모달창 띄우기
    })
    .catch((error) => {
      console.log(error.response);
    });
}

//바로 구매하기 추가하기로 결정나면, Order 추가 함수 작성 필요.

const onClikcPutInCart = () => {};
const onClickOrderNow = () => {};
function DishContent(count, data){
  var popover = (
    <Popover id="popover-basic">
      <Popover.Body>{data.data[count].dishDescription}</Popover.Body>
    </Popover>
  );
  return(
    <div className={styles.dish}>
          <div className={styles.dishImg}>
            <img
              href="#"
              // src={data.data[count].dishPhoto}
              src="https://picsum.photos/350/350"
              alt={data.data[count].dishName}
            />
            <button type="submit" onClick={() => onClicktoModal(data.data[count].dishNumber, 
              data.data[count].dishName, data.data[count].dishPhoto, data.data[count].dishPrice)}>
              장바구니
            </button>
          </div>
          <div className={styles.dishDetails}>
            <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="bottom"
              overlay={popover}
            >
              {/*hover시 팝오버가 나타남,콘솔 경고 확인할 것*/}
              <div>
                <h4>{data.data[count].dishName}</h4>
                <p>{data.data[count].dishDescription}</p>
              </div>
            </OverlayTrigger>
            <i>{data.data[count].dishPrice}원</i>
            <span className={styles.btnClub}>
              <button type="submit" onClick={onClickOrderNow}>
                바로주문
              </button>
              <button
                type="submit"
                onClick={onClikcPutInCart}
                className={styles.cart}
              >
                장바구니
              </button>
            </span>
          </div>
        </div>
  )
}
function OrderContent(data) {
  //console.log(data.data.length);
  const entreeList = [];
  const appetizerList = [];
  const dessertList = [];
  for (let i = 0; i < data.data.length; i++) {
    if (data.data[i].dishCategory === "전식") {
      appetizerList.push(DishContent(i, data));
    } else if (data.data[i].dishCategory === "본식") {
      entreeList.push(DishContent(i, data));
    } else if (data.data[i].dishCategory === "후식") {
      dessertList.push(DishContent(i, data));
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
    //console.log(scrollY + "," + scrollOver);
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
          <div>{isLoading ? "Loading..." : <OrderContent key="OrderContent" data={dish} />}</div>
        </div>
      </main>
      <CartShortcut />
      <Footer />
    </div>
  );
};

export default Order;
