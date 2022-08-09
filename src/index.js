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
import FindPassword from './containers/LoginPage/FindPassword';
import Signup from './containers/SignupPage/Signup';
import Info from './containers/InfoPage/Info';
import Map from './containers/MapPage/Map';
import Cart from './containers/CartPage/Cart';
import Chat from './containers/ChatPage/Chat';
import Course from './containers/CoursePage/Course';
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
      <Route path="FindPassword" element={<FindPassword />} />
      <Route path="Signup" element={<Signup />} />
      <Route path="Info" element={<Info />} />
      <Route path="Map" element={<Map />} /> 
      <Route path="Cart" element={<Cart />} />
      <Route path="Chat" element={<Chat />} />
      <Route path="Course" element={<Course />} />
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
