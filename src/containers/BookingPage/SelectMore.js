import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import styles from "./Booking.module.scss";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import ChatShortcut from "../../components/ShortCut/ChatShortcut";
import RoomService from "lib/api/RoomService";
import ReservationService from "lib/api/ReservationService";
import UserService from "lib/api/UserService";
//import SubmitBtn from "../../components/<컴포넌트명>";

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
var personnelStatus = [
  { value: 1, label: "2인", isDisabled: false },
  { value: 1, label: "4인", isDisabled: false },
  { value: 2, label: "5-8인", isDisabled: false },
  { value: 3, label: "9-12인", isDisabled: false },
];
function RemainingSeatsByDate(data) {
  //날짜 선택했을 때 남은 좌석을 검사하는 함수
  const res = data.data.roomStatus;

  // console.log(data.data.roomStatus.length);
  // console.log(res);
  // reservationTime: '16:00', roomRemaining: 11
  for (let i = 0; i < res.length; i++) {
    seatStatus.map((obj) => {
      // console.log(
      //   obj.label +
      //     "," +
      //     res[i].reservationTime +
      //     "," +
      //     obj.remain +
      //     "," +
      //     res[i].roomRemaining
      // );
      if (obj.label === res[i].reservationTime) {
        //배열에서 같은 시간대를 찾고
        if (obj.remain > res[i].roomRemaining) {
          //그 시간대에 남은 좌석수의 최소값을 저장함
          obj.remain = res[i].roomRemaining;
        }
        if (res[i].roomRemaining < 4) {
          //4보다 작으면 어떠한 테이블도 예약 불가
          //그 시간대 선택 불가
          obj.isDisabled = true;
        }
      }
      // $("select option[value*='volvo']").prop('disabled',true);
      // {option[value="11o"].prop('disabled',true);}
      // console.log(seat);
    });
  }
}
function RemainingSeatsByTime(time) {
  //시간을 선택했을 때 남은 좌석을 검사하는 함수
  seatStatus.map((seatObj) => {
    if (time === seatObj.value) {
      //seatStatus에서 선택한 시간을 찾음
      personnelStatus.map((personnelObj) => {
        // console.log(personnelObj.value + "," + seatObj.remain);
        // console.log(personnel);
        if (personnelObj.value === 2 && seatObj.remain < 5) {
          //남은 좌석이 5개 미만이라면
          personnelObj.isDisabled = true; //5-8인 option disabled
        }
        if (personnelObj.value === 3 && seatObj.remain < 9) {
          //남은 좌석이 9개 미만이라면
          personnelObj.isDisabled = true; //9-12인 option disabled
        }
        // console.log(personnelStatus);
      });
    }
  });
}
const SelectMore = () => {
  const roomParams = useParams(); //url에서 파라미터 가져오기

  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [tableCnt, setTableCnt] = useState();
  const navigate = useNavigate();
  // useEffect(() => {//해당 방의 모든 예약을 불러옴
  //   RoomService.findWithRoomNumber(roomParams.roomNumber).then((response) => {
  //     // console.log(response);
  //     setRoomStatus(response.data);
  //     setIsLoading(false);
  //   });
  // }, []);

  const onChangeDate = (e) => {
    setDate(e.target.value);
  };
  useEffect(() => {
    //date가 바뀔 때만 검사
    RoomService.findWithRoomNumberAndDate(roomParams.roomNumber, date).then(
      (response) => {
        // console.log(response);
        RemainingSeatsByDate(response.data);
        //날짜 선택했을 때 남은 좌석을 검사하는 함수
      }
    );
  }, [date]);
  const onChangeTime = (e) => {
    // console.log(e);
    setTime(e.value.toString());
    console.log(time);
  };
  useEffect(() => {
    RemainingSeatsByTime(time);
  }, [time]);
  const onChangePersonnel = (e) => {
    setTableCnt(Number(e.value));
  };
  function SubmitReservationForm() {
    if (date === undefined) alert("날짜를 선택해주세요");
    if (time === undefined) alert("시간을 선택해주세요");
    if (tableCnt === undefined) alert("인원을 선택해주세요");

    // 마운트 될 때 /helloWorld에 해당하는 페이지로 이동
    UserService.findUser()
      .then((response) => {
        console.log(response);
        ReservationService.createReservation(
          date,
          response.data.data.userNickname,
          response.data.data.userNickname,
          Number(roomParams.roomNumber),
          tableCnt,
          time
        )
          .then((response) => {
            console.log(response);
            alert(date + " " + time + " 예약이 완료되었습니다.");
            navigate("../../../reservation");
          })
          .catch(() => {
            alert("예약에 실패하였습니다. 새로고침 후 다시 시도해주세요.");
          });
      })
      .catch(() => {
        alert("로그인 후 이용해주세요.");
        navigate("../../../login");
      });
  }
  return (
    <div id="ReservationDetail">
      <Header />
      <main className={styles.selectMore}>
        <div className={styles.container}>
          <header>
            <h1>{roomParams.roomName}</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </header>
          <div className={styles.reservationFormBox}>
            <form>
              <input type="date" onChange={onChangeDate} />
              <Select
                options={seatStatus}
                Disabled={(seatStatus) => seatStatus.isDisabled}
                onChange={onChangeTime}
                className={styles.select}
                placeholder="시간"
              ></Select>
              <Select
                options={personnelStatus}
                Disabled={(personnelStatus) => personnelStatus.isDisabled}
                className={styles.select}
                placeholder="인원"
                onChange={onChangePersonnel}
              ></Select>
            </form>
            <button type="submit" onClick={SubmitReservationForm}>
              예약하기
            </button>
          </div>
        </div>
      </main>
      <ChatShortcut />
      <Footer />
    </div>
  );
};

export default SelectMore;
