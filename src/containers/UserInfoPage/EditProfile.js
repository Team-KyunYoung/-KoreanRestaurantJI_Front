import React, { useEffect, useState } from "react";
import styles from "./UserInfo.module.scss";
import ModalWindow from "components/Modal/ModalForRecession";
import * as UserServices from "lib/api/UserService";
import UserService from "lib/api/UserService";
import Authentication from "lib/api/Authentication";

function EditProfile() {
  const [user, setUser] = useState([]);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({
    nicknameMessage: "",
    visiblePwMessage: false,
    visiblePpwwMessage: false,
    isDisabledPasswordConfirm: true,
  });
  const {
    nicknameMessage,
    visiblePwMessage,
    visiblePpwwMessage,
    isDisabledPasswordConfirm,
  } = message;
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
        setUser(response.data.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const onChangeInfo = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
    // eslint-disable-next-line default-case
    switch (e.target.name) {
      case "userPassword":
        const passwordRegex =
          /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if (!passwordRegex.test(e.target.value)) {
          setMessage({
            ...message,
            visiblePwMessage: true,
          });
        } else {
          setMessage({
            ...message,
            visiblePwMessage: false,
          });
        }
        break;
      case "userPasswordConfirm":
        setMessage({
          ...message,
          visiblePpwwMessage: true,
        });
        break;
      case "userNickname":
        UserServices.checknickname(e.target.value)
          .then((res) => res.json())
          .then((json) => {
            if (e.target.value.length !== 0 && e.target.value.length <= 12) {
              setMessage({
                ...message,
                nicknameMessage: json.message,
              });
              if (json.data.status === "OK") {
                setMessage({
                  ...message,
                  nicknameMessage: "사용 가능한 닉네임입니다.",
                });
              } else {
                setMessage({
                  ...message,
                  nicknameMessage: "이미 존재하는 닉네임입니다.",
                });
              }
            } else {
              setMessage({
                ...message,
                nicknameMessage: "",
              });
            }
          })
          .catch(() => {});
        break;
    }
  };
  function handleChangeNickname() {
    if (nicknameMessage === "사용 가능한 닉네임입니다.") {
      UserService.updateUserNickname(userNickname)
        .then((response) => {
          alert("닉네임이 수정되었습니다.");
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert("중복 여부를 확인하세요.");
    }
  }

  const onClickCheckExistingPassword = () => {
    UserService.verifyUserPassword(userExistingPassword)
      .then((response) => {
        alert("올바른 비밀번호입니다.");
        setMessage({
          ...message,
          isDisabledPasswordConfirm: false,
        });
      })
      .catch((error) => {
        alert("비밀번호가 틀렸습니다.");
      });
  };
  //비밀번호
  useEffect(() => {
    if (userPassword === userPasswordConfirm) {
      console.log("password comfrim!");
      setMessage({
        ...message,
        visiblePpwwMessage: false,
      });
    } else {
      setMessage({
        ...message,
        visiblePpwwMessage: true,
      });
    }
  }, [userPassword, userPasswordConfirm]);

  function handleChangePassword() {
    if (visiblePwMessage !== false || visiblePpwwMessage !== false) {
      alert("비밀번호 입력 조건을 확인하세요.");
    } else {
      UserService.updateUserPassword(userPassword)
        .then((response) => {
          alert("비밀번호가 수정되었습니다.");
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }
  //탈퇴창
  const [show, setShow] = useState(false);
  const handleClose = (e) => {
    if (e.target.type === "submit") {
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
    }
    setShow(false);
  };
  const onClickSecession = (e) => {
    setShow(true);
  };
  return (
    <>
      <h2>edit profile</h2>
      <div className={styles.editProfile}>
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
              placeholder="비밀번호를 변경하려면 기존 비밀번호를 입력해주세요"
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
      </div>
    </>
  );
}
export default EditProfile;
