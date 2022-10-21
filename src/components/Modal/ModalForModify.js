import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import RoomService from "lib/api/RoomService";
import "./Modal.module.scss";
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
  { value: 1, label: "2~4인", isDisabled: false },
  { value: 2, label: "5~8인", isDisabled: false },
  { value: 3, label: "9~12인", isDisabled: false },
];
// 1. 현재 시간(Locale)
const curr = new Date();
// 2. UTC 시간 계산
const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;

// 3. UTC to KST (UTC + 9시간)
const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
function setToday() {
  //오늘 날짜 반환(+ YYYY-MM-DD fomating)
  return new Date(utc + KR_TIME_DIFF).toISOString().split("T")[0];
}
function setMaxDay() {
  let date = new Date(utc + KR_TIME_DIFF);
  var maxDate = new Date(date.setMonth(date.getMonth() + 1));
  return maxDate.toISOString().split("T")[0];
}
function RemainingSeatsByDate(data, date) {
  //날짜 선택했을 때 남은 좌석을 검사하는 함수
  // console.log(data.data.roomStatus.length);
  console.log(data.length);
  // reservationTime: '16:00', roomRemaining: 11
  for (let i = 0; i < data.length; i++) {
    // eslint-disable-next-line no-loop-func
    seatStatus.map((obj) => {
      if (
        (date === setToday() &&
          obj.value.split(":")[0] <= new Date(utc + KR_TIME_DIFF).getHours()) ||
        (obj.label === data[i].reservationTime && data[i].roomRemaining === 0)
      ) {
        console.log("선불" + obj.label);
        obj.isDisabled = true;
        //continue  //map에는 continue 없음..
      } else {
        obj.isDisabled = false;
      }
      if (data[i].roomRemaining !== 15) {
        if (obj.label === data[i].reservationTime) {
          //배열에서 같은 시간대를 찾고
          if (obj.remain > data[i].roomRemaining) {
            //그 시간대에 남은 좌석수의 최소값을 저장함
            obj.remain = data[i].roomRemaining;
          }
        }
      }
    });
    console.log(seatStatus);
  }
}

function RemainingSeatsByTime(time) {
  console.log(time);
  //시간을 선택했을 때 남은 좌석을 검사하는 함수
  seatStatus.map((seatObj) => {
    if (time === seatObj.value) {
      //seatStatus에서 선택한 시간을 찾음
      personnelStatus.map((personnelObj) => {
        console.log(personnelObj.value + "," + seatObj.remain);
        // console.log(personnel);
        if (personnelObj.value === 2 && seatObj.remain < 2) {
          //남은 좌석이 5개 미만이라면
          personnelObj.isDisabled = true; //5-8인 option disabled
        }
        if (personnelObj.value === 3 && seatObj.remain < 3) {
          //남은 좌석이 9개 미만이라면
          personnelObj.isDisabled = true; //9-12인 option disabled
        }
        console.log(personnelStatus);
      });
    }
  });
}
const ModalWindow = ({ show, handleClose, data, setData }) => {
  console.log(data);
  // console.log(data.reservationName);
  function onHandleChangeUserInfo(e) {
    const nextForm = {
      ...data,
      [e.target.name]: e.target.value,
    };
    console.log(nextForm);
    setData(nextForm);
  }
  const onChangePersonnel = (e) => {
    setData({
      ...data,
      reservationHeadCount: e.value,
    });
  };

  const onChangeTime = (e) => {
    setData({
      ...data,
      reservationTime: e.value.toString(),
    });
  };
  const [roomRes, setRoomRes] = useState([]);
  const [roomNum, setRoomNum] = useState();

  useEffect(() => {
    console.log("Booking PAGE LOADING");
    RoomService.findAllRoom().then((response) => {
      // console.log(response);
      setRoomRes(response.data.data);
    });
  }, []);
  useEffect(() => {
    console.log(data.reservationRoomName);
    RoomService.searchRoom(data.reservationRoomName).then((response) => {
      setRoomNum(parseInt(response.data.data[0].roomNumber));
    });
  }, [data.reservationRoomName]);
  useEffect(() => {
    //date가 바뀔 때만 검사
    RoomService.findWithRoomNumberAndDate(roomNum, data.reservationDate)
      .then((response) => {
        if (response.data.data.roomStatus.length === 0) {
          RemainingSeatsByDate([{ roomRemaining: 15 }], data.reservationDate);
        } else {
          //날짜 선택했을 때 남은 좌석을 검사하는 함수
          RemainingSeatsByDate(
            response.data.data.roomStatus,
            data.reservationDate
          );
        }
      })
      .catch(() => {
        RemainingSeatsByDate([{ roomRemaining: 15 }], data.reservationDate);
      });
    console.log({ seatStatus });
  }, [data.reservationDate]);
  useEffect(() => {
    personnelStatus.map((personnelObj) => {
      personnelObj.isDisabled = false;
    });
    // console.log(data.reservationTime);
    RemainingSeatsByTime(data.reservationTime);
  }, [data.reservationTime]);

  return (
    <Modal show={show} onHide={handleClose} className="modal">
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>예약자 정보 입력</Modal.Title>
      </Modal.Header>
      <Modal.Body>선택하지 않은 항목은 이전 정보가 유지됩니다.</Modal.Body>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>홀</Form.Label>
              <select
                // onChange={onChangeRoom}
                onChange={onHandleChangeUserInfo}
                name="reservationRoomName"
              >
                {roomRes.map((obj, i) => (
                  <option
                    key={i}
                    value={obj.roomName}
                    defaultValue={data.reservationRoomName === obj.roomName}
                  >
                    {obj.roomName}
                  </option>
                ))}
              </select>
            </Form.Group>
            <Form.Label>날짜</Form.Label>
            <input
              type="date"
              defaultValue={data.reservationDate}
              min={setToday()}
              max={setMaxDay()}
              onChange={onHandleChangeUserInfo}
              name="reservationDate"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>시간</Form.Label>

            <Select
              options={seatStatus}
              Disabled={(seatStatus) => seatStatus.isDisabled}
              onChange={onChangeTime}
              placeholder="시간"
              name="reservationTime"
            ></Select>
            {/* <select name="reservationTime" onChange={onHandleChangeUserInfo}>
              {seatStatus.map((obj) => (
                <option
                  value={obj.value}
                  selected={data.reservationTime === obj.label}
                  disabled={obj.isDisabled}
                  name="reservationTime"
                >
                  {obj.label}
                </option>
              ))}
            </select> */}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>인원</Form.Label>

            <Select
              options={personnelStatus}
              Disabled={(personnelStatus) => personnelStatus.isDisabled}
              placeholder="인원"
              onChange={onChangePersonnel}
              name="reservationHeadCount"
            ></Select>
            {/* <select
              name="reservationHeadCount"
              onChange={onHandleChangeUserInfo}
            >
              {personnelStatus.map((obj) => (
                <option
                  value={obj.label}
                  name="reservationHeadCount"
                  selected={data.reservationHeadCount === obj.label}
                  disabled={obj.isDisabled}
                >
                  {obj.label}
                </option>
              ))}
            </select> */}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>예약자명</Form.Label>
            <Form.Control
              type="text"
              onChange={onHandleChangeUserInfo}
              name="reservationName"
              placeholder={data.reservationName}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>연락처</Form.Label>
            <Form.Control
              type="text"
              onChange={onHandleChangeUserInfo}
              name="reservationPhoneNumber"
              placeholder={data.reservationPhoneNumber}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>요청사항을 입력해주세요</Form.Label>
            <Form.Control
              onChange={onHandleChangeUserInfo}
              name="reservationRequest"
              rows={3}
              maxLength={100}
              placeholder={data.reservationRequest}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" type="button" onClick={handleClose}>
          닫기
        </Button>
        <Button variant="primary" type="submit" onClick={handleClose}>
          제출하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalWindow;
