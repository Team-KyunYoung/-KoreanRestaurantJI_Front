import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.scss';
import Home from './containers/HomePage/Home';
import Menu from './containers/MenuPage/Menu';
import Login from './containers/LoginPage/Login';
import Login2 from './containers/LoginPage/Login2';
import Signup from './containers/SignupPage/Signup';
import Cart from './containers/CartPage/Cart';
import Chat from './containers/ChatPage/Chat';
import Course from './containers/CoursePage/Course';
import Map from './containers/MapPage/Map';
import Order from './containers/OrderPage/Order';
import ReservationDetail from './containers/ReservationDetailPage/ReservationDetail';
import Reservation from './containers/ReservationPage/Reservation';
import Review from './containers/ReviewPage/Review';
import SingleMenu from './containers/SingleMenuPage/SingleMenu';
import UserInfo from './containers/UserInfoPage/UserInfo';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';//부트스트랩 : 삭제 금지

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="Menu" element={<Menu />} />
      <Route path="Login" element={<Login />} />
      <Route path="Login2" element={<Login2 />} />
      <Route path="Signup" element={<Signup />} />
      <Route path="Cart" element={<Cart />} />
      <Route path="Chat" element={<Chat />} />
      <Route path="Course" element={<Course />} />
      <Route path="Map" element={<Map />} /> 
      <Route path="Order" element={<Order />} />
      <Route path="ReservationDetail" element={<ReservationDetail />} />
      <Route path="Reservation" element={<Reservation />} />
      <Route path="Review" element={<Review />} />
      <Route path="SingleMenu" element={<SingleMenu />} />
      <Route path="UserInfo" element={<UserInfo />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
