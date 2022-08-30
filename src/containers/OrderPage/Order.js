import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import MediaQuery from "react-responsive";
import Modal from 'react-modal';
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import CartShortcut from "../../components/ShortCut/CartShortcut";
import ImgBanner from "../../components/Banner/ImgBanner";
import modalstyles from "./Modal.module.scss";
import styles from "./Order.module.scss";
import DishService from "lib/api/DishService";
import CartService from "lib/api/CartService";
import OrderService from "lib/api/OrderService";

const image1 = "https://picsum.photos/1200/600";

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
              {/* <button type="submit" onClick={() => onClickPutInCarttoModal(data.data[count].dishNumber, 
                data.data[count].dishName, data.data[count].dishPhoto, data.data[count].dishPrice)}>
                장바구니
              </button> */}
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
                <button type="submit" onClick={() => {setModalIsOpen(true); setOrderDish(data.data[count])}}>
                  바로주문
                </button>
                <button type="submit" className={styles.cart} onClick={() => {setModalIsOpen(true); setOrderDish(data.data[count])}}>
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
  const [modalIsOpen, setModalIsOpen] = useState(false); // 주문 모달창 열고 닫는 데이타
  const [orderDish, setOrderDish] = useState([]); // 주문or장바구니 버튼 클릭 시 모달창에 띄워질 음식 데이터
  const [orderQuantity, setOrderQuantity] = useState(1); // 주문 수량
  const [disable, setDisable] = useState(true); // 수량이 1개 이하로 선택되지 못하게 제어
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false); // 주문 성공시 모달창
  const [isCartIn, setIsCartIn] = useState(true); // 카트에 넣었다면 true, 바로주문이라면 false

  useEffect(() => {
    setOrderQuantity(1)
  }, [modalIsOpen]);

  function handleChangeQuantity(count) {
    if(orderQuantity+count === 1){
      setDisable(true)
    } else {
      setDisable(false)
    }
    console.log(count)
    setOrderQuantity((current) => current + count)
  }
  function onClickAddCart(dishNumber, orderQuantity){
    CartService.addCartDish(dishNumber, orderQuantity)
      .then((response) => {
        console.log(response.data.data);
        setModalIsOpen(false);
        setIsCartIn(true)
        setSuccessModalIsOpen(true);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  function onClickAddOrder(dishNumber, orderQuantity){
    let dishOrderList = [{ "dishNumber": dishNumber, "orderQuantity": orderQuantity }]
    OrderService.addOrder(dishOrderList)
      .then((response) => {
        console.log(response.data.data);
        setModalIsOpen(false);
        setIsCartIn(false);
        setSuccessModalIsOpen(true);
      })
      .catch((error) => {
        console.log(error.response);
      });
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
      <Modal
        isOpen={modalIsOpen} 
        onRequestClose={() => setModalIsOpen(false)}
        overlayClassName={modalstyles.overlay}
        className={modalstyles.content}
      >
        <h3>주문 상세</h3>
        <div className={modalstyles.dish}>
          {/* <div className={modalstyles.img}><img src={orderDish.dishPhoto}></img></div> */}
          <div className={modalstyles.img}><img src="https://picsum.photos/160/160"></img></div>
          <div className={modalstyles.dishdetail}>
            <div className={modalstyles.title}>{orderDish.dishName}</div>
            <div className={modalstyles.quantitity}>
              <button className={`${modalstyles.countbutton} ${disable ? modalstyles.disableclick : null}`} id="minusBtn" onClick={() => handleChangeQuantity(-1)} disabled={disable}></button>
              <span>&nbsp;{orderQuantity}&nbsp;</span>
              <button className={`${modalstyles.countbutton} ${modalstyles.plus}`} onClick={() => handleChangeQuantity(1)}></button>
            </div>
            <div className={modalstyles.price}>{(orderDish.dishPrice*orderQuantity).toLocaleString('ko-KR')}원</div>
          </div>
        </div>
        <div className={modalstyles.submitBtns}>
        <button className={modalstyles.submit} onClick={()=> setModalIsOpen(false)}>취소</button>
          <button className={modalstyles.submit} onClick={() => onClickAddOrder(orderDish.dishNumber, orderQuantity)}>구매하기</button>
          <button className={modalstyles.submit} onClick={() => onClickAddCart(orderDish.dishNumber, orderQuantity)}>장바구니</button>
        </div>
      </Modal>
      <Modal
        isOpen={successModalIsOpen} 
        onRequestClose={() => setSuccessModalIsOpen(false)}
        overlayClassName={modalstyles.overlay}
        className={`${modalstyles.content} ${modalstyles.contentSuccess}`}
      >
        {!isCartIn && <h3>주문 완료</h3>}
        {isCartIn && <h3>장바구니에 담겼습니다</h3>}
        <div className={modalstyles.toGoBtns}>
          {!isCartIn && <button className={modalstyles.submit}><Link to="/UserInfo/ordered">구매 확인하기</Link></button>}
          {isCartIn && <button className={modalstyles.submit}><Link to="/Cart">장바구니 확인하기</Link></button>}
          <button className={modalstyles.submit} onClick={()=> setSuccessModalIsOpen(false)}>계속 쇼핑하기</button>
        </div>
      </Modal>
      <CartShortcut />
      <Footer />
    </div>
  );
};

export default Order;
