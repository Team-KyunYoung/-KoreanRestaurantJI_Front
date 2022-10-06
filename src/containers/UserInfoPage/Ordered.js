import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./UserInfo.module.scss";

import Page from "../../components/Pagination/Pagination";

import OrderService from "lib/api/OrderService";
import UserService from "lib/api/UserService";

const image1 = "https://picsum.photos/800/600";

function OrderedInnerPage(props) {
  console.log(props.list);
  console.log(props);
  return (
    <ul className={styles.list}>
      {props.loading ? (
        "loading"
      ) : props.list.length === 0 ? (
        <div className={styles.noList}>
          <p>주문 내역 없음</p>
          <Link to={"./../../Order"}>주문하러 가기</Link>
        </div>
      ) : (
        props.list.map((obj, i) => (
          <>
            <li key={i}>
              {/* <img src={image1} alt="reservation list" /> */}
              {/* <h3>{obj.orderStatus}</h3> */}
              <div className={styles.listSpan}>
                <h3>"{obj.orderStatus}"</h3>
                <p>
                  <b>주문 정보 </b>
                  {obj.createdDate}
                </p>
                <p>
                  <b>총</b> {obj.orderPrice.toLocaleString('ko-KR')}
                  <b>원</b>
                </p>
                <ul>
                  {obj.orderDishList.map((dishObj, j) => (
                    <li key={"dish" + i + j}>
                      <Link
                        to={
                          "./../../Dish/" +
                          dishObj.dishNumber +
                          "/" +
                          dishObj.dishName
                        }
                      >
                        <span className={styles.imgContainer}>
                          <img src={image1} alt="reservation list" />
                        </span>
                        <span className={styles.dishList}>
                          <span>
                            <i>{dishObj.dishName}</i>
                          </span>
                          <span>
                            <b>수량</b> {dishObj.orderQuantity}개{" "}
                          </span>
                          <span>
                            <b>가격</b> {dishObj.orderDishPrice.toLocaleString('ko-KR')}원
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </>
        ))
      )}
    </ul>
  );
}
const Ordered = () => {
  //주문 내역 삭제버튼
  //orderStatus가 '수령 대기'일 경우 수령 완료 버튼 보이게? 누를 시 update.
  //날짜별 조회(1개월/3개월/1년) 추가 필요?
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(1);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  console.log(indexOfFirst, indexOfLast);
  const currentPosts = (posts) => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    console.log("현재 포스트는 : " + currentPosts);
    return currentPosts;
  };
  useEffect(() => {
    UserService.findUser(); //유저를 찾는 과정이 있어야 아래 findReservation 통신 가능
  }, []);
  useEffect(() => {
    OrderService.findOrderByUser()
      .then((response) => {
        console.log(response);
        setList(response.data.data);
        console.log(response.data);
      })
      .catch(() => {
        setLoading(true);
        console.log("error:예약 목록 불러오기");
      });
  }, []);

  return (
    <>
      <h2>What I Ordered</h2>
      <div className={styles.ordered}>
        <div>
          <OrderedInnerPage list={currentPosts(list)} loading={loading} />
          <Page
            postsPerPage={postsPerPage}
            totalPosts={list.length}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            className={styles.pagination}
          ></Page>
        </div>
      </div>
    </>
  );
};

export default Ordered;
