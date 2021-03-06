import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import api from '../../api';


const UpcomingMovies = () => {
    const [upcomingMovies, setupcomingMovies] = useState([]);
    const upcomingMoviesuseStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            // flexDirection: 'column',
            // flexWrap: 'wrap',
            // flexBasis: 'auto',
            // overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,

        },
        gridList: {
            flexWrap: 'nowrap',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
        },
        imageCustom: {
            top: 0,
            transform: 'unset'
        },
        title: {
            color: theme.palette.primary.light,
        },
        titleBar: {
            background:
                'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        },
    }));

    useEffect(() => {
        api.getUpcomingMovies()
            .then((response) => {
                setupcomingMovies(response.data.movies);
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);
    const upcomingMoviesClass = upcomingMoviesuseStyles();
    return (
        <div className={upcomingMoviesClass.root}>
            {upcomingMovies && <GridList className={upcomingMoviesClass.gridList} cols={6} cellHeight={250}>
                {upcomingMovies.map((upcomingmovie) => (
                    <GridListTile key={upcomingmovie.id}>
                        <img className={upcomingMoviesClass.imageCustom} src={upcomingmovie.poster_url} alt={upcomingmovie.title} />
                        <GridListTileBar
                            title={upcomingmovie.title}
                            classes={{
                                root: upcomingMoviesClass.titleBar,
                                title: upcomingMoviesClass.title,
                            }}
                        />
                    </GridListTile>
                ))}
            </GridList>
            }
        </div>

    );
}
export default UpcomingMovies;