import React, { useState } from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import YouTube from 'react-youtube';

const useStyles = makeStyles({
    root: {
        fontWeight: "bold",
        maxWidth: '70%'
    }
});


export default function Middle() {
    const style = useStyles();
    const [title, settitle] = useState('Inception');
    const [genres, setgenres] = useState('Action, Adventure');
    const [duration, setduration] = useState('02:20:00');
    const [release_date, setrelease_date] = useState('2-Aug-2012');
    const [critics_rating, setcritics_rating] = useState('5');
    const [story_line, setstory_line] = useState('its based on time bending blah blah');
    const [wiki_link, setwiki_link] = useState('https://en.wikipedia.org/wiki/Inception');
    const [trailor_url, settrailor_url] = useState('https://www.youtube.com/watch?v=5EiV_HXIIGs');
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
        <div>
            <Typography variant='h2'>{title}</Typography>
            <br></br>
            <div>
                <Typography variant='body2'><strong>Genre:</strong> {genres}</Typography>
                <Typography variant='body2'><strong>Duration:</strong> {duration}</Typography>
                <Typography variant='body2'><strong>Release Date:</strong> {release_date}</Typography>
                <Typography variant='body2'><strong>Rating:</strong> {critics_rating}</Typography>
                <Typography variant='body2' style={{ 'margin-top': '16px', 'margin-bottom': '16px' }}><strong>Plot:</strong> <a href={wiki_link}>(Wiki Link) </a>{story_line}</Typography>
                <Typography variant='body2'><strong>Trailor:</strong> </Typography>

                <YouTube videoId={trailor_url} opts={opts} onReady={onReady_} />;
            </div>
        </div >
    );

}