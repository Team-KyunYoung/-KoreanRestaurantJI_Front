import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import styles from "./Booking.module.scss";
import Header from "components/header/Header";
import Chat from "../../components/ChatBot/Chat";
import Footer from "components/footer/Footer";
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
// 1. 현재 시간(Locale)
const curr = new Date();
// 2. UTC 시간 계산
const utc = 
      curr.getTime() + 
      (curr.getTimezoneOffset() * 60 * 1000);

// 3. UTC to KST (UTC + 9시간)
const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
function setToday(){
  //오늘 날짜 반환(+ YYYY-MM-DD fomating)
  return new Date(utc + (KR_TIME_DIFF)).toISOString().split("T")[0];
}
function setMaxDay(){
  let date = new Date(utc + (KR_TIME_DIFF))
  var maxDate = new Date(date.setMonth(date.getMonth()+1));
  return maxDate.toISOString().split("T")[0]
}
function RemainingSeatsByDate(data, date) {
  //날짜 선택했을 때 남은 좌석을 검사하는 함수
  const res = data.data.roomStatus;

  // console.log(data.data.roomStatus.length);
  console.log(res);
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
      if(date == setToday()){
        if(obj.value.split(":")[0] < new Date(utc + (KR_TIME_DIFF)).getHours())
          obj.isDisabled = true;
          //continue  //map에는 continue 없음..
      }
      if (obj.label === res[i].reservationTime) {
        //배열에서 같은 시간대를 찾고
        if (obj.remain > res[i].roomRemaining) {
          //그 시간대에 남은 좌석수의 최소값을 저장함
          obj.remain = res[i].roomRemaining;
        }
        if (res[i].roomRemaining < 1) {
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
        if (personnelObj.value === 2 && seatObj.remain < 2) {
          //남은 좌석이 5개 미만이라면
          personnelObj.isDisabled = true; //5-8인 option disabled
        }
        if (personnelObj.value === 3 && seatObj.remain < 3) {
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

  const [userName, setUserName] = useState();
  const [userPhoneNumber, setUserPhoneNumber] = useState();
  const [userRequest, setUserRequest] = useState("");

  const [date, setDate] = useState(setToday);
  const [time, setTime] = useState();
  const [tableCnt, setTableCnt] = useState();
  const navigate = useNavigate();

  //모달 창
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // useEffect(() => {//해당 방의 모든 예약을 불러옴
  //   RoomService.findWithRoomNumber(roomParams.roomNumber).then((response) => {
  //     // console.log(response);
  //     setRoomStatus(response.data);
  //     setIsLoading(false);
  //   });
  // }, []);

  useEffect(() => {
    //페이지 첫 로드 시, 모달 창 열림->개인 정보 입력
    handleShow();
  }, []);
  const onChangeFormName = (e) => {
    console.log(e.target.value === null);
    setUserName(e.target.value);
  };
  const onChangeFormPhoneNumber = (e) => {
    setUserPhoneNumber(e.target.value);
  };
  const onChangeFormRequest = (e) => {
    setUserRequest(e.target.value);
  };

  const onChangeDate = (e) => {
    setDate(e.target.value);
  };
  useEffect(() => {
    //date가 바뀔 때만 검사
    RoomService.findWithRoomNumberAndDate(roomParams.roomNumber, date).then(
      (response) => {
        // console.log(response);
        RemainingSeatsByDate(response.data, date);
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
    if (userName === undefined || userPhoneNumber === undefined)
      alert("예약자 정보를 입력해주세요");
    if (
      date !== undefined ||
      time !== undefined ||
      tableCnt !== undefined ||
      userName !== undefined ||
      userPhoneNumber !== undefined
    ) {
      // 마운트 될 때 /helloWorld에 해당하는 페이지로 이동
      UserService.findUser()
        .then((response) => {
          console.log(response);
          ReservationService.createReservation(
            date,
            userName, //성명
            userPhoneNumber, //예약자 연락처
            userRequest, // 요청사항
            Number(roomParams.roomNumber),
            tableCnt,
            time
          )
            .then((response) => {
              console.log(response);
              alert(
                userName + "님 " + date + " " + time + " 예약이 완료되었습니다."
              );
              navigate("../../../UserInfo/reservation");
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
              <input type="date" defaultValue={setToday()} min={setToday()} max={setMaxDay()} onChange={onChangeDate} />
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>예약자 정보 입력</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>성명</Form.Label>
              <Form.Control type="text" autoFocus onChange={onChangeFormName} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>연락처</Form.Label>
              <Form.Control type="text" onChange={onChangeFormPhoneNumber} />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                요청사항을 입력해주세요
              </Form.Label>
              <Form.Control  onChange={onChangeFormRequest}
                as="textarea"
                rows={3}
                placeholder="(ex. 알러지 정보, 아기 식사)"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={handleClose}>
            제출하기
          </Button>
        </Modal.Footer>
      </Modal>
      <Chat />
      <Footer />
    </div>
  );
};

export default SelectMore;
