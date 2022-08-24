import CartService from "lib/api/CartService";
import React, { useState, useEffect } from "react";
import './Style.scss';

 //주문 할 음식만 체크하여 주문 가능하게 하기.
 //체크 될 때마다 setDishOrderList에 추가. 형식은 { "dishNumber": 0, "orderQuantity": 0 }.
 //주문버튼 누를 시, order 추가 및 cart 삭제 필요.
  //(만약 cart에서만 주문 가능하게 하기로 결정되면, 백에서 삭제 추가할 것이므로 프론트에서 구현 필요x)

const Cart = () => {
  const [cartList, setCartList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dishOrderList, setDishOrderList] = useState([]);

  useEffect(() => {
    CartService.findCartByUser()
      .then((response) => {
        console.log(response.data.data);
        setCartList(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return (
  <div>
    <p>장바구니 페이지</p>
  </div>
  );
};

export default Cart;