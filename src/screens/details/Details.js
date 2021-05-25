import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import './Details.css'

import Left from './left'
import Middle from './middle'
import Right from './right'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const Details = (props) => {
    const [movieDetails, setmovieDetails] = useState({});
    let moviedId = props.match.params.id;
    useEffect(() => {
        fetch(`http://localhost:8085/api/v1/movies/${encodeURIComponent(moviedId)}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                setmovieDetails(data);
            })
        console.log(movieDetails.poster_url);
    }, [moviedId]);
    console.log(movieDetails);
    return (
        <div>
            <div className='flex-container'>

                <Left poster={movieDetails.poster_url} />
                <Middle movieData={movieDetails} />
                <Right movieData={movieDetails} />
            </div>
        </div >
    );
}
export default Details;
