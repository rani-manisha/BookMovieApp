import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./Buttons.css";
import { Button, ButtonBase } from '@material-ui/core';
import LoginPage from "../Login_Register/LoginPage";

const LoginButton = function (props) {
    return (
        <div className='header-buttons-container'>
            <Button className="loginButtonClass" variant="contained"
                color="default" onClick={props.loginfunction}>
                {props.authTokenSet ? "Logout" : "Login"}
            </Button>

        </div >
    );
}
export default LoginButton;