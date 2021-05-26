import React from "react";
import Typography from '@material-ui/core/Typography';
import YouTube from 'react-youtube';

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
    return (
        <div className='useStyleClass.root' style={{ 'padding': '30', 'maxWidth': '60%' }}>
            <Typography variant='h2'>{props.movieData.title}</Typography>
            <br></br>
            <div>
                {props.movieData.genres && <Typography variant='body2'><strong>Genre:</strong> {props.movieData.genres.join(", ")}</Typography>}
                <Typography variant='body2'><strong>Duration:</strong> {props.movieData.duration}</Typography>
                <Typography variant='body2'><strong>Release Date:</strong> {props.movieData.release_date}</Typography>
                <Typography variant='body2'><strong>Rating:</strong> {props.movieData.rating}</Typography>
                <Typography variant='body2' style={{ 'marginTop': '16px', 'marginBottom': '16px' }}><strong>Plot:</strong> <a href={props.movieData.wiki_url}>(Wiki Link) </a>{props.movieData.storyline}</Typography>
                <Typography variant='body2'><strong>Trailor:</strong> </Typography>

                {props.movieData.trailer_url && <YouTube videoId={props.movieData.trailer_url.split('=')[1]} opts={opts} onReady={onReady_} />};
            </div>
        </div >
    );

}