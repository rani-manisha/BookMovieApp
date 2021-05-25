import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Link } from "react-router-dom";
import Details from '../details/Details';
import { useDispatch, useSelector } from "react-redux";

const releasedMoviesuseStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        maxWidth: '76%',

    },
    gridList: {


        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    titleBar: {
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },

}));

const ReleasedMovies = () => {
    const releasedMoviesClass = releasedMoviesuseStyles();
    //const [bookingMovies, setbookingMovies] = useState([]);
    const releasedMovieDispatch = useDispatch();
    const unsetMovieID = useDispatch();
    const movieIdDispatch = useDispatch();
    const releasedMovies = useSelector(state => state.releasedMovies);
    useEffect(() => {
        fetch('http://localhost:8085/api/v1/movies?status=RELEASED', {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
        }).then(response => response.json())
            .then(data => {
                releasedMovieDispatch({ "type": "SET_RELEASED_MOVIES", payload: data.movies });
                unsetMovieID({ "type": "UNSET_MOVIE_ID", payaload: "" });
                //setbookingMovies(data.movies);
            });
    }, []);

    const handleOnclickMoviedetails = (moviID) => {
        movieIdDispatch({ "type": "SET_MOVIE_ID", payload: moviID });
        // return (
        //     <div>
        //         <Details />
        //     </div>
        // )
    };

    return (
        <div className={releasedMoviesClass.root}>
            {releasedMovies &&
                <GridList spacing={1} cols={4} className={releasedMoviesClass.gridList} cellHeight={350} style={{ height: 'auto' }}>
                    {releasedMovies.map((tile) => (
                        <Link to={`/movie/${tile.id}`}>
                            <GridListTile key={tile.id} onClick={() => handleOnclickMoviedetails(tile.id)}>
                                {/*{tile.featured ? 4 : 1} rows={tile.featured ? 4 : 1 */}
                                < img src={tile.poster_url} alt={tile.title} />
                                <GridListTileBar
                                    title={tile.title}
                                    titlePosition="bottom"
                                    subtitle={'Release date: ' + tile.release_date}
                                    className={releasedMoviesClass.titleBar}
                                />
                            </GridListTile>
                        </Link>
                    ))}
                </GridList>
            }
        </div>
    );
}
export default ReleasedMovies;
