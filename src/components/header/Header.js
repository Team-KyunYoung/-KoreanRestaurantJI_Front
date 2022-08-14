import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import MediaQuery from "react-responsive";
import "./header.scss";

function toUserInfo() {
  return <Link to="/userInfo"></Link>;
}

function toCart() {
  return <Link to="/cart"></Link>;
}

function login() {
  return <Link to="/login"></Link>;
}

function logout() {
  //logout
}

const Header = () => {
  //     const isDesktopOrLaptop = useMediaQuery({
  //         query: '(min-width: 1224px)'
  //       })
  //   const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' })
  return (
    // <div className="header-container">
    //     <div className="header-content-title">
    //         <div className="header-content-title-logo">
    //             <h1 className="header-content-title-logo-h1"><Link to="/">智</Link></h1>
    //         </div>
    //     </div>
    //     <div className="header-content-nav">
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      className="header-container"
    >
      <Container>
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
              <NavDropdown.Item href="/Course">코스 요리</NavDropdown.Item>
              <NavDropdown.Item href="/SingleMenu">단품 요리</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">사이드</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="예약"
              id="collasible-nav-dropdown"
              className="p-2"
            >
              <NavDropdown.Item href="/Reservation">
                테이블 예약
              </NavDropdown.Item>
              <NavDropdown.Item href="/ReservationDetail">
                예약 현황
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="이벤트"
              id="collasible-nav-dropdown"
              className="p-2"
            >
              <NavDropdown.Item href="#action/3.1">이벤트</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2">
                멤버십 혜택
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">제휴 카드</NavDropdown.Item>
            </NavDropdown>
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
              title="고객 문의"
              id="collasible-nav-dropdown"
              className="p-2"
            >
              <NavDropdown.Item href="#action/3.1">Q&A</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">F&Q</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {/* 모니터ver */}
            <MediaQuery minWidth={993}>
              <Nav.Link href="/UserInfo" className="p-3">
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
              <Nav.Link href="/signup" className="p-3">
                로그인
              </Nav.Link>
            </MediaQuery>
            {/* 모바일ver */}
            <MediaQuery maxWidth={992}>
              <Nav.Link href="/UserInfo" className="p-2">
                프로필 관리
              </Nav.Link>
              <Nav.Link eventKey={2} href="/Cart" className="p-2 pt-3 pb-3">
                장바구니
              </Nav.Link>
              <Nav.Link href="/signup" className="p-2">
                로그인
              </Nav.Link>
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
    //     </div>
    // </div>
  );
};

export default Header;
