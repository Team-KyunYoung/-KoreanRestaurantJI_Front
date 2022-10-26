import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const ModalWindow = ({ setPassword, show, handleClose }) => {
  const onHandleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>회원 탈퇴</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Control
              type="password"
              autoFocus
              onChange={onHandleChangePassword}
              name="password"
              maxLength={12}
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
