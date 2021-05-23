import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./Home.css";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import { Autorenew, NearMe } from "@material-ui/icons";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue } from "@material-ui/core/colors";
import { FormControl, TextField, InputLabel, Input, Button, useRadioGroup, Select, MenuItem, Checkbox, Chip, ListItemText, MenuProps } from '@material-ui/core';

const upcomingMoviesGriduseStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        flexBasis: 'auto',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,

    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));


const moviesGriduseStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        maxWidth: '76%',

    },
    gridList: {
        width: 800,
        //height: 450,
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    titleBar: {
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        color: 'white',
    },

}));

const carduseStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing.unit,
        maxWidth: '24%'
    },
    header: {
        color: theme.palette.primary.light,
        fontSize: 5
    },
    formControl: {
        minWidth: 240,
        maxWidth: 240
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200
    },

}));

const Home = () => {
    const upcomingMoviesGridClass = upcomingMoviesGriduseStyles();
    const moviesGridClass = moviesGriduseStyles();
    const cardClass = carduseStyles();
    const [name, setname] = React.useState([]);
    const [selectedGenre, setselectedGenre] = React.useState([]);
    const [first_name, setfirst_name] = React.useState([]);
    const [last_name, setlast_name] = React.useState([]);
    const [selectedArtist, setselectedArtist] = React.useState([]);
    const [releaseDateStart, setreleaseDateStart] = React.useState([]);
    const [releaseDateEnd, setreleaseDateEnd] = React.useState([]);
    const [upcomingMovies, setupcomingMovies] = React.useState([]);
    const [bookingMovies, setbookingMovies] = React.useState([]);
    const [listedGenres, setlistedGenres] = React.useState([]);
    const [listedArtists, setlistedArtists] = React.useState([]);
    const [inputmoviename, setinputmoviename] = React.useState([]);
    useEffect(() => {
        fetch('http://localhost:8085/api/v1/movies', {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
        }).then(response => response.json())
            .then(data => {
                setupcomingMovies(data.movies);
                setbookingMovies(data.movies);
            });
        fetch('http://localhost:8085/api/v1/artists', {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            }
        }).then(response => response.json())
            .then(data => {
                let localArtists = data.artists;
                let result = localArtists.map(a => a.first_name + " " + a.last_name);
                setlistedArtists(result);
            });
        fetch('http://localhost:8085/api/v1/genres', {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            }
        }).then(response => response.json())
            .then(data => {
                let localselectedGenre = data.genres;
                let result = localselectedGenre.map(a => a.genre);
                setlistedGenres(result);
            })
    }, [])
    const handleselectedGenreChange = (event) => {
        setselectedGenre(event.target.value);
    };
    const handleselectedArtistChange = (event) => {
        setselectedArtist(event.target.value);
        // setfirst_name(event.target.value);
        // setlast_name(event.target.value);
    };

    const handlereleaseDateStart = (date) => {
        setreleaseDateStart(date);
    };
    const handlereleaseDateEnd = (date) => {
        setreleaseDateEnd(date);
    };
    const applyFilter = () => {
        let selectedArtistStr = "";
        let selectedGenreStr = "";
        if (selectedArtist.length > 0) {
            selectedArtistStr = selectedArtist.join(",");
        }
        if (selectedGenre.length > 0) {
            selectedGenreStr = selectedGenre.join(",");
        }
        console.log(inputmoviename);
        console.log(selectedGenreStr);
        console.log(selectedArtistStr);
        let query = "ttile={inputmoviename}";
        fetch(`http://localhost:8085/api/v1/movies?title=${encodeURIComponent(inputmoviename)}&artists=${encodeURIComponent(selectedArtistStr)}&genre=${encodeURIComponent(selectedGenreStr)}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                setbookingMovies(data.movies);
            })
    }
    function handleOnclickMoviedetails(moviID) {
        console.log(moviID);
        //redirect details/id
        //https://reactrouter.com/web/api/Link wrap card in link
    };
    return (
        <div>
            <h1 className='homepageheader'>Upcoming movies</h1>
            <div className={upcomingMoviesGridClass.root}>
                {upcomingMovies && <GridList className={upcomingMoviesGridClass.gridList} cols={6} cellHeight={250}>
                    {upcomingMovies.map((tile) => (
                        <GridListTile key={tile.id}>
                            <img src={tile.poster_url} alt={tile.title} />
                            <GridListTileBar
                                title={tile.title}
                                classes={{
                                    root: upcomingMoviesGridClass.titleBar,
                                    title: upcomingMoviesGridClass.title,
                                }}
                            />
                        </GridListTile>
                    ))}
                </GridList>
                }
            </div>

            <div className='flex-container'>
                {/* movies component */}
                <div className={moviesGridClass.root}>
                    {bookingMovies &&
                        <GridList spacing={1} className={moviesGridClass.gridList} cols={4}>
                            {bookingMovies.map((tile) => (
                                <GridListTile key={tile.id} cellHeight={550} cols={tile.featured ? 4 : 1} onClick={() => handleOnclickMoviedetails(tile.id)}>
                                    {/* {tile.featured ? 4 : 1} rows={tile.featured ? 4 : 1 */}
                                    < img src={tile.poster_url} alt={tile.title} />
                                    <GridListTileBar
                                        title={tile.title}
                                        titlePosition="bottom"
                                        subtitle={'Release date: ' + tile.release_date}

                                        actionIcon={
                                            <IconButton aria-label={`star ${tile.title}`} className={moviesGridClass.icon}>
                                                <StarBorderIcon />
                                            </IconButton>
                                        }
                                        actionPosition="left"
                                        className={moviesGridClass.titleBar}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    }
                </div>

                {/* making the card component*/}

                <Card className={cardClass.root}>
                    {/* <ThemeProvider theme={cardtheme}> */}
                    <CardHeader className={cardClass.header} title='FIND MOVIES BY:' ></CardHeader>
                    {/* </ThemeProvider> */}
                    <CardContent className={cardClass.root}>
                        <FormControl className={cardClass.formControl}>
                            <InputLabel htmlFor="my-input1" >Movie Name</InputLabel>
                            <Input id="my-input1" aria-describedby="my-helper-text1" name='selectedmovie' value={inputmoviename} onChange={(e) => setinputmoviename(e.target.value)} />
                        </FormControl>

                        <br></br>
                        <br></br>
                        <FormControl className={cardClass.formControl}>
                            <InputLabel id="demo-mutiple-checkbox-label">Genre</InputLabel>
                            <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                multiple
                                value={selectedGenre}
                                onChange={handleselectedGenreChange}
                                input={<Input />}
                                renderValue={(selected) => selected.join(', ')}
                            // MenuProps={MenuProps}
                            >
                                {listedGenres.map((selectedGenrename) => (
                                    <MenuItem key={selectedGenrename} value={selectedGenrename}>
                                        <Checkbox checked={selectedGenre.indexOf(selectedGenrename) > -1} />
                                        <ListItemText primary={selectedGenrename} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <br></br>
                        <br></br>
                        <FormControl className={cardClass.formControl} >
                            <InputLabel id="demo-mutiple-checkbox-label">Artist</InputLabel>
                            <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                multiple
                                value={selectedArtist}
                                onChange={handleselectedArtistChange}
                                input={<Input />}
                                renderValue={(selected) => selected.join(', ')}
                            // MenuProps={MenuProps}
                            >
                                {listedArtists.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={selectedArtist.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <br></br>
                        <br></br>
                        <FormControl className={cardClass.formControl}>
                            <TextField
                                id="Release-Date-Start"
                                label="Release Date Start"
                                type="date"
                                defaultValue="dd-mm-yyyy"
                                className={cardClass.textField}
                                onChange={handlereleaseDateStart}
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </FormControl>
                        <br></br>
                        <br></br>
                        <FormControl className={cardClass.formControl}>
                            <TextField
                                id="Release-Date-End"
                                label="Release Date End"
                                type="date"
                                defaultValue="dd-mm-yyyy"
                                className={cardClass.textField}
                                onChange={handlereleaseDateEnd}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                        <br></br>
                        <br></br>
                        <br></br>
                        <Button className='cardClass.button' variant="contained" color="primary" onClick={applyFilter}>
                            APPLY
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}


export default Home;