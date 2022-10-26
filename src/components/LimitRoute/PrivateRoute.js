import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Authentication from "lib/api/Authentication";

const PrivateRoute = ({ element }) => {
    const [isLogin] = useState(Authentication.isUserLoggedIn());
    if(isLogin)
        return element;
    else{
        alert("로그인 후 이용 해주세요.")
        return <Navigate to="/login"/>
    }
};

export default PrivateRoute;