import React, { useState } from "react";
import Select from "react-select";

import styles from "./Admin.module.scss";
import MenuBar from "./MenuBar";

var seatStatus = [
  { value: "11:00", label: "11:00", remain: 15, isDisabled: false },
  { value: "12:00", label: "12:00", remain: 15, isDisabled: false },
  { value: "13:00", label: "13:00", remain: 15, isDisabled: false },
  { value: "14:00", label: "14:00", remain: 15, isDisabled: false },
  { value: "15:00", label: "15:00", remain: 15, isDisabled: false },
  { value: "16:00", label: "16:00", remain: 15, isDisabled: false },
  { value: "17:00", label: "17:00", remain: 15, isDisabled: false },
  { value: "18:00", label: "18:00", remain: 15, isDisabled: false },
  { value: "19:00", label: "19:00", remain: 15, isDisabled: false },
  { value: "20:00", label: "20:00", remain: 15, isDisabled: false },
  { value: "21:00", label: "21:00", remain: 15, isDisabled: false },
];
const curr = new Date();
const utc = 
      curr.getTime() + 
      (curr.getTimezoneOffset() * 60 * 1000);
const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
function setToday(){
  return new Date(utc + (KR_TIME_DIFF)).toISOString().split("T")[0];
}

const ReservationSetting = () => {
  const [rooms, setRooms] = useState([]);
  const [date, setDate] = useState(setToday);
  const [time, setTime] = useState();
  const onChangeRooms = (e) => { setRooms(e.target.value); };
  const onChangeDate = (e) => { setDate(e.target.value); };  
  const onChangeTime = (e) => { setTime(e.value.toString()); };

  return (
    <div className="ReservationSettingPage">
      <main>
        <MenuBar/>
        <div className={styles.content}>
            <div className={styles.contents}>
              <div className={styles.title}><h3>예약 설정 페이지</h3></div>
              <div className={styles.settingContents}>
                <div className={styles.findAll}>
                  <h3>객실 예약 현황</h3>
                  <form>
                    <Select
                      options={rooms}
                      className={styles.select}
                      placeholder="객실"
                      onChange={onChangeRooms}
                    ></Select>
                    <input type="date" min={setToday()} onChange={onChangeDate} />
                    <Select
                      options={seatStatus}
                      onChange={onChangeTime}
                      className={styles.select}
                      placeholder="시간"
                    ></Select>
                  </form>
                  <button type="submit">
                    남은 좌석수 확인
                  </button>
                </div>
                <hr/>
                <div className={styles.findAll}>
                  <h3>오늘 예약자 목록</h3>
                  <div className={styles.reservationList}>
                    <div>
                      <div>예약 객실</div>
                      <div>예약 시간</div>
                      <div>예약자명</div>
                      <div>예약자 이메일</div>
                      <div>예약자 번호</div>
                      <div>예약 인원</div>
                      <div>요청 사항</div>
                    </div>
                  </div>
                </div>
                <hr/>
                <div className={styles.deleteBefore}>
                    <h3>오늘 이전의 객실 예약 상태 정보 삭제하기</h3>
                    <div className={styles.deleteAll}>
                      <label>해당하는 예약 상태 정보를 일괄 삭제합니다. <button>일괄 삭제</button></label>
                    </div>
                </div>
                <div className={styles.deleteBefore}>
                    <h3>6개월 이상 지난 예약 정보 일괄 삭제하기</h3>
                    <div className={styles.deleteAll}>
                      <label>모든 사용자의 일정 기한이 지난 예약 데이터를 일괄 삭제합니다.<button>일괄 삭제</button></label>
                    </div>
                </div>
              </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default ReservationSetting;
