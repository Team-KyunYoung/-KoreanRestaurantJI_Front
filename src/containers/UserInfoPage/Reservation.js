import React, { useState, useEffect } from "react";
import styles from "./UserInfo.module.scss";
import ReservationService from "lib/api/ReservationService";
import Page from "./Pagination";

import * as UserServices from "lib/api/UserService";
import UserService from "lib/api/UserService";
const image1 = "https://picsum.photos/800/600";
function ReservationInnerPage(props) {
  return (
    <ul className={styles.list}>
      {props.loading
        ? "loading"
        : props.list.map((obj) => (
            <>
              <li
                key={obj.reservationNumber}
                className={
                  props.date.toString() === obj.reservationDate.toString() //오늘 날짜에 스타일 부여(일단은 배경색)
                    ? styles.today
                    : styles.notToday
                }
              >
                <img src={image1} alt="reservation list" />
                <div className={styles.listSpan}>
                  <p>
                    {props.date.toString() ===
                    obj.reservationDate.toString() ? (
                      <span>
                        <strong>Today!</strong>
                      </span>
                    ) : (
                      <b>예약 일시</b>
                    )}{" "}
                    {obj.reservationDate} {obj.reservationTime}{" "}
                  </p>
                  <p>
                    <b>예약 정보</b> {obj.reservationRoomName}홀{" "}
                    {obj.reservationHeadCount}
                  </p>
                  <p>
                    <b>예약자</b> {obj.reservationName}님{" "}
                    {obj.reservationPhoneNumber}
                  </p>
                </div>
              </li>
              {/* <hr /> */}
            </>
          ))}
    </ul>
  );
}
const Reservation = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(1);

  //오늘 날짜 구하기
  const year = new Date().getFullYear();
  const originMonth = new Date().getMonth() + 1;
  const month = ("00" + originMonth.toString()).slice(-2); //십의 자리로 표시
  const originDate = new Date().getDate();
  const date = ("00" + originDate.toString()).slice(-2);
  const today = [year, month, date].join("-");
  console.log(today);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
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
    ReservationService.findReservation()
      .then((response) => {
        setList(response.data.data);
        console.log(response.data.data);
      })
      .catch(() => {
        setLoading(true);
        console.log("error:예약 목록 불러오기");
      });
  }, []);
  return (
    <>
      <h2>Room I Booked</h2>
      <div className={styles.reservation}>
        <div>
          <ReservationInnerPage
            list={currentPosts(list)}
            loading={loading}
            date={today}
          />
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

export default Reservation;
