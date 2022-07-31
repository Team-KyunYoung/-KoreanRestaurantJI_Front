import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Login.scss';
import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import Authentication from 'lib/api/Authentication';
import axios from "axios";

//
const Login = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [token, setToken] = useState(localStorage.getItem("token") || '');
    const [hasLoginFailed, setHasLoginFailed] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const EmailHandleChange = (e) => setUserEmail(e.target.value);
    const passwordHandleChange = (e) => setUserPassword(e.target.value);

    const loginClicked = () => {
        console.log('loginClicked')
        console.log(userEmail)
        Authentication
            .login(userEmail, userPassword)
            .then((response) => {
                console.log(response)
                // setToken();
                document.location.href = "/";
                setShowSuccessMessage(true);
                setHasLoginFailed(false);
            }).catch(() => {
                // console.log(error.response)
                setShowSuccessMessage(false);
                setHasLoginFailed(true);
                alert('Login Failed');
            });
    }
    // 페이지 렌더링 후 가장 처음 호출되는 함수
   {/* useEffect(() => {
        axios.get('/login')
            .then(res => console.log(res))
            .catch()
    },
        // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
        [])
*/}
    const socialLoginGoogle = () => {
        console.log("google login clicked")
        //Authentication.loginSocialGoogle();
    }

    const socialLoginKakao = () => {
        console.log("kakao login clicked")
        //Authentication.loginSocialKakao();
    }

    return (
        <div className="login-page">
            <Header />``
            <div className="login-content">
                <div className="login-content-body">
                    <div className="login-content-body-title">
                        <h1 id='login-content-body-title'>로그인</h1>
                    </div>
                    <div className="login-content-body-main">
                        <form >
                            <div className="login-content-body-main-info">
                                {hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                                {showSuccessMessage && <div>Login Sucessful</div>}
                                <div className="login-content-body-main-info-id">
                                    <input id="userEmail" name="userEmail" placeholder="이메일을 입력하세요" type="email" onChange={EmailHandleChange} />
                                </div>
                                <div className="login-content-body-main-info-pw">
                                    <input id="userPassword" name="userPassword" placeholder="비밀번호" type="password" autoComplete="on" onChange={passwordHandleChange} />
                                </div>
                            </div>
                        </form>

                        <div className="login-content-body-main-btn">
                            <div className="login-content-body-main-btn-login">
                                <button id="login" onClick={loginClicked}>로그인</button>
                            </div>
                        </div>


                        <div className="login-content-body-main-social">
                            <div>소셜로그인</div>
                            <hr></hr>
                            <div className="login-content-body-main-social-btn-carrier">
                                <div className='login-content-body-main-social-btn'>
                                    <img className='social-login-btn' src={require('assets/btn/btn_google_signin.png')} onClick={socialLoginGoogle} />
                                </div>
                                <div className='login-content-body-main-social-btn'>
                                    <img className='social-login-btn' src={require('assets/btn/btn_kakao_signin.png')} onClick={socialLoginKakao} />
                                </div>
                            </div>
                        </div>

                        <div className="login-content-body-main-user">
                            <div className='login-content-body-main-signup-btn'>
                                <Link to='/signup'>회원가입</Link>
                            </div>
                            <div className='login-content-body-main-signup-btn'>
                                <Link to='/signup'>아이디 찾기</Link>
                            </div>
                            <div className='login-content-body-main-signup-btn'>
                                <Link to='/signup'>비밀번호 찾기</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;