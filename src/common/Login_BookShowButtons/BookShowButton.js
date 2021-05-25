import React from "react";
import ReactDOM from "react-dom";
import "./Buttons.css";
import { Button } from '@material-ui/core';

const BookShowButton = function (props) {

    return (
        <div className='header-buttons-container'>
            <Button className="bookShowButtonClass" variant="contained" color="primary"
                onClick={props.handleBookShow}>
                Book Show
            </Button>
        </div>
        // <Button className="loginbuttonclass" variant="contained"
        // color="default" onClick={props.loginfunction}>
        // {props.authTokenSet ? "Logout" : "Login"}
    );
}
export default BookShowButton;