import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import "./LoginPage.css";
import LoginForm from './LoginForm.js'
import { FormControl, InputLabel, Input, Button, useRadioGroup } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Home from '../../screens/home/Home'
import { useCookies } from 'react-cookie';



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500
    },
}));

export default function LoginPage({ requestClose }) {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };


    const [newUser, setUser] = useState({
        first_name: '',
        last_name: '',
        email_address: '',
        password: '',
        mobile_number: ''
    });

    const [loggedInUser, setloggedInUser] = useState({
        email_address: '',
        password: '',
    });


    const [usersList, setUsersList] = useState([]);
    const [cookies, setCookie] = useCookies(['basic-auth']);
    function loginUser(e) {
        // const state = loggedInUser;
        // state[e.target.name] = e.target.value;
        // setUser({
        //     first_name: state["first_name"],
        //     last_name: state["last_name"],
        //     email_address: state["email_address"],
        //     password: state["password"],
        //     mobile_number: state["mobile_number"],
        // });
        setloggedInUser(
            {
                ...loggedInUser, [e.target.name]: e.target.value
            }
        )
    }

    function addUser(e) {
        const state = newUser;
        state[e.target.name] = e.target.value;
        setUser({
            first_name: state["first_name"],
            last_name: state["last_name"],
            email_address: state["email_address"],
            password: state["password"],
            mobile_number: state["mobile_number"],
        });

        if (usersList.length > 0) {
            newUser.id = usersList[usersList.length - 1].id + 1;
        }
        else {
            newUser.id = 1;
        }
        usersList.push(newUser);
        setUsersList(usersList);
    }
    const [registrationsuccessful, setregistrationsuccessful] = useState(false);
    const formSubmitted = (e) => {
        e.preventDefault();


        fetch('http://localhost:8085/api/v1/signup', {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
        })
            .then(res => res.json())
        //.then(json => setUser(newUser))

        setUser({
            id: 0,
            first_name: '',
            last_name: '',
            email_address: '',
            password: '',
            mobile_number: ''
        });
        setregistrationsuccessful(true);

    }

    const { first_name, last_name, email_address, password, mobile_number } = newUser;

    //goingToHomePage
    function login(e) {
        e.preventDefault();
        const token = `Basic ${window.btoa(`${loggedInUser.email_address}:${loggedInUser.password}`)}`;
        fetch('http://localhost:8085/api/v1/auth/login', {
            method: 'POST',
            // body: JSON.stringify(loggedInUser),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": token
            },
        })
            .then(response => {
                if (response.ok) {
                    setCookie('basic-auth', response.headers.get('access-token'), { path: '/' });
                    requestClose();
                }
            }).catch(error =>
                console.log(error)
            );


        // < Home />
    }
    return (

        <div className="tabPage">
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Login" {...a11yProps(0)} />
                    <Tab label="Register" {...a11yProps(1)} />

                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <form onSubmit={login} style={{ 'alignContent': 'center' }}>
                        <FormControl >
                            <InputLabel htmlFor="my-input1" >Username*</InputLabel>
                            <Input id="my-input1" aria-describedby="my-helper-text1" name="email_address" onChange={loginUser} value={loggedInUser.email_address} />
                        </FormControl>
                        <br></br>
                        <FormControl>
                            <InputLabel htmlFor="my-input2" >Password*</InputLabel>
                            <Input id="my-input2" aria-describedby="my-helper-text2" name="password" onChange={loginUser} value={loggedInUser.password} />
                        </FormControl>
                        <br></br>
                        <br></br>
                        <br></br>
                        <Button variant="contained" color="primary" type="submit">Login</Button>
                    </form>
                </TabPanel>


                <TabPanel value={value} index={1} dir={theme.direction}>
                    <ValidatorForm style={{ 'alignContent': 'center' }} onSubmit={formSubmitted}>
                        <TextValidator
                            id="first_name" type="text" name='first_name' label='First Name*' placeholder='First Name*' onChange={addUser} value={first_name}
                            validators={['required']} errorMessages={['required']}>
                        </TextValidator>
                        <br></br>
                        <TextValidator
                            id="last_name" type="text" name='last_name' label='Last Name*' placeholder='Last Name*' onChange={addUser} value={last_name}
                            validators={['required']} errorMessages={['required']}>
                        </TextValidator>
                        <br></br>
                        <TextValidator
                            id="email_address" type="email" name='email_address' label='Email*' placeholder='Email*' onChange={addUser} value={email_address}
                            validators={['required']} errorMessages={['required']}>
                        </TextValidator>
                        <br></br>
                        <TextValidator
                            id="password" type="password" name='password' label='Password*' placeholder='Password*' onChange={addUser} value={password}
                            validators={['required']} errorMessages={['required']}>
                        </TextValidator>
                        <br></br>
                        <TextValidator
                            id="mobile_number" type="text" name='mobile_number' label='Contact No*' placeholder='Contact No*' onChange={addUser} value={mobile_number}
                            validators={['required']} errorMessages={['required']}>
                        </TextValidator>
                        <br></br>
                        {registrationsuccessful ?
                            <h6> Registration Successful. Please Login!</h6>
                            :
                            null
                        }
                        <Button className='button' variant="contained" color="primary" type="submit">Register</Button>

                    </ValidatorForm>
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}

