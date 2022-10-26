import React, { useEffect, useState } from "react";
import Select from "react-select";
import styles from "./Admin.module.scss";
import MenuBar from "./MenuBar";
import ReservationService from "lib/api/ReservationService";
import RoomService from "lib/api/RoomService";
var seatStatus = [
  { value: "11:00", label: "11:00" },
  { value: "12:00", label: "12:00" },
  { value: "13:00", label: "13:00" },
  { value: "14:00", label: "14:00" },
  { value: "15:00", label: "15:00" },
  { value: "16:00", label: "16:00" },
  { value: "17:00", label: "17:00" },
  { value: "18:00", label: "18:00" },
  { value: "19:00", label: "19:00" },
  { value: "20:00", label: "20:00" },
  { value: "21:00", label: "21:00" },
];
const curr = new Date();
const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
function setToday() {
  return new Date(utc + KR_TIME_DIFF).toISOString().split("T")[0];
}

const ReservationSetting = () => {
  const [roomList, setRoomList] = useState([]);
  useEffect(() => {
    RoomService.findAllRoom()
      .then((response) => {
        response.data.data.map((data) => {
          let roomNumber = data.roomNumber;
          let roomName = data.roomName;
          setRoomList((roomList) => [
            ...roomList,
            { value: roomNumber, label: roomName },
          ]);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [room, setRoom] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [remainSeats, setRemainSeats] = useState(15);
  const [isRemainRoading, setIsRemainRoading] = useState(true);
  const onChangeRooms = (e) => {
    setRoom(e.value);
  };
  const onChangeDate = (e) => {
    setDate(e.target.value);
  };
  const onChangeTime = (e) => {
    setTime(e.value.toString());
  };
  function handleRemainBtn() {
    if (room !== "" && date !== "" && time !== "") {
      RoomService.findWithRoomNumberAndDateAndTime(room, date, time)
        .then((response) => {
          setRemainSeats(response.data.data);
          setIsRemainRoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("모두 입력하였는지 확인해주세요.");
    }
  }

  const [todayReservationList, setTodayReservationList] = useState([]);
  const [isReservRoading, setIsReservRoading] = useState(true);
  useEffect(() => {
    ReservationService.findReservationToday()
      .then((response) => {
        setTodayReservationList(response.data.data);
        setIsReservRoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  function TodayReservation({
    reservationNumber,
    roomName,
    reservationTime,
    userName,
    userPhoneNumber,
    reservationHeadCount,
    request,
  }) {
    return (
      <div className={styles.reservation}>
        <span>{reservationNumber}</span>&nbsp;<span>{roomName}</span>&nbsp;
        <span>{reservationTime}</span>&nbsp;
        <span>{userName}</span>&nbsp;<span>{userPhoneNumber}</span>&nbsp;
        <span>{reservationHeadCount}</span>&nbsp;
        <span>{request}</span>
      </div>
    );
  }

  function handleDeleteStatusBeforeToday() {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      RoomService.deleteRoomStatusBeforeToday()
        .then(() => {
          alert("과거 예약 상태정보가 삭제되었습니다.");
        })
        .catch((error) => {
          console.log(error);
          alert("삭제 실패. 콘솔창을 확인해주세요.");
        });
    }
  }

  function handleDeleteReservBeforeLimitDay() {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      ReservationService.deleteReservationBeforeLimitDate()
        .then(() => {
          alert("6개월이 지난 예약 데이터를 일괄 삭제하였습니다.");
        })
        .catch((error) => {
          console.log(error);
          alert("삭제 실패. 콘솔창을 확인해주세요.");
        });
    }
  }

  return (
    <div className="ReservationSettingPage">
      <main>
        <MenuBar />
        <div className={styles.content}>
          <div className={styles.contents}>
            <div className={styles.title}>
              <h3>예약 설정 페이지</h3>
            </div>
            <div className={styles.settingContents}>
              <div className={styles.findAll}>
                <h4>객실 예약 현황</h4>
                <hr />
                <form className={styles.selectInput}>
                  <Select
                    options={roomList}
                    className={styles.select}
                    placeholder="객실"
                    onChange={onChangeRooms}
                  ></Select>
                  <input
                    className={styles.select}
                    type="date"
                    min={setToday()}
                    onChange={onChangeDate}
                  />
                  <Select
                    options={seatStatus}
                    onChange={onChangeTime}
                    className={styles.select}
                    placeholder="시간"
                  ></Select>
                </form>
                <div className={styles.outputWithBtn}>
                  <div className={styles.remainSeatsOutput}>
                    {isRemainRoading ? null : remainSeats == 15 ? (
                      <div>해당 시간에 예약 내역이 없습니다.</div>
                    ) : (
                      <div>남은 좌석수는 {remainSeats}입니다.</div>
                    )}
                  </div>
                  <div className={styles.submitDiv}>
                    <button
                      className={styles.submitBtn}
                      type="submit"
                      onClick={handleRemainBtn}
                    >
                      남은 좌석수 확인
                    </button>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <div className={styles.findAll}>
                <h4>오늘 예약자 목록</h4>
                <hr />
                <div className={styles.reservationList}>
                  {isReservRoading ? null : todayReservationList.length == 0 ? (
                    <div>오늘 예약 내역이 없습니다.</div>
                  ) : (
                    todayReservationList.map((resservDate) => (
                      <TodayReservation
                        key={resservDate.reservationNumber}
                        reservationNumber={resservDate.reservationNumber}
                        roomName={resservDate.reservationRoomName}
                        reservationTime={resservDate.reservationTime}
                        userName={resservDate.reservationName}
                        userPhoneNumber={resservDate.reservationPhoneNumber}
                        reservationHeadCount={resservDate.reservationHeadCount}
                        request={resservDate.reservationRequest}
                      />
                    ))
                  )}
                </div>
              </div>
              <br />
              <div className={styles.deleteBefore}>
                <h4>오늘 이전의 객실 예약 상태 정보 삭제하기</h4>
                <hr />
                <div className={styles.deleteAll}>
                  <label>
                    해당하는 예약 상태 정보를 일괄 삭제합니다.{" "}
                    <button onClick={handleDeleteStatusBeforeToday}>
                      일괄 삭제
                    </button>
                  </label>
                </div>
              </div>
              <br />
              <br />
              <div className={styles.deleteBefore}>
                <h4>6개월 이상 지난 예약 정보 일괄 삭제하기</h4>
                <hr />
                <div className={styles.deleteAll}>
                  <label>
                    모든 사용자의 일정 기한이 지난 예약 데이터를 일괄
                    삭제합니다.
                    <button onClick={handleDeleteReservBeforeLimitDay}>
                      일괄 삭제
                    </button>
                  </label>
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
