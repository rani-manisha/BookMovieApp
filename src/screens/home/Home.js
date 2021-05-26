import React, { } from "react";
import "./Home.css";
import UpcomingMovies from './upcomingMovies';
import ReleasedMovies from './releasedMovies';
import MovieFilter from './movieFilter';


const Home = () => {
    return (
        <div>
            <h1 className='homepageheader'>Upcoming movies</h1>
            <UpcomingMovies />
            <div className='flex-container'>
                <ReleasedMovies className='releasedMovieContainer' />
                <MovieFilter className='releasedMovieFilterContainer' />
            </div>
        </div>
    );
}


export default Home;