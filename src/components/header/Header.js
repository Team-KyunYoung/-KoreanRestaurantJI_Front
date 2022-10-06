import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import MediaQuery from "react-responsive";
import "./header.scss";
import Authentication from "lib/api/Authentication";
import UserService from "lib/api/UserService";

const Header = () => {
  const [isOnLogin, setIsOnLogin] = useState(Authentication.isUserLoggedIn);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if(isOnLogin){
      UserService.isAdmin()
        .then((response) => {
          setIsAdmin(response.data.data);
        })
        .catch((error) => {
          setIsAdmin(false);
        });
      }
  }, []);
  function logout() {
    console.log(isOnLogin);
    console.log(localStorage.getItem("token"));
    Authentication.logout();
    setIsOnLogin(false);
  }
  return (
    <div>
      <div className="header-empty-space"></div>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        className="header-container"
      >
        <Container className="header-inner-container">
          <Navbar.Brand href="/" className="fs-3">
            智
          </Navbar.Brand>
          {/* <Link to="/">智</Link> */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown
                title="소개"
                id="collasible-nav-dropdown"
                className="p-2"
              >
                <NavDropdown.Item href="/Info">가게 소개</NavDropdown.Item>
                <NavDropdown.Item href="/Map">오시는 길</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="메뉴"
                id="collasible-nav-dropdown"
                className="p-2"
              >
                <NavDropdown.Item href="/Course">코스</NavDropdown.Item>
                <NavDropdown.Item href="/Dish">메뉴</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title="예약"
                id="collasible-nav-dropdown"
                className="p-2"
              >
                <NavDropdown.Item href="/Order">테이크 아웃</NavDropdown.Item>
                {isOnLogin && (
                  <NavDropdown.Item href="/UserInfo/ordered/blank">
                    주문 현황
                  </NavDropdown.Item>
                )}
                {!isOnLogin && (
                  <NavDropdown.Item href="/login">주문 현황</NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item href="/SelectRoom">
                  테이블 예약
                </NavDropdown.Item>
                {isOnLogin && (
                  <NavDropdown.Item href="/UserInfo/reservation/now">
                    예약 현황
                  </NavDropdown.Item>
                )}
                {!isOnLogin && (
                  <NavDropdown.Item href="/login">예약 현황</NavDropdown.Item>
                )}
              </NavDropdown>

              <MediaQuery minWidth={993}>
                <Nav.Link href="/Event" className="p-3">
                  이벤트
                </Nav.Link>
              </MediaQuery>
              <MediaQuery maxWidth={992}>
                <Nav.Link href="/Event" className="p-2">
                  이벤트
                </Nav.Link>
              </MediaQuery>
              <MediaQuery minWidth={993}>
                <Nav.Link href="/Review" className="p-3">
                  후기
                </Nav.Link>
              </MediaQuery>
              <MediaQuery maxWidth={992}>
                <Nav.Link href="/Review" className="p-2">
                  후기
                </Nav.Link>
              </MediaQuery>
              <NavDropdown
                title="문의"
                id="collasible-nav-dropdown"
                className="p-2"
              >
                <NavDropdown.Item href="/QnABoard">Q&A</NavDropdown.Item>
                <NavDropdown.Item href="/FAQBoard">FAQ</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              {/* 모니터ver */}
              <MediaQuery minWidth={993}>
                {isAdmin && (
                  <Nav.Link href="/Admin/Home" className="p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-incognito"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="m4.736 1.968-.892 3.269-.014.058C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8s7-.672 7-1.5c0-.494-1.113-.932-2.83-1.205a1.032 1.032 0 0 0-.014-.058l-.892-3.27c-.146-.533-.698-.849-1.239-.734C9.411 1.363 8.62 1.5 8 1.5c-.62 0-1.411-.136-2.025-.267-.541-.115-1.093.2-1.239.735Zm.015 3.867a.25.25 0 0 1 .274-.224c.9.092 1.91.143 2.975.143a29.58 29.58 0 0 0 2.975-.143.25.25 0 0 1 .05.498c-.918.093-1.944.145-3.025.145s-2.107-.052-3.025-.145a.25.25 0 0 1-.224-.274ZM3.5 10h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Zm-1.5.5c0-.175.03-.344.085-.5H2a.5.5 0 0 1 0-1h3.5a1.5 1.5 0 0 1 1.488 1.312 3.5 3.5 0 0 1 2.024 0A1.5 1.5 0 0 1 10.5 9H14a.5.5 0 0 1 0 1h-.085c.055.156.085.325.085.5v1a2.5 2.5 0 0 1-5 0v-.14l-.21-.07a2.5 2.5 0 0 0-1.58 0l-.21.07v.14a2.5 2.5 0 0 1-5 0v-1Zm8.5-.5h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Z"
                      />
                    </svg>
                  </Nav.Link>
                )}
                {isOnLogin && (
                  <Nav.Link href="/UserInfo/editprofile/blank" className="p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-person-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                  </Nav.Link>
                )}
                {!isOnLogin && (
                  <Nav.Link href="/login" className="p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-person-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                  </Nav.Link>
                )}

                {isOnLogin && (
                  <Nav.Link eventKey={2} href="/Cart" className="p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-cart-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                  </Nav.Link>
                )}
                {!isOnLogin && (
                  <Nav.Link eventKey={2} href="/Login" className="p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-cart-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                  </Nav.Link>
                )}
                {!isOnLogin && (
                  <Nav.Link href="/login" className="p-3">
                    로그인
                  </Nav.Link>
                )}
                {isOnLogin && (
                  <Nav.Link href="/login" onClick={logout} className="p-3">
                    로그아웃
                  </Nav.Link>
                )}
              </MediaQuery>
              {/* 태블리 + 모바일ver */}
              <MediaQuery maxWidth={992}>
                {isAdmin && (
                  <Nav.Link href="/Admin/Home" className="p-2">
                    관리자
                  </Nav.Link>
                )}
                {isOnLogin && (
                  <Nav.Link href="/UserInfo/editprofile/blank" className="p-2">
                    프로필 관리
                  </Nav.Link>
                )}
                {!isOnLogin && (
                  <Nav.Link href="/login" className="p-2">
                    프로필 관리
                  </Nav.Link>
                )}
                {isOnLogin && (
                  <Nav.Link eventKey={2} href="/Cart" className="p-2 pt-3 pb-3">
                    장바구니
                  </Nav.Link>
                )}
                {!isOnLogin && (
                  <Nav.Link
                    eventKey={2}
                    href="/Login"
                    className="p-2 pt-3 pb-3"
                  >
                    장바구니
                  </Nav.Link>
                )}
                {!isOnLogin && (
                  <Nav.Link href="/login" className="p-2">
                    로그인
                  </Nav.Link>
                )}
                {isOnLogin && (
                  <Nav.Link href="/login" onClick={logout} className="p-2">
                    로그아웃
                  </Nav.Link>
                )}
              </MediaQuery>
              <NavDropdown
                title="language"
                id="collasible-nav-dropdown"
                className="p-2 fs-10"
              >
                <NavDropdown.Item href="#action/3.1">Korean</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">English</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
