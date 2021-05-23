import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import ReactDOM from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';


export default function Left(props) {

    return (
        <div style={{ 'width': '15%' }}>
            <Typography>
                {/* <Button component={Link} to="/home" >Back to Home</Button> */}
                <Link to='/'><Button style={{ textTransform: 'none' }}> &lt; Back to home </Button></Link>

            </Typography>
            <img src={props.poster}></img>
        </div >
    );
}