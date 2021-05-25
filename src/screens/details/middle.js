import React, { useState } from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import YouTube from 'react-youtube';
import { propTypes } from "react-bootstrap/esm/Image";

const useStyles = makeStyles({

    root: {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        justifyContent: 'space-around',
        fontWeight: "bold",
        maxWidth: '70%',

    },

});



export default function Middle(props) {
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    function onReady_(e) {
        // access to player in all event handlers via event.target
        e.target.pauseVideo();
    }
    const useStyleClass = useStyles();
    return (
        <div className='useStyleClass.root' style={{ 'padding': '30' }}>
            <Typography variant='h2'>{props.movieData.title}</Typography>
            <br></br>
            <div>
                <Typography variant='body2'><strong>Genre:</strong> {props.movieData.genres}</Typography>
                <Typography variant='body2'><strong>Duration:</strong> {props.movieData.duration}</Typography>
                <Typography variant='body2'><strong>Release Date:</strong> {props.movieData.release_date}</Typography>
                <Typography variant='body2'><strong>Rating:</strong> {props.movieData.rating}</Typography>
                <Typography variant='body2' style={{ 'margin-top': '16px', 'margin-bottom': '16px' }}><strong>Plot:</strong> <a href={props.movieData.wiki_url}>(Wiki Link) </a>{props.movieData.storyline}</Typography>
                <Typography variant='body2'><strong>Trailor:</strong> </Typography>

                <YouTube videoId="https://www.youtube.com/embed/De85YRz8B_g" opts={opts} onReady={onReady_} />;
            </div>
        </div >
    );

}