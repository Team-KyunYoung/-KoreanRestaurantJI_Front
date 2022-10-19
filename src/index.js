import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Modal from "react-modal";
import "./index.scss";

import PublicRoute from "components/LimitRoute/PublicRoute";
import PrivateRoute from "components/LimitRoute/PrivateRoute";
import AdminRoute from "components/LimitRoute/AdminRoute";

import Home from "containers/HomePage/Home";
import Login from "containers/LoginPage/Login";
import FindPassword from "containers/LoginPage/FindPassword";
import Signup from "containers/SignupPage/Signup";
import Info from "containers/InfoPage/Info";
import Map from "containers/MapPage/Map";
import Cart from "containers/CartPage/Cart";
import Course from "containers/CoursePage/Course";
import Order from "containers/OrderPage/Order";
import SelectRoom from "containers/BookingPage/SelectRoom";
import SelectMore from "containers/BookingPage/SelectMore";
import Review from "containers/ReviewPage/Review";
import Dish from "containers/DishPage/Dish";
import DishDetails from "containers/DishPage/DishDetails";
import UserInfo from "containers/UserInfoPage/UserInfo";
import FAQBoard from "containers/CustomerServicePage/FAQBoard";
import CreateFAQ from "containers/CustomerServicePage/CreateFAQ";
import QnABoard from "containers/CustomerServicePage/QnABoard";
import QnAPost from "containers/CustomerServicePage/QnAPost";
import CreateQnA from "containers/CustomerServicePage/CreateQnA";
import EventBoard from "containers/EventPage/EventBoard";
import EventPost from "containers/EventPage/EventPost";
import CreateEvent from "containers/EventPage/CreateEvent";
import reportWebVitals from "reportWebVitals";
import AdminHome from "containers/AdminPage/Home";
import DishSetting from "containers/AdminPage/DishSetting";
import CourseSetting from "containers/AdminPage/CourseSetting";
import RoomSetting from "containers/AdminPage/RoomSetting";
import ReservationSetting from "containers/AdminPage/ReservationSetting";
import OrderSetting from "containers/AdminPage/OrderSetting";
import NotFound from "containers/NotFoundPage/NotFound";
import "bootstrap/dist/css/bootstrap.css"; //부트스트랩 : 삭제 금지

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="Login" element={<PublicRoute element={<Login />}/>} />
      <Route path="FindPassword" element={<PublicRoute element={<FindPassword />}/>} />
      <Route path="Signup" element={<PublicRoute element={<Signup />}/>} />
      <Route path="Info" element={<Info />} />
      <Route path="Map" element={<Map />} />
      <Route path="Cart" element={<PrivateRoute element={<Cart />}/>} />
      <Route path="Course" element={<Course />} />
      <Route path="Order" element={<Order />} />
      <Route path="SelectRoom" element={<SelectRoom />} />
      <Route path="SelectMore/:roomNumber/:roomName" element={<PrivateRoute element={<SelectMore />}/>} />
      <Route path="Review" element={<Review />} />
      <Route path="Dish" element={<Dish />} />
      <Route path="Dish/:dishNumber/:dishName" element={<DishDetails />} />
      <Route path="UserInfo/:location/:mode" element={<PrivateRoute element={<UserInfo />}/>} />
      <Route path="FAQBoard" element={<FAQBoard />} />
      <Route path="FAQBoard/:mode/:number" element={<CreateFAQ />} />
      <Route path="QnABoard" element={<QnABoard />} />
      <Route path="QnABoard/:number/:isPrivate" element={<QnAPost />} />
      <Route path="CreateQnA" element={<PrivateRoute element={<CreateQnA />}/>} />
      <Route path="Event" element={<EventBoard />} />
      <Route path="Event/:mode/:number" element={<CreateEvent />} />
      <Route path="Event/Post/:number" element={<EventPost />} />
      <Route path="Admin/Home" element={<AdminRoute element={<AdminHome />}/>} />
      <Route path="Admin/DishSetting" element={<AdminRoute element={<DishSetting />}/>} />
      <Route path="Admin/CourseSetting" element={<AdminRoute element={<CourseSetting />}/>} />
      <Route path="Admin/RoomSetting" element={<AdminRoute element={<RoomSetting />}/>} />
      <Route path="Admin/ReservationSetting" element={<AdminRoute element={<ReservationSetting />}/>} />
      <Route path="Admin/OrderSetting" element={<AdminRoute element={<OrderSetting />}/>} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
Modal.setAppElement("#root");
