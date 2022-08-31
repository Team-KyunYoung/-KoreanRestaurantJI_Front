import CartService from "lib/api/CartService";
import React, { useState, useEffect } from "react";

import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import ImgBanner from "../../components/Banner/ImgBanner";
import styles from "./Cart.module.scss";

const image1 = "https://picsum.photos/1200/600";
const dishImageRan = "https://picsum.photos/200/200";

 //주문 할 음식만 체크하여 주문 가능하게 하기.
 //체크 될 때마다 setDishOrderList에 추가. 형식은 { "dishNumber": 0, "orderQuantity": 0 }.
 //주문버튼 누를 시, order 추가 및 cart 삭제 필요.
  //(만약 cart에서만 주문 가능하게 하기로 결정되면, 백에서 삭제 추가할 것이므로 프론트에서 구현 필요x)
const Cart = () => {  
  const [cartList, setCartList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dishQuantity, setDishQuantity] = useState([]); // 수량 변화를 담는 데이터
  useEffect(() => {
    CartService.findCartByUser()
      .then((response) => {
        console.log(response.data.data);
        setCartList(response.data.data);
        if(response.data.data.length !== 0){
          let quantityData = []
          response.data.data.map( cart => (
            quantityData.push( { 
              cartNumber: cart.cartNumber, 
              quantity: cart.cartQuantity,
              cartPrice: cart.cartQuantity*cart.dishPrice
            })
          ))
          if(response.data.data.length === quantityData.length){
            setDishQuantity(quantityData)
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

  const [dishOrderList, setDishOrderList] = useState([]); //Order(주문)을 위한 데이터
  function onChangeCheck(dishNumber, cartQuantity, event) {
    if(event.target.checked){
      setDishOrderList(dishOrderList => [...dishOrderList, {"dishNumber": dishNumber, "orderQuantity": cartQuantity}])
    } else {
      //해당되는거 pop
      const newOrderList = dishOrderList.filter((data) => data.dishNumber !== dishNumber);
      setDishOrderList(newOrderList);
    }
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
  function handleChangeQuantity(cartNumber, cartQuantity, dishPrice) {
    //수량 바꿔서 cartData에 저장
    CartService.updateCartQuantitiy(cartNumber, cartQuantity)
      .then((response) => {
        setDishQuantity(
          dishQuantity.map( data =>
            data.cartNumber === cartNumber ? 
            ({...data, quantity: cartQuantity}, {...data, cartPrice: cartQuantity*dishPrice})
            : data
        ))
        console.log(cartList)
      })
      .catch((error) => {
        console.log(error.response);
      });

  }
  function CartDish({cartNumber, dishNumber, dishImage, dishName, dishPrice, cartQuantity, cartPrice}) {
    return(
      <div className={styles.cartDish} id={styles.checkbox}>
        <input type="checkbox" checked onChange={(e) => onChangeCheck(dishNumber, cartQuantity)}></input>
        {/* <div className={styles.cartImg}><img src={dishImage}></img></div> */}
        <div className={styles.cartImg}><img src={dishImageRan}></img></div>
        <div className={styles.cartDetail}>
          <div className={styles.dishName}>{dishName}</div>
          <div className={styles.cartQuantity}>
            <button className={`${styles.countbutton} ${cartQuantity === 1 ? styles.disableclick : null}`} id="minusBtn" onClick={() => handleChangeQuantity(cartNumber, cartQuantity-1, dishPrice)} disabled={cartQuantity === 1 ? true : false}></button>
            <span>&nbsp;{cartQuantity}&nbsp;</span>
            <button className={`${styles.countbutton} ${styles.plus}`} onClick={() => handleChangeQuantity(cartNumber, cartQuantity+1, dishPrice)}></button>
          </div>
          <div className={styles.cartDishPrice}>{cartPrice}</div>
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
          { isLoading ? "Loading..." :
            cartList.length == 0 ? <div className={styles.cartNone}>장바구니가 비어있습니다.</div>
            : cartList.map( cartdish => (
            <CartDish
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
      </main>
      <Footer />
    </div>
  );
};

export default Cart;