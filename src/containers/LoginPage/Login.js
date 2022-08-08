import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Login.module.scss";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import * as Authentication from "lib/api/Authentication";

//
const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [hasLoginFailed, setHasLoginFailed] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const EmailHandleChange = (e) => setUserEmail(e.target.value);
  const passwordHandleChange = (e) => setUserPassword(e.target.value);

  const loginClicked = () => {
    console.log("loginClicked");
    console.log(userEmail);
    Authentication.login(userEmail, userPassword)
      .then((response) => {
        console.log(response);
        // setToken();
        document.location.href = "/";
        setShowSuccessMessage(true);
        setHasLoginFailed(false);
      })
      .catch(() => {
        // console.log(error.response)
        setShowSuccessMessage(false);
        setHasLoginFailed(true);
        alert("Login Failed");
      });
  };
  // 페이지 렌더링 후 가장 처음 호출되는 함수
  {
    /* useEffect(() => {
        axios.get('/login')
            .then(res => console.log(res))
            .catch()
    },
        // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
        [])
*/
  }
  const socialLoginGoogle = () => {
    console.log("google login clicked");
    //Authentication.loginSocialGoogle();
  };

  const socialLoginKakao = () => {
    console.log("kakao login clicked");
    //Authentication.loginSocialKakao();
  };

  return (
    <div className="loginPage">
      <Header />
      ``
      <main>
        <div className={styles.content}>
          <header className={styles.title}>
            <h1 id="title">로그인</h1>
          </header>
          <section className={styles.main}>
            <form>
              <div className={styles.inputArea}>
                {hasLoginFailed && (
                  <div className="alert alert-warning">Invalid Credentials</div>
                )}
                {showSuccessMessage && <div>Login Sucessful</div>}
                <div className={styles.inputId}>
                  <input
                    id="userEmail"
                    name="userEmail"
                    placeholder="이메일을 입력하세요"
                    type="email"
                    onChange={EmailHandleChange}
                  />
                </div>
                <div className={styles.inputPw}>
                  <input
                    id="userPassword"
                    name="userPassword"
                    placeholder="비밀번호"
                    type="password"
                    autoComplete="on"
                    onChange={passwordHandleChange}
                  />
                </div>
              </div>
            </form>

            <div className={styles.loginBtn}>
              <div>
                <button id="login" onClick={loginClicked}>
                  로그인
                </button>
              </div>
            </div>

            <div className={styles.social}>
              <div>소셜로그인</div>
              <hr></hr>
              <div className={styles.btnCarrier}>
                <div className={styles.socialBtn}>
                  <img
                    src={require("assets/btn/btn_google_signin.png")}
                    onClick={socialLoginGoogle}
                    alt="google signin"
                  />
                </div>
                <div className={styles.socialBtn}>
                  <img
                    src={require("assets/btn/btn_kakao_signin.png")}
                    onClick={socialLoginKakao}
                    alt="kakao signin"
                  />
                </div>
              </div>
            </div>

            <div className={styles.userAccess}>
              <div className={styles.signupBtn}>
                <Link to="/signup">회원가입</Link>
              </div>
              <div className={styles.signupBtn}>
                <Link to="/findPassword">비밀번호 찾기</Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
