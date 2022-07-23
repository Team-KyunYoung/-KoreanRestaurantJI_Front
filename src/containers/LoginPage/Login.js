import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Style.scss';
import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import Authentication from 'lib/api/Authentication';
//import logo from 'assets/<파일명>';
//import SubmitBtn from "components/<컴포넌트명>";

class Login extends Component {

  constructor(props) {
      super(props)

      this.state = {
          userEmail: localStorage.getItem("authenticatedUser") || '',
          userPassword: '',
          token: localStorage.getItem("token") || '',
          hasLoginFailed: false,
          showSuccessMessage: false
      }
      this.handleChange = this.handleChange.bind(this)
      this.loginClicked = this.loginClicked.bind(this)
  }
  handleChange(event) {
      this.setState(
          {
              [event.target.name] : event.target.value
          }
      )
  }

  loginClicked() {
    console.log('loginClicked')
    console.log(this.state.userEmail)
      Authentication
          .login(this.state.userEmail, this.state.userPassword)
          .then((response) => {
              console.log(response)
              this.setState({
                  //token: response.data.data
              });
              document.location.href = "/";    
              this.setState({ showSuccessMessage: true })
              this.setState({ hasLoginFailed: false })
          }).catch(() => {
              // console.log(error.response)
              this.setState({ showSuccessMessage: false })
              this.setState({ hasLoginFailed: true })
              alert('Login Failed');
          });
  }

  socialLoginGoogle() {
      console.log("google login clicked")
      //Authentication.loginSocialGoogle();
  }
  socialLoginKakao() {
      console.log("kakao login clicked")
      //Authentication.loginSocialKakao();
  }

  
  render() {
      return (
        <div className="login-page">
          <Header />
          <div className="login-content">
              <div className="login-content-body">
                  <div className="login-content-body-main">
                      <div className="login-content-body-title">
                          <h1 id='login-content-body-title'>로그인</h1>
                      </div>
                      <form >
                      <div className="login-content-body-main-info">
                          {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                          {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                          <div className="login-content-body-main-info-id">
                                  <input id="userEmail" name="userEmail" placeholder="이메일" type="email" onChange={this.handleChange}/>
                          </div>
                          <div className="login-content-body-main-info-pw">
                                  <input id="userPassword" name="userPassword" placeholder="비밀번호" type="password" autoComplete="on" onChange={this.handleChange} />
                          </div>
                          </div>
                      </form>

                      <div className="login-content-body-main-btn">
                        <div className="login-content-body-main-btn-login">
                            <button id="login" onClick={this.loginClicked}>로그인</button>
                        </div>
                      </div>
                      

                      <div className="login-content-body-main-social">
                          <div>소셜로그인</div>
                          <hr></hr>
                          <div className='login-content-body-main-social-btn'>
                              <img className='social-login-btn' src={require('assets/btn/btn_google_signin.png')} onClick={this.socialLoginGoogle} />
                          </div>
                          <div className='login-content-body-main-social-btn'>
                              <img className='social-login-btn' src={require('assets/btn/btn_kakao_signin.png')} onClick={this.socialLoginKakao} />
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
  }
};

export default Login;
