import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Authentication from "lib/api/Authentication";

const PublicRoute = ({element}) => {
    const [isLogin] = useState(Authentication.isUserLoggedIn());
    return isLogin ? <Navigate to="/"/> : element;
};

export default PublicRoute;