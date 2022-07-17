import React from 'react';
import { Link } from 'react-router-dom';

import './header.scss'

function toUserInfo(){
    return <Link to="/userInfo"></Link>
}

function toCart(){
    return <Link to="/cart"></Link>
}

function login(){
    return <Link to="/login"></Link>
}

function logout(){
    //logout
}

const Header = () => {
    return (
        <div className="header-container">
            <div className="header-content-title">
                <div className="header-content-title-logo">
                    <h1 className="header-content-title-logo-h1"><Link to="/">智</Link></h1>
                </div>
            </div>
        </div>
    );
};

export default Header;