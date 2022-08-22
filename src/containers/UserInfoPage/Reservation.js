import React, { useState, useEffect } from "react";
import styles from "./UserInfo.module.scss";
import ReservationService from "lib/api/ReservationService";
import Page from "./Pagination";

const image1 = "https://picsum.photos/800/600";
function ReservationInnerPage(props) {
  return (
    <ul className={styles.list}>
      {props.loading
        ? "loading"
        : props.list.map((obj) => (
            <>
              <li key={obj.reservationNumber}>
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
              <hr />
            </>
          ))}
    </ul>
  );
}
const Reservation = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (posts) => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };
  useEffect(() => {
    ReservationService.findReservation()
      .then((response) => {
        setList(response.data.data);
        console.log(response);
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
          <ReservationInnerPage list={currentPosts(list)} loading={loading} />
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
