import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader } from "@material-ui/core";
import { FormControl, TextField, InputLabel, Input, Button, Select, MenuItem, Checkbox, ListItemText } from '@material-ui/core';
import { useDispatch } from "react-redux";
import api from '../../api';

const carduseStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(0),
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

const MovieFilter = () => {
    const cardClass = carduseStyles();
    const [inputmoviename, setinputmoviename] = useState([]);
    const [selectedGenre, setselectedGenre] = useState([]);
    const [selectedArtist, setselectedArtist] = useState([]);
    const [releaseDateStart, setreleaseDateStart] = useState("");
    const [releaseDateEnd, setreleaseDateEnd] = useState([]);
    const [listedGenres, setlistedGenres] = useState([]);
    const [listedArtists, setlistedArtists] = useState([]);

    const releasedMovieDispatch = useDispatch();

    useEffect(() => {
        // fetch artists in the filter
        api.getArtists()
            .then((response) => {
                let localArtists = response.data.artists;
                let result = localArtists.map(a => a.first_name + " " + a.last_name);
                setlistedArtists(result);
            })
            .catch((error) => {
            })
        //fetch genres in the filter   
        api.getGenres()
            .then((response) => {
                let localselectedGenre = response.data.genres;
                let result = localselectedGenre.map(a => a.genre);
                setlistedGenres(result);
            })
            .catch((error) => {
            })
    }, [])
    const handleselectedGenreChange = (event) => {
        setselectedGenre(event.target.value);
    };
    const handleselectedArtistChange = (event) => {
        setselectedArtist(event.target.value);
    };

    const handlereleaseDateStart = (event) => {
        setreleaseDateStart(event.target.value);
    };
    const handlereleaseDateEnd = (event) => {
        setreleaseDateEnd(event.target.value);
    };
    const applyFilter = (event) => {
        let selectedArtistStr = "";
        let selectedGenreStr = "";
        if (selectedArtist.length > 0) {
            selectedArtistStr = selectedArtist.join(",");
        }
        if (selectedGenre.length > 0) {
            selectedGenreStr = selectedGenre.join(",");
        }

        api.getFilteredMovies(inputmoviename, selectedArtistStr, selectedGenreStr, releaseDateStart, releaseDateEnd)
            .then((response) => {
                releasedMovieDispatch({ "type": "SET_RELEASED_MOVIES", payload: response.data.movies });;
            })
            .catch((error) => {
            })
    }
    return (
        <div >
            <Card className={cardClass.root}>

                <CardHeader className={cardClass.header} title='FIND MOVIES BY:' ></CardHeader>

                <CardContent className={cardClass.root}>
                    <FormControl className={cardClass.formControl}>
                        <InputLabel htmlFor="movie_name" >Movie Name</InputLabel>
                        <Input id="movie_name" name='selectedmovie' value={inputmoviename} onChange={(e) => setinputmoviename(e.target.value)} />
                    </FormControl>
                    <br></br>
                    <br></br>

                    <FormControl className={cardClass.formControl}>
                        <InputLabel id="genres-label">Genre</InputLabel>
                        <Select
                            labelId="genres-label"
                            id="genres"
                            multiple
                            value={selectedGenre}
                            onChange={handleselectedGenreChange}
                            input={<Input />}
                            renderValue={(selected) => selected.join(', ')}
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
                        <InputLabel id="artists-label">Artist</InputLabel>
                        <Select
                            labelId="artists-label"
                            id="artists"
                            multiple
                            value={selectedArtist}
                            onChange={handleselectedArtistChange}
                            input={<Input />}
                            renderValue={(selected) => selected.join(', ')}
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
                            value={releaseDateStart}
                            className={cardClass.textField}
                            onChange={handlereleaseDateStart}
                            name={"Release-Date-Start"}
                            format={'yyyy-mm-dd'}
                            InputLabelProps={{
                                shrink: true
                            }} />
                    </FormControl>
                    <br></br>
                    <br></br>

                    <FormControl className={cardClass.formControl}>
                        <TextField
                            id="Release-Date-End"
                            label="Release Date End"
                            type="date"
                            className={cardClass.textField}
                            onChange={handlereleaseDateEnd}
                            value={releaseDateEnd}
                            name={"Release-Date-End"}
                            format={'yyyy-mm-dd'}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Button variant="contained" color="primary" onClick={applyFilter}>
                        APPLY
                        </Button>
                </CardContent>
            </Card>
        </div>
    );
}


export default MovieFilter;