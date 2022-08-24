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
              {props.date.toString() === obj.reservationDate.toString() ? (
                <li key={obj.reservationNumber} className={styles.today}>
                  <img src={image1} alt="reservation list" />
                  <span className={styles.listSpan}>
                    <span>{obj.reservationDate}</span>
                    <span>|</span>
                    <span>{obj.reservationTime}</span>
                    <span>|</span>
                    <span>{obj.reservationRoomName}</span>
                    <br />
                    <span>{obj.reservationName}</span>
                    <span>|</span>
                    <span>{obj.reservationHeadCount}</span>
                    <span>|</span>
                    <span>{obj.reservationPhoneNumber}</span>
                  </span>
                </li>
              ) : (
                <li key={obj.reservationNumber} className={styles.notToday}>
                  <img src={image1} alt="reservation list" />
                  <span className={styles.listSpan}>
                    <span>{obj.reservationDate}</span>
                    <span>|</span>
                    <span>{obj.reservationTime}</span>
                    <span>|</span>
                    <span>{obj.reservationRoomName}</span>
                    <br />
                    <span>{obj.reservationName}</span>
                    <span>|</span>
                    <span>{obj.reservationHeadCount}</span>
                    <span>|</span>
                    <span>{obj.reservationPhoneNumber}</span>
                  </span>
                </li>
              )}
              <hr />
            </>
          ))}
    </ul>
  );
}
function swap(left, right) {
  var tmp = left;
  left = right;
  right = tmp;
}
function quick(list) {
  console.log("quick");
  // var pl = left;
  // var pr = right;
  // console.log(pl, pr);
  // console.log((pl + pr) / 2);
  // var idx = Math.floor((pl + pr) / 2);
  // console.log(idx);
  // var x = list[idx];
  // console.log(x.reservationDate);
  // console.log(pl, pr);
  // do {
  //   while (list[pl].reservationDate < x) pl++;
  //   while (list[pr].reservationDate > x) pr--;
  //   if (pl <= pr) {
  //     swap(list[pl], list[pr]);
  //     pl++;
  //     pr--;
  //   }
  // } while (pl <= pr);
  // if (pr > left) quick(list, left, pr);
  // if (pl < right) quick(list, pl, right);
  for (var i = 0; i < 11; i++) {
    list.map((left) => {
      var date1 = new Date(left.reservationDate);

      console.log(" 1. " + date1);
      list.map((right) => {
        var date2 = new Date(right.reservationDate);
        console.log("2.  " + date2 + " " + right.reservationNumber);
        console.log(date1 === date2);
        if (date1 >= date2) {
          var tmp = left;
          left = right;
          right = tmp;
          // console.log(left.reservationDate + " " + right.reservationDate);
        }
      });
    });
  }
}
const Reservation = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

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
    ReservationService.findReservation().then((response) => {
      setList(response.data.data);
      console.log(response.data.data);
      // quick(list);
    });
    // .catch(() => {
    //   setLoading(true);
    //   console.log("error:예약 목록 불러오기");
    // });
  }, []);
  quick(list);
  //list 정렬
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
            paginate={setCurrentPage}
            className={styles.pagination}
          ></Page>
        </div>
      </div>
    </>
  );
};

export default Reservation;
