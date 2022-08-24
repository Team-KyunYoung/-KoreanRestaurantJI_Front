import OrderService from "lib/api/OrderService";
import React from "react";
import { useState, useEffect } from "react";

const Ordered = () => {
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    OrderService.findOrderByUser()
      .then((response) => {
        console.log(response.data.data);
        setOrderList(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  //주문 내역 삭제버튼
  //orderStatus가 '수령 대기'일 경우 수령 완료 버튼 보이게? 누를 시 update.
  //주문 내역을 누르면 상세 내용(주문한 음식 리스트) < (모달창 또는 새 페이지 팝업)
  //페이징 필요?
  //날짜별 조회(1개월/3개월/1년) 추가 필요?

  return (
    <>
      <h2>What I Ordered</h2>
    </>
  );
};

export default Ordered;
