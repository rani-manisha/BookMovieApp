import React from "react";
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';


export default function Left(props) {

    return (
        <div style={{ 'maxWidth': '20%', 'flex': 'auto', 'justifyContent': 'center', 'paddingRight': '40px' }}>
            <Typography>
                <Link to='/'><Button style={{ textTransform: 'none' }}> &lt; Back to home </Button></Link>

            </Typography>
            <img src={props.poster} alt={props}></img>
        </div >
    );
}