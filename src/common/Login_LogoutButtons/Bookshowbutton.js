import React from "react";
import ReactDOM from "react-dom";
import "./Buttons.css";
import { Button } from '@material-ui/core';

const BookShowButton = function () {
    return (
        <div>
            <Button className="bookshowbuttonclass" variant="contained" color="primary">Book Show</Button>
        </div>
    );
}
export default BookShowButton;