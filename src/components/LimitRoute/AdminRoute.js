import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Authentication from "lib/api/Authentication";
import UserService from 'lib/api/UserService';


const AdminRoute = ({ element }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isloading, setIsLoading] = useState(false);
    if(Authentication.isUserLoggedIn()){
        UserService.isAdmin()
        .then((response) => {
            setIsAdmin(response.data.data)
            setIsLoading(true)
        })
        .catch((error) => {
            console.log(error);
        });
        
        if(isloading){
            if(isAdmin)
                return element;
            else{
                alert("접근 권한이 없는 사용자입니다.");
                return <Navigate to="/"/>;
            }
        }
    } else {
        alert("로그인 후 이용 해주세요.");
        return <Navigate to="/login"/>;
    }
};

export default AdminRoute;