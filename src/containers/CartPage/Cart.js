import CartService from "lib/api/CartService";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-modal';

import Header from "components/header/Header";
import Chat from "../../components/ChatBot/Chat";
import Footer from "components/footer/Footer";
import ImgBanner from "../../components/Banner/ImgBanner";
import modalstyles from "./Modal.module.scss";
import styles from "./Cart.module.scss";
import OrderService from "lib/api/OrderService";

const image1 = "https://picsum.photos/1200/600";
const dishImageRan = "https://picsum.photos/170/170";

 //주문 할 음식만 체크하여 주문 가능하게 하기.
 //체크 될 때마다 setDishOrderList에 추가. 형식은 { "dishNumber": 0, "orderQuantity": 0 }.
 //주문버튼 누를 시, order 추가 및 cart 삭제 필요.
  //(만약 cart에서만 주문 가능하게 하기로 결정되면, 백에서 삭제 추가할 것이므로 프론트에서 구현 필요x)
const Cart = () => {  
  const [cartList, setCartList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dishQuantity, setDishQuantity] = useState([]); // 수량 변화를 담는 데이터
  const [orderPrice, setOrderPrice] = useState(0); // 총 주문 금액
  const [dishOrderList, setDishOrderList] = useState([]); //Order(주문)을 위한 데이터
  const [checkedItems, setCheckedItems] = useState([]); //checkbox 상태 체크를 위한 데이터
  useEffect(() => {
    CartService.findCartByUser()
      .then((response) => {
        setCartList(response.data.data)
        if(response.data.data.length !== 0){
          let quantityData = []
          let checkboxStatus = []
          let orderDate = []
          let totalPrice = 0
          response.data.data.map( cart => (
            quantityData.push( { 
              cartNumber: cart.cartNumber, 
              quantity: cart.cartQuantity,
              cartPrice: cart.cartQuantity*cart.dishPrice
            }),
            checkboxStatus.push( {cartNumber: cart.cartNumber, checked: true} ),
            orderDate.push({dishNumber: cart.dishNumber, orderQuantity: cart.cartQuantity}),
            totalPrice += cart.cartQuantity*cart.dishPrice
          ))
          if(response.data.data.length === quantityData.length){
            setDishQuantity(quantityData)
            setCheckedItems(checkboxStatus)
            setDishOrderList(orderDate)
            setOrderPrice(totalPrice)
            setIsLoading(false)
        }
        } else {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  function checkCheckboxStatus(cartNumber){
    let status = true
    checkedItems.map( checkedItem =>
      checkedItem.cartNumber === cartNumber ? checkedItem.checked !== true ? status = false : null : null
    )
    return status
  }
  function onChangeCheck(cartNumber, dishNumber, cartQuantity, event) {
    console.log(event)
    setCheckedItems(
      checkedItems.map( checkedItem =>
        checkedItem.cartNumber === cartNumber ? {...checkedItem, checked: !checkedItem.checked} : checkedItem
    ))
    if(event.target.checked){
      setDishOrderList(dishOrderList => [...dishOrderList, {dishNumber: dishNumber, orderQuantity: cartQuantity}])
    } else {
      const newOrderList = dishOrderList.filter((data) => data.dishNumber !== dishNumber)
      setDishOrderList(newOrderList)
    }
  }
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false); // 주문 성공시 모달창
  function handleOrderClick() {
    OrderService.addCarttoOrder(dishOrderList)
    .then((response) => {
      setSuccessModalIsOpen(true)
    })
    .catch((error) => {
      console.log(error.response);
    });
  }
  
  function cartQuantityPriceCheck(cartNumber){
    let quantity = 1;
    let cartPrice = 0;
    dishQuantity.map( quantityData =>
      quantityData.cartNumber === cartNumber ? 
      (quantity = quantityData.quantity, cartPrice = quantityData.cartPrice)
      : null
    )
    return {quantity, cartPrice}
  }
  function handleChangeQuantity(cartNumber, dishNumber, cartQuantity, dishPrice, isPlus) {
    //수량 바꿔서 cartData에 저장
    CartService.updateCartQuantitiy(cartNumber, cartQuantity)
      .then((response) => {
        setDishQuantity(
          dishQuantity.map( data =>
            data.cartNumber === cartNumber ? 
            {...data, quantity: cartQuantity, cartPrice: cartQuantity*dishPrice}
            : data
        ))
        setDishOrderList(
          dishOrderList.map( data =>
            data.dishNumber === dishNumber ? 
            {...data, orderQuantity: cartQuantity}
            : data
          )
        )
        if(isPlus)
          setOrderPrice((current) => (current+dishPrice))
        else
          setOrderPrice((current) => (current-dishPrice))
      })
      .catch((error) => {
        console.log(error.response);
      });

  }
  function CartDish({cartNumber, dishNumber, dishImage, dishName, dishPrice, cartQuantity, cartPrice}) {
    let isChecked = checkCheckboxStatus(cartNumber)
    return(
      <div className={styles.cartDish} id={styles.checkbox}>
        <div className={styles.checkbox}><input type="checkbox" checked={isChecked} onChange={(event) => onChangeCheck(cartNumber, dishNumber, cartQuantity, event)}></input></div>
        {/* <div className={styles.cartImg}><img src={dishImage}></img></div> */}
        <div className={styles.cartImg}><img src={dishImageRan}></img></div>
        <div className={styles.cartDetail}>
          <div className={styles.dishName}>{dishName}</div>
          <div className={styles.cartQuantity}>
            <button className={`${styles.countbutton} ${cartQuantity === 1 ? styles.disableclick : null}`} id="minusBtn" onClick={() => handleChangeQuantity(cartNumber, dishNumber, (cartQuantity-1), dishPrice, false)} disabled={cartQuantity === 1 ? true : false}></button>
            <span>&nbsp;{cartQuantity}&nbsp;</span>
            <button className={`${styles.countbutton} ${styles.plus}`} onClick={() => handleChangeQuantity(cartNumber, dishNumber, (cartQuantity+1), dishPrice, true)}></button>
          </div>
          <div className={styles.cartDishPrice}>{cartPrice.toLocaleString('ko-KR')} 원</div>
        </div>
      </div>
    )
  }

  return (
    <div id="CartPage">
      <Header />
      <main className={styles.container}>
        <ImgBanner
          img={image1}
          pageTitle="Cart"
          pageDetails="Lorem Ipsum is simply dummy text of the printing and type setting
              industry."
        />
        <div className={styles.mainContents}>
          <div className={styles.cartContents}>
            { isLoading ? "Loading..." :
              cartList.length == 0 ? <div className={styles.cartNone}>장바구니가 비어있습니다.</div>
              : cartList.map( cartdish => (
                <CartDish key={cartdish.cartNumber}
                  cartNumber={cartdish.cartNumber}
                  dishNumber={cartdish.dishNumber}
                  dishImage={cartdish.dishImage}
                  dishName={cartdish.dishName}
                  dishPrice={cartdish.dishPrice}
                  cartQuantity={cartQuantityPriceCheck(cartdish.cartNumber).quantity}
                  cartPrice={cartQuantityPriceCheck(cartdish.cartNumber).cartPrice}
                />
              ))
            }
          </div>
          <div className={styles.orderContents}>
            <div><span id={styles.total}>Total</span> <span id={styles.totalPrice}>{orderPrice.toLocaleString('ko-KR')} 원</span></div>
            <div><button id={styles.orderButton} onClick={handleOrderClick}>주문하기</button></div>
          </div>
        </div>
      </main>
      <Chat />
      <Footer />
      <Modal
        isOpen={successModalIsOpen} 
        onRequestClose={() => setSuccessModalIsOpen(false)}
        overlayClassName={modalstyles.overlay}
        className={`${modalstyles.content} ${modalstyles.contentSuccess}`}
      >
        <h3>주문이 완료되었습니다.<br/>결제 과정은 미구현되었습니다.</h3>
        <div className={modalstyles.toGoBtns}>
          <button className={modalstyles.submit}><Link to="/UserInfo/ordered">주문 확인하기</Link></button>
          <button className={modalstyles.submit} onClick={()=> (setSuccessModalIsOpen(false), window.location.reload())}>계속 쇼핑하기</button>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;