import React, { useState  } from 'react';

import './Style.scss';
import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import Authentication from 'lib/api/Authentication';

const Signup = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userNickname, setUserNickname] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordConfirm, setUserPasswordConfirm] = useState('');

    const onChangeEmail = e => setUserEmail(e.target.value);
    const onChangeNickname = e => setUserNickname(e.target.value);
    const onChangePassword = e => setUserPassword(e.target.value);
    const onChangePasswordConfirm = e => {
        setUserPasswordConfirm(e.target.value);
        if(userPassword == userPasswordConfirm){
            //비밀번호가 같으면 success 표시
            console.log("password comfrim!")
        } else {
            //비밀번호가 같지 않으면 fail 표시
            console.log("password fail...")
        }
    }

    function signupClicked() {
        console.log('signupClicked')
        console.log(userEmail)
          Authentication
              .signup(userEmail, userNickname, userPassword)
              .then((response) => {
                  console.log(response)
                  alert('회원가입이 완료되었습니다.')
                  document.location.href = "/login";    
              }).catch(() => {
                  alert('Signup Failed')
              });
    }

    return (
        <div className="login-page">
          <Header />
          <div className="login-content">
              <div className="login-content-body">
                  <div className="login-content-body-main">
                      <div className="login-content-body-title">
                          <h1 id='login-content-body-title'>회원가입</h1>
                      </div>
                      <form >
                      <div className="login-content-body-main-info">
                          <div className="login-content-body-main-info-id">
                                  <input id="userEmail" name="userEmail" placeholder="이메일" type="email" onChange={onChangeEmail}/>
                          </div>
                          <div className="login-content-body-main-info-nickname">
                                  <input id="userNickname" name="userNickname" placeholder="닉네임" onChange={onChangeNickname}/>
                          </div>
                          <div className="login-content-body-main-info-pw">
                                  <input id="userPassword" name="userPassword" placeholder="비밀번호" type="password" autoComplete="on" onChange={onChangePassword} />
                          </div>
                          <div className="login-content-body-main-info-pw">
                                  <input id="userPasswordConfirm" name="userPasswordConfirm" placeholder="비밀번호 확인" type="password" autoComplete="on" onChange={onChangePasswordConfirm}/>
                          </div>
                          </div>
                      </form>

                      <div className="login-content-body-main-btn">
                        <div className="login-content-body-main-btn-login">
                            <button id="login" onClick={signupClicked}>회원가입</button>
                        </div>
                      </div>                  
                  </div>
              </div>
          </div>
          <Footer />
        </div>
    );
}

export default Signup;