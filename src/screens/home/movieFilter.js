import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader } from "@material-ui/core";
import { FormControl, TextField, InputLabel, Input, Button, Select, MenuItem, Checkbox, ListItemText, MenuProps } from '@material-ui/core';
import ReleasedMovies from './releasedMovies';
import { useDispatch } from "react-redux";

const carduseStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing.unit,
        // maxWidth: '24%'
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
    const [name, setname] = useState([]);
    const [selectedGenre, setselectedGenre] = useState([]);
    const [selectedArtist, setselectedArtist] = useState([]);
    const [releaseDateStart, setreleaseDateStart] = useState([]);
    const [releaseDateEnd, setreleaseDateEnd] = useState([]);
    const [bookingMovies, setbookingMovies] = useState([]);
    const [listedGenres, setlistedGenres] = useState([]);
    const [listedArtists, setlistedArtists] = useState([]);
    const [inputmoviename, setinputmoviename] = useState([]);
    const [movieDetailsID, setmovieDetailsID] = useState("");
    const releasedMovieDispatch = useDispatch();
    useEffect(() => {
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

        fetch(`http://localhost:8085/api/v1/movies?title=${encodeURIComponent(inputmoviename)}&artists=${encodeURIComponent(selectedArtistStr)}&genre=${encodeURIComponent(selectedGenreStr)}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                releasedMovieDispatch({ "type": "SET_RELEASED_MOVIES", payload: data.movies });
            })
    }
    return (
        <div>
            <Card className={cardClass.root}>

                <CardHeader className={cardClass.header} title='FIND MOVIES BY:' ></CardHeader>

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
    );
}


export default MovieFilter;