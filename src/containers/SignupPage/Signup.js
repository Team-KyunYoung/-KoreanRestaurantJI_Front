import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import Privacy from "./Privacy.js";
import styles from "./Signup.module.scss";
import * as UserService from "lib/api/UserService";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Accordion from "react-bootstrap/Accordion";

const Signup = () => {
	let navigate = useNavigate();
	const location = useLocation();
  
  const [emailToken, setEmailToken] = useState();
  const [isUsableEmail, setIsUsableEmail] = useState(false); //중복확인 통과 여부
  //true->중복 검사 통과, false->타이머와 input 숨기기(중복검사 불통 또는 인증메일 확인 후 또는 시간 초과)
  const [emailMessage, setEmailMessage] = useState("");
  const [isCertifiedEmail, setIsCertifiedEmail] = useState(false); //이메일의 토큰인증 통과 여부

  const [isUsableNickname, setIsUsableNickname] = useState(false); //중복확인 통과 여부
  const [nicknameMessage, setNicknameMessage] = useState("");

  const [pwMessage, setPwMessage] = useState("");
  const [pwConfirmMessage, setPwConfirmMessage] = useState("");

  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  //json으로 보낼 내용
  const [form, setForm] = useState({
    userEmail: "",
    userEmailToken: "",
    userNickname: "",
    userPassword: "",
    userPasswordConfirm: "",
  });

  const {
    userEmail,
    userEmailToken,
    userNickname,
    userPassword,
    userPasswordConfirm,
  } = form;

  const onHandleChange = (e) => {
    const nextForm = {
      ...form, // 기존의 값 복사 (spread operator)
      [e.target.name]: e.target.value, // 덮어쓰기
    };
    console.log(nextForm);
    setForm(nextForm);
  };
  const onChangeChecked = (e) => {
    if (e.target.checked) setIsPrivacyChecked(true);
    else setIsPrivacyChecked(false);
  };
  const onSubmitEmail = () => {
    //이메일 중복 검사 + 인증메일 발송
    UserService.emailAuth(userEmail)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.httpStatus === "OK") {
          setEmailMessage("사용가능한 이메일입니다.");
          setIsUsableEmail(true);
          setEmailToken(json.data);
        } else if (json.status === 500) {
          setEmailMessage("올바르지 않은 메일 형식입니다.");
        } else {
          //가입되지 않은 회원이면 이메일 발송 + 카운트다운
          setEmailMessage("가입된 회원입니다.");
        }
      })
      .catch(() => {
        console.log("error");
      });
  };
  const onSubmitEmailToken = () => {
    if (userEmailToken === emailToken) {
      setIsUsableEmail(false); //타이머와 인증번호 입력 칸 숨기기 위해 false처리
      setEmailMessage("인증이 완료되었습니다.");
      setIsCertifiedEmail(true);
    } else {
      setEmailMessage("인증번호를 다시 확인해주세요:)");
    }
  };

  //닉네임 중복 쳌
  //렌더링 될 때마다 특정 작업을 실행하는 useEffect 사용 : useState를 동기적으로 사용할 수 있음
  useEffect(() => {
    UserService.checknickname(userNickname)
      .then((res) => res.json())
      .then((json) => {
        if (userNickname.length !== 0) {
          setNicknameMessage(json.message);
          if (json.httpStatus === "OK") {
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
  useEffect(() => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(userPassword)) {
      //조건에 맞지 않음
      console.log(userPassword);
      console.log(passwordRegex.test(userPassword));
      if (userPassword.length !== 0)
        setPwMessage(
          "영문,숫자,기호를 포함한 8자 이상의 비밀번호를 입력하세요"
        );
    } else {
      //조건에 부합
      setPwMessage("");
    }
  }, [userPassword]);
  //비밀번호 일치 검사
  useEffect(() => {
    console.log(userPassword);
    console.log(userPasswordConfirm);
    if (userPassword === userPasswordConfirm) {
      //비밀번호 일치
      console.log("password comfrim!");
      setPwConfirmMessage("");
    } else {
      //비밀번호가 같지 않으면 fail 표시
      console.log("password fail...");
      if (userPasswordConfirm.length !== 0)
        setPwConfirmMessage("비밀번호가 일치하지 않습니다.");
    }
  }, [userPassword, userPasswordConfirm]);
  //userPasswordConfirm만 검사하지 않고 둘 다 하는 이유 :
  //PwConfirmMessage가 비었을 떄 인증을 통과했다 판단하여 가입 가능해짐
  // 두 단계의 비밀번호 인증 통과 후 userPassword를 바꾸면
  //userPasswordConfirm를 통과했다 착각
  const completeSignup = () => {
    console.log("signupClicked");
    console.log({ userEmail });
    if (
      isCertifiedEmail !== true ||
      isUsableNickname !== true ||
      pwMessage !== "" ||
      pwConfirmMessage !== "" ||
      userPasswordConfirm.length === 0
    ) {
      alert("입력한 내용을 다시 확인해주세요");
      console.log(isCertifiedEmail + "," + isUsableNickname + ",");
    } else if (isPrivacyChecked !== true) {
      alert("개인정보 처리방침에 동의해주세요");
    } else {
      UserService.signup(userEmail, userNickname, userPassword)
        .then((response) => {
          console.log(response);
          alert("회원가입이 완료되었습니다.");
          navigate('/login', { state: { preLocation : location } })
        })
        .catch(() => {
          alert("Signup Failed");
        });
    }
  };

  //이메일 인증 카운트 다운
  //참고 : https://handhand.tistory.com/32
  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);
  var time = useRef(180);
  const timerId = useRef(null);
  useEffect(() => {
    if (isUsableEmail) {
      //이메일 인증 버튼 통과 시 카운트 다운
      timerId.current = setInterval(() => {
        setMin(parseInt(time.current / 60));
        setSec(time.current % 60);
        time.current -= 1;
      }, 1000);
      // return () => clearInterval(timerId.current);
    } else {
      clearInterval(timerId.current);
    }
  }, [isUsableEmail]);
  useEffect(() => {
    if (time.current < 0) {
      setIsUsableEmail(false);
      setEmailMessage("다시 한 번 인증해주세요");
      time.current = 180; //useRef 값 변경
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
          <section className={styles.main} defaultactivekey="0">
            <Accordion className={styles.privacy}>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  개인정보 이용동의 및 처리방침
                </Accordion.Header>
                <Accordion.Body className={styles.privacyBody}>
                  <Privacy />
                </Accordion.Body>
              </Accordion.Item>
              <div className={styles.privacyAgree}>
                <label htmlFor="checkBox">개인정보처리방침에 동의합니다</label>
                <input
                  type="checkbox"
                  id="checkBox"
                  name="agree"
                  onChange={onChangeChecked}
                />
              </div>
            </Accordion>
            <form>
              <div className={styles.inputArea}>
                <div className={styles.inputId}>
                  <InputGroup>
                    <input
                      id="userEmail"
                      name="userEmail"
                      placeholder="이메일을 입력하세요"
                      type="email"
                      value={userEmail}
                      onChange={onHandleChange}
                    />

                    <Button
                      variant="outline-secondary"
                      id="button-addon2"
                      className={styles.inputIdBtn}
                      onClick={onSubmitEmail}
                    >
                      입력
                    </Button>
                  </InputGroup>
                  <p>{emailMessage}</p>
                  {/*이메일 중복되면 메세지*/}
                  {isUsableEmail && (
                    <p name="enterEmailMessage">
                      {min}분 {sec}초
                    </p>
                  )}
                  {isUsableEmail && (
                    <InputGroup>
                      <input
                        id="userEmailToken"
                        name="userEmailToken"
                        placeholder="인증키를 입력해주세요"
                        aria-label="인증키를 입력해주세요"
                        type="text"
                        value={userEmailToken}
                        onChange={onHandleChange}
                      />

                      <Button
                        variant="outline-secondary"
                        className={styles.inputIdBtn}
                        id="button-addon2"
                        onClick={onSubmitEmailToken}
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
                    value={userNickname}
                    onChange={onHandleChange}
                    maxLength="12"
                  />
                  <p>{nicknameMessage}</p>
                </div>
                <div className={styles.inputPassword}>
                  <input
                    id="userPassword"
                    name="userPassword"
                    placeholder="비밀번호"
                    type="password"
                    autoComplete="on"
                    value={userPassword}
                    onChange={onHandleChange}
                    maxLength="25"
                  />
                  <p>{pwMessage}</p>
                </div>
                <div className={styles.inputPassword}>
                  <input
                    id="userPasswordConfirm"
                    name="userPasswordConfirm"
                    placeholder="비밀번호 확인"
                    type="password"
                    autoComplete="on"
                    value={userPasswordConfirm}
                    onChange={onHandleChange}
                    maxLength="25"
                  />
                  <p>{pwConfirmMessage}</p>
                </div>
              </div>
            </form>

            <div className={styles.signUpBtn}>
              <div>
                <button id="login" onClick={completeSignup}>
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
