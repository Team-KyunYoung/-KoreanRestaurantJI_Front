import React, { useEffect, useState, useRef, useCallback } from "react";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import styles from "./Signup.module.scss";
import Authentication from "lib/api/Authentication";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Signup = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordConfirm, setUserPasswordConfirm] = useState("");

  const [isUsableEmail, setIsUsableEmail] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");

  const [isUsableNickname, setIsUsableNickname] = useState(false);
  const [nicknameMessage, setNicknameMessage] = useState("");

  const [visiblePwMessage, setVisiblePwMessage] = useState(false);
  const [visiblePpwwMessage, setVisiblePpwwMessage] = useState(false);

  const onChangeEmail = (e) => {
    setUserEmail(e.target.value);
    console.log(userEmail);
  };
  function emailAuth() {
    const data = {
      userEmail: userEmail,
    };
    const emailInfo = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": `application/json`,
      },
    };
    console.log(userEmail);
    fetch("/api/user/signup/emailAuth", emailInfo)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json === false) {
          // json에서 tf를 반환하는지 모르겠다
          console.log("false");
          setEmailMessage("가입된 회원입니다.");
        } else {
          //가입되지 않은 회원이면 이메일 발송 + 카운트다운
          console.log("true");
          setIsUsableEmail(true);
        }
      });
  }
  //닉네임 변경 시 1. 닉네임을 저장하고 (setUserNickname)
  //2. 중복 검사 진행하여(fetch) 3. 중복 된 닉네임이면 메세지 보여줌(setIsDuplicateNickname)
  const onChangeNickname = (e) => {
    setUserNickname(e.target.value);
    const data = {
      userNickname: userNickname,
    };
    const nicknameInfo = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": `application/json`,
      },
    };
    console.log(userNickname);
    fetch("/api/user/checknickname", nicknameInfo)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        //json에서 받아온 값이
        if (json.data === "ok") {
          console.log("false");
          if (userNickname !== 0) setNicknameMessage("중복된 닉네임입니다");
          else setNicknameMessage("");
        } else {
          console.log("true");
          setNicknameMessage("사용 가능한 닉네임입니다");
          setIsUsableNickname(true);
        }
      });
  };
  const onChangePassword = (e) => {
    setUserPassword(e.target.value);
    setVisiblePwMessage(true);
  };
  const onChangePasswordConfirm = (e) => {
    setUserPasswordConfirm(e.target.value);
    setVisiblePpwwMessage(true);
  };
  //입력되는 데로 비밀번호 유효성 검사
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
  function signupClicked() {
    console.log("signupClicked");
    console.log({ userEmail });
    // if (visibleIdMessage === false || visibleNicknameMessage === false || visiblePwMessage === false || visiblePpwwMessage === false)
    //     alert('입력한 내용을 다시 확인해주세요');
    Authentication.signup(userEmail, userNickname, userPassword)
      .then((response) => {
        console.log(response);
        alert("회원가입이 완료되었습니다.");
        document.location.href = "/login";
      })
      .catch(() => {
        alert("Signup Failed");
      });
  }

  //이메일 인증 카운트 다운
  //참고 : https://handhand.tistory.com/32
  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);
  const time = useRef(180);
  const timerId = useRef(null);
  useEffect(() => {
    if (isUsableEmail) {
      //이메일 인증 버튼 통과 시 카운트 다운
      timerId.current = setInterval(() => {
        setMin(parseInt(time.current / 60));
        setSec(time.current % 60);
        time.current -= 1;
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
            <h1 id="title">회원가입</h1>
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
                      onClick={
                        emailAuth
                        //     () => {
                        //   //닉네임 검사이메일 인증 발송
                        //   setIsUsableEmail(true);
                        // }
                      }
                    >
                      입력
                    </Button>
                  </InputGroup>
                  {emailMessage}
                  {/*이메일 중복되면 메세지*/}
                  {isUsableEmail && (
                    <p
                      className="signup-help-enter-id"
                      name="enterEmailMessage"
                    >
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
                      />
                      {/* onChange={onChangeUserToken} */}
                      <Button
                        variant="outline-secondary"
                        className={styles.inputIdBtn}
                        id="button-addon2"
                        onClick={() => {
                          setIsUsableEmail(true);
                        }}
                      >
                        인증
                      </Button>
                    </InputGroup>
                  )}
                </div>
                <div className={styles.inputNickname}>
                  <input
                    id="userNickname"
                    name="userNickname"
                    placeholder="닉네임"
                    onChange={onChangeNickname}
                  />
                  <p className="signup-help-enter-nickname">
                    {nicknameMessage}
                  </p>
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
                    <p className="signup-help-enter-pw">
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
                  {visiblePpwwMessage && (
                    <p className="signup-help-enter-ppww">
                      일치하지 않는 비밀번호입니다
                    </p>
                  )}
                </div>
              </div>
            </form>

            <div className={styles.signUpBtn}>
              <div>
                <button id="login" onClick={signupClicked}>
                  회원가입
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

export default Signup;
