import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Authentication from "lib/api/Authentication";
import UserService from 'lib/api/UserService';

const AdminRoute = ({ element }) => {
    console.log(element)
    const [isAdmin, setIsAdmin] = useState(false);
    if(Authentication.isUserLoggedIn()){
        UserService.isAdmin()
        .then((response) => {
            setIsAdmin(response.data.data);
            return isAdmin ? element : <Navigate to="/login"/>;
        })
        .catch((error) => {
            console.log(error);
        });
    } else {
        return <Navigate to="/login"/>;
    }
};

export default AdminRoute;