import React, { useEffect, useState, useRef } from "react";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import styles from "./Signup.module.scss";
import * as UserService from "lib/api/UserService";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

const Signup = () => {
  const [userEmail, setUserEmail] = useState("");
  const [emailToken, setEmailToken] = useState();
  const [userToken, setUserToken] = useState();
  const [userNickname, setUserNickname] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordConfirm, setUserPasswordConfirm] = useState("");

  const [isUsableEmail, setIsUsableEmail] = useState(false); //중복확인 통과 여부
  //true->중복 검사 통과, false->타이머와 input 숨기기(중복검사 불통 또는 인증메일 확인 후 또는 시간 초과)
  const [emailMessage, setEmailMessage] = useState("");

  const [isUsableNickname, setIsUsableNickname] = useState(false); //중복확인 통과 여부
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [isClickedNickname, setIsClickedNickname] = useState(false);
  //닉네임은 fetch이용하기 때문에 focus되었을 때만 사용할 수 있도록

  const [isCertifiedEmail, setIsCertifiedEmail] = useState(false); //이메일의 토큰인증 통과 여부

  const [visiblePwMessage, setVisiblePwMessage] = useState(false);
  const [visiblePpwwMessage, setVisiblePpwwMessage] = useState(false);

  const onChangeEmail = (e) => {
    console.log(userEmail); //1g
    setUserEmail(e.target.value);
    console.log(e.target.value); //1g1
    console.log(userEmail); //1g
    //1. 페이지 렌더링 되면서 userEmail에 저장된 값 뿌림
    //2. 입력과 동시에 e.target.value값 인식
    //3. 값이 바뀌었으므로 렌더링이 되지만 setState가 비동기이기 때문에 이전 state를 출력
  };

  const onClickEmail = () => {
    //이메일 중복 검사 + 인증메일 발송
    UserService.emailAuth(userEmail)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.data.status === "OK") {
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
  const onChangeEmailToken = (e) => {
    setUserToken(e.target.value);
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

  const onChangeNickname = (e) => {
    setUserNickname(e.target.value);
  };
  const onClickNickname = () => {
    setIsClickedNickname(true);
  };
  //닉네임 중복 쳌
  //렌더링 될 때마다 특정 작업을 실행하는 useEffect 사용 : useState를 동기적으로 사용할 수 있음
  useEffect(() => {
    if (isClickedNickname === true) {
      //닉네임 input에 focus되었을 때만 아래를 수행함
      UserService.checknickname(userNickname)
        .then((res) => res.json())
        .then((json) => {
          if (userNickname.length !== 0) {
            setNicknameMessage(json.message);
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
  const signupClicked = () => {
    console.log("signupClicked");
    console.log({ userEmail });
    if (
      isCertifiedEmail !== true ||
      isUsableNickname !== true ||
      visiblePwMessage !== false ||
      visiblePpwwMessage !== false
    ) {
      alert("입력한 내용을 다시 확인해주세요");
      console.log(
        isCertifiedEmail +
          "," +
          isUsableNickname +
          "," +
          visiblePwMessage +
          "," +
          visiblePpwwMessage +
          ","
      );
    } else {
      UserService.signup(userEmail, userNickname, userPassword)
        .then((response) => {
          console.log(response);
          alert("회원가입이 완료되었습니다.");
          document.location.href = "/login";
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
                  {/*이메일 중복되면 메세지*/}
                  {isUsableEmail && (
                    <p name="enterEmailMessage">
                      {min}분 {sec}초
                    </p>
                  )}
                  {isUsableEmail && (
                    <InputGroup>
                      <input
                        id="emailToken"
                        name="emailToken"
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
                <div className={styles.inputNickname}>
                  <input
                    id="userNickname"
                    name="userNickname"
                    placeholder="닉네임"
                    onChange={onChangeNickname}
                    onClick={onClickNickname}
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
                    onChange={onChangePassword}
                    onClick={onClickPassword}
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
