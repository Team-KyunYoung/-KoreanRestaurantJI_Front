import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";

import styles from "./Admin.module.scss";

const MenuBar = () => {
    let navigate = useNavigate();

    function toGo(href){
        navigate(href)
    }

  return (
    <div className={styles.menuBar}>
        <div className={styles.logo}><h2>智</h2><h6>Setting</h6></div>
        <div className={styles.menuContent}>
            <div className={styles.menu}>
                <Button className={styles.menuButton} onClick={() => toGo("/Admin/Home")}>홈</Button>
                <Button className={styles.menuButton} onClick={() => toGo("/Admin/DishSetting")}>단품 요리</Button>
                <Button className={styles.menuButton} onClick={() => toGo("/Admin/CourseSetting")}>코스 요리</Button>
                <Button className={styles.menuButton} onClick={() => toGo("/Admin/RoomSetting")}>객실</Button>
                <Button className={styles.menuButton} onClick={() => toGo("/Admin/ReservationSetting")}>예약</Button>
                <Button className={styles.menuButton} onClick={() => toGo("/Admin/FAQSetting")}>FAQ</Button>
                <Button className={styles.menuButton} onClick={() => toGo("/Admin/EventSetting")}>Event</Button>
            </div>
            <div className={styles.goService}><Button className={styles.menuButton} onClick={() => toGo("/")}>서비스 페이지로 →</Button></div>
        </div>
    </div>
  );
};

export default MenuBar;
