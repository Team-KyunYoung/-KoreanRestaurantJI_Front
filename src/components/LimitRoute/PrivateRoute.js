import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Authentication from "lib/api/Authentication";

const PrivateRoute = ({ element }) => {
    const [isLogin, setIsLogin] = useState(Authentication.isUserLoggedIn());
    return isLogin ? element : <Navigate to="/login"/>;
};

export default PrivateRoute;