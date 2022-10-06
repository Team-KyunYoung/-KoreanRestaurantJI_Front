import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const ModalWindow = ({ form, setForm, show, handleClose }) => {
  const onHandleChangeUserInfo = (e) => {
    const nextForm = {
      ...form, // 기존의 값 복사 (spread operator)
      [e.target.name]: e.target.value, // 덮어쓰기
    };
    console.log(nextForm);
    setForm(nextForm);
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>예약자 정보 입력</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>성명</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              onChange={onHandleChangeUserInfo}
              name="userName"
              maxLength={12}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>연락처</Form.Label>
            <Form.Control
              type="text"
              onChange={onHandleChangeUserInfo}
              name="userPhoneNumber"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>요청사항을 입력해주세요</Form.Label>
            <Form.Control
              onChange={onHandleChangeUserInfo}
              name="userRequest"
              as="textarea"
              rows={3}
              maxLength={100}
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
  );
};

export default ModalWindow;
