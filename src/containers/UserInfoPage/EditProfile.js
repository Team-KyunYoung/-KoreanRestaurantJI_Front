import React, { useEffect, useState } from "react";

import styles from "./UserInfo.module.scss";
import ModalWindow from "components/Modal/ModalForRecession";

import * as UserServices from "lib/api/UserService";
import UserService from "lib/api/UserService";
import Authentication from "lib/api/Authentication";

function EditProfile() {
  const [user, setUser] = useState([]);
  const [isUsableNickname, setIsUsableNickname] = useState(false);
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePwMessage, setVisiblePwMessage] = useState(false);
  const [visiblePpwwMessage, setVisiblePpwwMessage] = useState(false);
  const [isDisabledPasswordConfirm, setIsDisabledPasswordConfirm] =
    useState(true);
  const [info, setInfo] = useState({
    userNickname: "",
    userExistingPassword: "",
    userPassword: "",
    userPasswordConfirm: "",
  });
  const {
    userNickname,
    userExistingPassword,
    userPassword,
    userPasswordConfirm,
  } = info;
  useEffect(() => {
    UserService.findUser()
      .then((response) => {
        console.log(response.data.data);
        setUser(response.data.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);
  useEffect(() => {
    //닉네임 input에 focus되었을 때만 아래를 수행함
    UserServices.checknickname(userNickname)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        //json에서 받아온 값이
        if (userNickname.length !== 0 && userNickname.length <= 12) {
          setNicknameMessage(json.message);
          console.log(json.data.status);
          if (json.data.status === "OK") {
            setIsUsableNickname(true);
            setNicknameMessage("사용 가능한 닉네임입니다.");
          } else {
            setNicknameMessage("이미 존재하는 닉네임입니다.");
          }
        } else {
          setNicknameMessage("");
        }
      })
      .catch(() => {});
  }, [userNickname]);
  const onClickCheckExistingPassword = () => {
    console.log(userExistingPassword);
    UserService.verifyUserPassword(userExistingPassword)
      .then((response) => {
        alert("올바른 비밀번호입니다.");
        setIsDisabledPasswordConfirm(false);
      })
      .catch((error) => {
        console.log(error.response);
        alert("비밀번호가 틀렸습니다.");
      });
  };
  const onChangeInfo = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
    // eslint-disable-next-line default-case
    switch (e.target.name) {
      case "userPassword":
        setVisiblePwMessage(true);
        break;
      case "userPasswordConfirm":
        setVisiblePpwwMessage(true);
        break;
    }
  };
  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);

  const handleClose = (e) => {
    console.log(password);
    UserService.verifyUserPassword(password)
      .then((response) => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
          UserService.deleteUser()
            .then((res) => {
              alert("탈퇴 완료");
              Authentication.logout();
              document.location.href = "/";
            })
            .catch((error) => {
              alert(error.response);
              console.log(error.response);
            });
        } else {
          alert("취소되었습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setShow(false);
  };
  const onClickSecession = (e) => {
    setShow(true);
    console.log("open");
  };
  useEffect(() => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(userPassword)) {
      console.log(userPassword);
      console.log(passwordRegex.test(userPassword));
    } else {
      setVisiblePwMessage(false);
    }
  }, [userPassword]);
  useEffect(() => {
    console.log(userPassword);
    console.log(userPasswordConfirm);
    if (userPassword === userPasswordConfirm) {
      console.log("password comfrim!");
      setVisiblePpwwMessage(false);
    } else {
      console.log("password fail...");
    }
  }, [userPassword, userPasswordConfirm]);

  function handleChangeNickname() {
    if (isUsableNickname) {
      UserService.updateUserNickname(userNickname)
        .then((response) => {
          console.log(response.data.data);
          alert("닉네임이 수정되었습니다.");
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert("중복 여부를 확인하세요.");
    }
  }

  function handleChangePassword() {
    if (visiblePwMessage !== false || visiblePpwwMessage !== false) {
      alert("비밀번호 입력 조건을 확인하세요.");
    } else {
      UserService.updateUserPassword(userPassword)
        .then((response) => {
          console.log(response.data.data);
          alert("비밀번호가 수정되었습니다.");
        })
        .catch((error) => {
          console.log("updateUserPassword error");
          console.log(error.response);
        });
    }
  }
  return (
    <>
      <h2>edit profile</h2>
      <form className={styles.editProfile}>
        <div className={styles.inputArea}>
          <div className={styles.inputId}>
            <input
              id="userEmail"
              name="userEmail"
              type="email"
              value={user.userEmail || ""}
              disabled
            />
          </div>
          <div className={styles.inputNickname}>
            <input
              id="userNickname"
              name="userNickname"
              placeholder={user.userNickname}
              onChange={onChangeInfo}
              maxLength="12"
            />
            <button
              variant="outline-secondary"
              id="button-addon2"
              className={styles.inputIdBtn}
              onClick={handleChangeNickname}
            >
              변경
            </button>
            <p>{nicknameMessage}</p>
          </div>
          <div className={styles.inputPassword}>
            <input
              id="userExistingPassword"
              name="userExistingPassword"
              placeholder="기존 비밀번호를 입력해주세요"
              type="password"
              autoComplete="on"
              onChange={onChangeInfo}
              maxLength="25"
            />

            <button
              variant="outline-secondary"
              id="button-addon2"
              className={styles.inputIdBtn}
              onClick={onClickCheckExistingPassword}
              type="button"
            >
              확인
            </button>
          </div>
          <div className={styles.inputPassword}>
            <input
              id="userPassword"
              name="userPassword"
              placeholder="새 비밀번호를 입력해주세요"
              type="password"
              autoComplete="on"
              onChange={onChangeInfo}
              disabled={isDisabledPasswordConfirm}
              maxLength="25"
            />
            {visiblePwMessage && (
              <p>영소문자와 숫자를 섞은 8자리 이상의 비밀번호를 입력해주세요</p>
            )}
          </div>
          <div className={styles.inputPassword}>
            <input
              id="userPasswordConfirm"
              name="userPasswordConfirm"
              placeholder="비밀번호 확인"
              type="password"
              autoComplete="on"
              onChange={onChangeInfo}
              disabled={isDisabledPasswordConfirm}
              maxLength="25"
            />

            <button
              variant="outline-secondary"
              id="button-addon2"
              className={styles.inputIdBtn}
              onClick={handleChangePassword}
            >
              변경
            </button>
            {visiblePpwwMessage && <p>일치하지 않는 비밀번호입니다</p>}
          </div>
          <div className={styles.secession}>
            <button type="button" onClick={onClickSecession}>
              탈퇴하기
            </button>
          </div>
        </div>
        {show ? (
          <ModalWindow
            setPassword={setPassword}
            show={show}
            handleClose={handleClose}
          />
        ) : (
          ""
        )}
      </form>
    </>
  );
}
export default EditProfile;
