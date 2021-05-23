import React, { useState } from "react";
import ReactDOM from "react-dom";
import './Details.css'

import Left from './left'
import Middle from './middle'
import Right from './right'
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';



const Details = () => {
    const [poster_url, setposter_url] = useState('https://m.media-amazon.com/images/M/MV5BOTk5ODg0OTU5M15BMl5BanBnXkFtZTgwMDQ3MDY3NjM@._V1_UY209_CR0,0,140,209_AL_.jpg');
    //let { id } = useParams();
    //useeffect fn to fetch api data
    return (
        <div>
            <div className='flex-container'>
                <Left />
                <Middle />
                <Right />
            </div>
        </div >
    );
}
export default Details;
