import React from "react";
import "./Buttons.css";
import { Button } from '@material-ui/core';

const BookShowButton = function (props) {

    return (
        <div className='header-buttons-container'>
            <Button className="bookShowButtonClass" variant="contained" color="primary"
            // onClick={props.handleBookShow}
            >
                Book Show
            </Button>
        </div>
    );
}
export default BookShowButton;