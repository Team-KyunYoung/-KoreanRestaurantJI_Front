import React, { useEffect, useState, useRef, useCallback } from "react";

import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import styles from "../SignupPage/Signup.module.scss";
import * as UserService from "lib/api/UserService";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

const FindPassword = () => {
  const [userEmail, setUserEmail] = useState("");
  const [emailToken, setEmailToken] = useState();
  const [userToken, setUserToken] = useState();
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordConfirm, setUserPasswordConfirm] = useState("");

  const [isUsableEmail, setIsUsableEmail] = useState(false); //이메일 존재 여부
  const [emailMessage, setEmailMessage] = useState("");

  const [isCertifiedEmail, setIsCertifiedEmail] = useState(false); //이메일의 토큰인증 통과 여부

  const [visiblePwMessage, setVisiblePwMessage] = useState(false);
  const [visiblePpwwMessage, setVisiblePpwwMessage] = useState(false);

  const onChangeEmail = (e) => {
    setUserEmail(e.target.value);
    console.log(e.target.value); //1g1
    console.log(userEmail); //1g
  };

  function onClickEmail() {
    UserService.emailAuthForPassword(userEmail)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.httpStatus === "OK") {
          setEmailMessage("이메일이 발송되었습니다.");
          setIsUsableEmail(true);
          setEmailToken(json.data);
          console.log(json.data);
        } else if (json.status === 500) {
          setEmailMessage("올바르지 않은 메일 형식입니다.");
        } else {
          setEmailMessage("가입되지 않은 이메일입니다.");
        }
      })
      .catch(() => {
        console.log("error");
      });
  }
  const onChangeEmailToken = (e) => {
    setUserToken(e.target.value);
    console.log(e.target.value); //1g1
    console.log(userToken); //1g
  };
  const onClickEmailToken = () => {
    if (userToken === emailToken) {
      setIsUsableEmail(false); //타이머와 인증번호 입력 칸 숨기기 위해 false처리
      setEmailMessage("인증이 완료되었습니다.");
      setIsCertifiedEmail(true);
    } else {
      setEmailMessage("인증번호를 다시 확인해주세요:)");
    }
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
      //조건에 맞지 않음
      console.log(userPassword);
      console.log(passwordRegex.test(userPassword));
    } else {
      //조건에 부합
      setVisiblePwMessage(false);
    }
  }, [userPassword]);
  //비밀번호 일치 검사
  useEffect(() => {
    console.log(userPassword);
    console.log(userPasswordConfirm);
    if (userPassword === userPasswordConfirm) {
      //비밀번호 일치
      console.log("password comfrim!");
      setVisiblePpwwMessage(false);
    } else {
      //비밀번호가 같지 않으면 fail 표시
      console.log("password fail...");
    }
  }, [userPassword, userPasswordConfirm]);
  //회원가입 신청 시 내용 저장
  const changePasswordClicked = () => {
    if (isCertifiedEmail !== true || visiblePwMessage !== false) {
      alert("비밀번호 변경이 불가능합니다. 입력 내용을 확인해주세요");
      console.log(isCertifiedEmail + "" + visiblePwMessage);
    } else {
      UserService.updatePassword(userEmail, userPassword)
        .then((res) => res.json())
        .then((data) => {
          console.log("성공:", data);
          document.location.href = "/login";
        })
        .catch((error) => {
          console.error("실패:" + error);
        });
    }
  };
  //이메일 인증 카운트 다운
  //참고 : https://handhand.tistory.com/32
  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);
  const [time, setTime] = useState(180);
  const timerId = useRef(null);
  useEffect(() => {
    if (isUsableEmail) {
      //이메일 인증 버튼 통과 시 카운트 다운
      timerId.current = setInterval(() => {
        setMin(parseInt(time.current / 60));
        setSec(time.current % 60);

        setTime(time - 1);
        console.log({ time });
      }, 1000);
      return () => clearInterval(timerId.current);
    } else {
      clearInterval(timerId.current);
    }
  }, [isUsableEmail]);
  useEffect(() => {
    if (time.current <= 0) {
      clearInterval(timerId.current);
      //시간 초과 시 멘트 발생
    }
  }, [sec]);

  return (
    <div className="loginPage">
      <Header />
      <main>
        <div className={styles.content}>
          <header className={styles.title}>
            <h1 id="title">비밀번호 찾기</h1>
          </header>
          <section className={styles.main}>
            <form>
              <div className={styles.inputArea}>
                <div className={styles.inputId}>
                  <InputGroup>
                    <input
                      id="userEmail"
                      name="userEmail"
                      placeholder="이메일을 입력하세요"
                      type="email"
                      onChange={onChangeEmail}
                    />
                    <Button
                      variant="outline-secondary"
                      id="button-addon2"
                      className={styles.inputIdBtn}
                      onClick={onClickEmail}
                    >
                      입력
                    </Button>
                  </InputGroup>
                  <p>{emailMessage}</p>
                  {isUsableEmail && (
                    <p name="enterEmailMessage">
                      {min}분 {sec}초
                    </p>
                  )}
                  {isUsableEmail && (
                    <InputGroup>
                      <input
                        id="userToken"
                        name="userToken"
                        placeholder="인증키를 입력해주세요"
                        aria-label="인증키를 입력해주세요"
                        type="text"
                        onChange={onChangeEmailToken}
                      />
                      <Button
                        variant="outline-secondary"
                        className={styles.inputIdBtn}
                        id="button-addon2"
                        onClick={onClickEmailToken}
                      >
                        인증
                      </Button>
                    </InputGroup>
                  )}
                </div>
                <div className={styles.inputPassword}>
                  <input
                    id="userPassword"
                    name="userPassword"
                    placeholder="비밀번호"
                    type="password"
                    autoComplete="on"
                    onChange={onChangePassword}
                  />
                  {visiblePwMessage && (
                    <p>
                      영소문자와 숫자를 섞은 8자리 이상의 비밀번호를
                      입력해주세요
                    </p>
                  )}
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

            <div className={styles.signUpBtn}>
              <div>
                <button id="login" onClick={changePasswordClicked}>
                  입력 완료
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FindPassword;
