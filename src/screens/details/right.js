import React, { useState } from "react";
import ReactDOM from "react-dom";
import artists from './artists.json'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const useStyles = makeStyles({
    root: {
        fontWeight: "bold"
    },
    text: {
        fontWeight: "bold",
    }
});

const artistsGriduseStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 800,
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    titleBar: {
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    }
}));

export default function Left() {
    const [poster_url, setposter_url] = useState('https://m.media-amazon.com/images/M/MV5BOTk5ODg0OTU5M15BMl5BanBnXkFtZTgwMDQ3MDY3NjM@._V1_UY209_CR0,0,140,209_AL_.jpg');
    const style = useStyles();
    const artistsGridClass = artistsGriduseStyles();
    const [critics_rating, setcritics_rating] = useState('0');
    const [artists, setartists] = useState('Leonardo Dicaprio');
    const [first_name, setfirst_name] = useState('Leonardo');
    const [last_name, setlast_name] = useState('DeCaprio');
    const [poster_picture_url, setposter_picture_url] = useState('https://m.media-amazon.com/images/M/MV5BMjI0MTg3MzI0M15BMl5BanBnXkFtZTcwMzQyODU2Mw@@._V1_UY1200_CR130,0,630,1200_AL_.jpg');
    return (

        <div style={{ 'width': '15%' }}>
            <div className={style.root}>
                <Typography variant='h6' >Rate this movie</Typography>

                <Rating
                    name="simple-controlled"
                    value={critics_rating}
                    onChange={(event, newValue) => {
                        setcritics_rating(newValue);
                    }}
                />

                <Typography variant='h6' style={{ 'margin-top': '16px', 'margin-bottom': '16px' }}>Artists: </Typography>

                {/* <GridList spacing={1} className={artistsGridClass.gridList} cols={2}>
                    {artists.map((artist) => (
                        <GridListTile key={artist.id} cellHeight={350} cols={2}>
                            < img src={artist.poster_picture_url} alt={artist.first_name} />
                            <GridListTileBar
                                title={artist.first_name}
                                titlePosition="bottom"
                                className={artistsGridClass.titleBar}
                            />
                        </GridListTile>
                    ))}
                </GridList> */}

            </div>

        </div>
    );
}