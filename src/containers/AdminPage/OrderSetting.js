import OrderService from "lib/api/OrderService";
import React, { useEffect, useState } from "react";

import styles from "./Admin.module.scss";
import MenuBar from "./MenuBar";

const OrderSettingPage = () => {
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    OrderService.findOrderByStatus()
      .then((response) => {
        setOrder(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleUpdateStatus = (orderNumber, e) => {
    setOrder(
      order.map((orderData) =>
        orderData.orderNumber === orderNumber
          ? { ...orderData, orderStatus: e.target.value }
          : orderData
      )
    );
  };
  function updateOrderStatus(orderNumber, updateStatus) {
    if (
      window.confirm(
        "해당 주문의 상태정보를 '" + updateStatus + "'로 수정하시겠습니까?"
      )
    ) {
      OrderService.updateOrderStatus(orderNumber, updateStatus)
        .then(() => {
          alert("해당 주문의 상태정보가 수정되었습니다.");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          alert("수정 실패. 콘솔창을 확인해주세요.");
        });
    }
  }
  function TodayOrder({
    orderNumber,
    createdDate,
    orderDishList,
    orderPrice,
    orderStatus,
  }) {
    return (
      <div className={styles.order}>
        <span>{orderNumber}</span>
        <span>{createdDate}</span>
        <span>{orderPrice.toLocaleString("ko-KR")}원</span>
        <label>
          <select
            name="order"
            onChange={(e) => handleUpdateStatus(orderNumber, e)}
            value={orderStatus}
          >
            <option key="주문대기" value="주문대기">
              주문대기
            </option>
            <option key="준비중" value="준비중">
              준비중
            </option>
            <option key="수령대기" value="수령대기">
              수령대기
            </option>
            <option key="수령완료" value="수령완료">
              수령완료
            </option>
            <option key="주문취소" value="주문취소">
              주문취소
            </option>
          </select>
          <button
            className={styles.statusUpdateBtn}
            onClick={() => updateOrderStatus(orderNumber, orderStatus)}
          >
            저장
          </button>
        </label>
      </div>
    );
  }
  return (
    <div className="OrderSettingPage">
      <main>
        <MenuBar />
        <div className={styles.content}>
          <div className={styles.contents}>
            <div className={styles.title}>
              <h3>주문 설정 페이지</h3>
            </div>
            <div className={styles.settingContents}>
              <div className={styles.findAll}>
                <h4>현재 주문 목록</h4>
                <hr />
                <div className={styles.orderList}>
                  {isLoading ? null : order.length === 0 ? (
                    <div>주문 내역이 없습니다.</div>
                  ) : (
                    order.map((orderDate) => (
                      <TodayOrder
                        key={orderDate.orderNumber}
                        orderNumber={orderDate.orderNumber}
                        createdDate={orderDate.createdDate}
                        orderDishList={orderDate.orderDishList}
                        orderPrice={orderDate.orderPrice}
                        orderStatus={orderDate.orderStatus}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderSettingPage;
