import React, { useEffect, useState } from "react";

import styles from "./UserInfo.module.scss";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

import Header from "components/header/Header";
import Footer from "components/footer/Footer";

import * as UserServices from "lib/api/UserService";
import UserService from "lib/api/UserService";


const UserInfo = () => {
  const [user, setUser] = useState([]);
  const [userNickname, setUserNickname] = useState("");
  const [isClickedNickname, setIsClickedNickname] = useState(false);
  const [isUsableNickname, setIsUsableNickname] = useState(false);
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordConfirm, setUserPasswordConfirm] = useState("");
  const [visiblePwMessage, setVisiblePwMessage] = useState(false);
  const [visiblePpwwMessage, setVisiblePpwwMessage] = useState(false);

  useEffect(() => {
    UserService.findUser()
      .then((response) => {
        console.log(response.data.data)
        setUser(response.data.data)
      }).catch((error) => {
          console.log(error.response)
      });
  }, [])

  const onChangeNickname = (e) => {
    setUserNickname(e.target.value);
  }; 
  const onClickNickname = () => {
    setIsClickedNickname(true);
  };
  useEffect(() => {
    if (isClickedNickname === true) {
      //닉네임 input에 focus되었을 때만 아래를 수행함
      UserServices.checknickname(userNickname)
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          //json에서 받아온 값이
          if (userNickname.length !== 0) {
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
    }
  });

  const onClickPassword = () => {
    setIsClickedNickname(false);
  };
  const onChangePassword = (e) => {
    setUserPassword(e.target.value);
    console.log(e.target.value);
    setVisiblePwMessage(true);
  };
  const onChangePasswordConfirm = (e) => {
    setUserPasswordConfirm(e.target.value);
    setVisiblePpwwMessage(true);
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
    if(isUsableNickname) {
      UserService.updateUserNickname(userNickname)
        .then((response) => {
          console.log(response.data.data)
          alert("닉네임이 수정되었습니다.")
        })
    } else {
      alert("중복 여부를 확인하세요.")
    }
  }

  function handleChangePassword() {
    if(visiblePwMessage !== false || visiblePpwwMessage !== false) {
      alert("비밀번호 입력 조건을 확인하세요.")
    } else {
      UserService.updateUserPassword(userPassword)
        .then((response) => {
          console.log(response.data.data)
          alert("비밀번호가 수정되었습니다.")
        }).catch((error) => {
          console.log("updateUserPassword error")
          console.log(error.response)
        });
    }
  }

  return (
    <div className="UserInfo Page">
      <Header />

      <main>
        <div className={styles.content}>
          <header className={styles.title}>
          </header>
          <section className={styles.main}>
              <div className={styles.img}>
                {/* 좌측 이미지 + 메뉴 이름 */}
              </div>
              <div className={styles.contents}>
                <form>
                  <div className={styles.inputArea}>
                    <div className={styles.inputId}>
                      <input
                        id="userEmail"
                        name="userEmail"
                        type="email"
                        value={user.userEmail || ''}
                        disabled
                      />
                    </div>
                    <div className={styles.inputNickname}>
                      <InputGroup>
                        <input
                          id="userNickname"
                          name="userNickname"
                          placeholder={user.userNickname}
                          onChange={onChangeNickname}
                          onClick={onClickNickname}
                        />
                        <p>{nicknameMessage}</p>

                        <Button
                          variant="outline-secondary"
                          id="button-addon2"
                          className={styles.inputIdBtn}
                          onClick={handleChangeNickname}
                        >
                          변경
                        </Button>
                      </InputGroup>
                    </div>
                    <div className={styles.inputPassword}>
                      <InputGroup>
                        <input
                          id="userPassword"
                          name="userPassword"
                          placeholder="비밀번호"
                          type="password"
                          autoComplete="on"
                          onChange={onChangePassword}
                          onClick={onClickPassword}
                        />
                        {visiblePwMessage && (
                          <p>
                            영소문자와 숫자를 섞은 8자리 이상의 비밀번호를
                            입력해주세요
                          </p>
                        )}

                        <Button
                          variant="outline-secondary"
                          id="button-addon2"
                          className={styles.inputIdBtn}
                          onClick={handleChangePassword}
                        >
                          변경
                        </Button>
                      </InputGroup>
                    </div>
                    <div className={styles.inputPassword}>
                      <input
                        id="userPasswordConfirm"
                        name="userPasswordConfirm"
                        placeholder="비밀번호 확인"
                        type="password"
                        autoComplete="on"
                        onChange={onChangePasswordConfirm}
                      />
                      {visiblePpwwMessage && <p>일치하지 않는 비밀번호입니다</p>}
                    </div>
                  </div>
                </form>
              </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserInfo;