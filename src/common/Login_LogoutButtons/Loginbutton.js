import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./Buttons.css";
import { Button } from '@material-ui/core';
import LoginPage from "../Login_Register/LoginPage";

const LoginButton = function (props) {
    return (
        <div>
            <Button className="loginbuttonclass" variant="contained"
                color="default" onClick={props.loginfunction}>
                Login
            </Button>

        </div >
    );
}
export default LoginButton;