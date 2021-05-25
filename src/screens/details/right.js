import React, { useState, useEffect } from "react";
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
        justifyContent: 'space-around',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    titleBar: {
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    }
}));

export default function Right(props) {
    let movieId = props.movieData.id;
    const style = useStyles();
    const artistsGridClass = artistsGriduseStyles();
    const [critics_rating, setcritics_rating] = useState('0');
    const [artists, setartists] = useState([]);
    useEffect(() => {
        console.log("HI");
        console.log(props.movieData.artists);
        setartists(props.movieData.artists);
    }, [movieId]);
    return (
        <div style={{ 'max-width': '15%', 'flex': 'auto', 'justify-content': 'center', 'padding-left': '40px', 'margin': '10px' }}>
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
                <div>
                    {artists &&
                        < GridList spacing={1} className={artistsGridClass.gridList} cellWidth={100} cols={2}>
                            {artists.map((artist) => (
                                <GridListTile key={artist.id} >
                                    {/* cols={artist.cols || 1 */}
                                    < img src={artist.profile_url} alt={artist.first_name + " " + artist.last_name} />
                                    <GridListTileBar
                                        title={artist.first_name + " " + artist.last_name}
                                        titlePosition="bottom"
                                        className={artistsGridClass.titleBar}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    }
                </div>

            </div>

        </div >
    );
}