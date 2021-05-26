import React from "react";
import "./Buttons.css";
import { Button } from '@material-ui/core';

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