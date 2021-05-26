import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import './Details.css'

import Left from './left_details'
import Middle from './middle_details'
import Right from './right_details'


const Details = (props) => {
    const [movieDetails, setmovieDetails] = useState({});
    const movieIdDispatch = useDispatch();
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
                setmovieDetails(data);
            })
        movieIdDispatch({ "type": "SET_MOVIE_ID", payload: moviedId });
    }, [moviedId]);
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
