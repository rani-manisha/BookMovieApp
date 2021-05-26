import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from '../../api';
import { UnsubscribeTwoTone } from "@material-ui/icons";

const releasedMoviesuseStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        width: '100%',
        backgroundColor: theme.palette.background.paper,

    },
    gridList: {
        overflow: UnsubscribeTwoTone,
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        width: '100%'
    },
    imageClass: {
        height: '350px',
        top: 0,
        transform: 'unset',
        width: '280px'
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
        api.getReleasedMovies()
            .then((response) => {
                releasedMovieDispatch({ "type": "SET_RELEASED_MOVIES", payload: response.data.movies });
                unsetMovieID({ "type": "UNSET_MOVIE_ID", payaload: "" });
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);

    const handleOnclickMoviedetails = (moviID) => {
        movieIdDispatch({ "type": "SET_MOVIE_ID", payload: moviID });
    };

    return (
        <div className={releasedMoviesClass.root}>
            {releasedMovies &&
                <GridList spacing={1} cols={4} className={releasedMoviesClass.gridList} cellHeight={350}>
                    {releasedMovies.map((tile) => (
                        <Link to={`/movie/${tile.id}`} key={tile.id}>
                            <GridListTile key={tile.id} onClick={() => handleOnclickMoviedetails(tile.id)}>
                                {/*{tile.featured ? 4 : 1} rows={tile.featured ? 4 : 1 */}
                                < img className={releasedMoviesClass.imageClass} src={tile.poster_url} alt={tile.title} />
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
