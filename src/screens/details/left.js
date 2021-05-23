import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import ReactDOM from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';


export default function Left() {
    const [poster_url, setposter_url] = useState('https://m.media-amazon.com/images/M/MV5BOTk5ODg0OTU5M15BMl5BanBnXkFtZTgwMDQ3MDY3NjM@._V1_UY209_CR0,0,140,209_AL_.jpg');
    return (
        <div style={{ 'width': '15%' }}>
            <Typography>
                {/* <Button component={Link} to="/home" >Back to Home</Button> */}
                <Link to='/home'><Button style={{ textTransform: 'none' }}> &lt; Back to home </Button></Link>

            </Typography>
            <img src={poster_url}></img>
        </div >
    );
}