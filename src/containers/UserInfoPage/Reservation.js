import React, { useEffect } from "react";
import styles from "./UserInfo.module.scss";
import ReservationService from "lib/api/ReservationService";

const Reservation = () => {
  useEffect(() => {
    ReservationService.findReservation().then((response) => {
      console.log(response);
    });
  }, []);
  return (
    <>
      <h2>Room I Booked</h2>
      <div className={styles.list}></div>
    </>
  );
};

export default Reservation;
