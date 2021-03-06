import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import "./LoginModal.css";
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useCookies } from 'react-cookie';
import api from '../../api';

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

export default function LoginPage({ requestClose }) {
    const theme = useTheme();
    const [value, setValue] = useState(0);
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
    //eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['']);
    const [registrationsuccessful, setregistrationsuccessful] = useState(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function loginUser(e) {
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

    const formSubmitted = (e) => {
        e.preventDefault();
        api.userRegister(newUser)
            .then((response) => {
                // setUser({
                //     id: 0,
                //     first_name: '',
                //     last_name: '',
                //     email_address: '',
                //     password: '',
                //     mobile_number: ''
                // });
                setregistrationsuccessful(true);
            })
            .catch((error) => {
            })

    }

    const { first_name, last_name, email_address, password, mobile_number } = newUser;

    //goingToHomePage
    function login(e) {
        e.preventDefault();
        api.userLogin(loggedInUser.email_address, loggedInUser.password)
            .then((response) => {
                setCookie('basic-auth', response.headers['access-token'], { path: '/' });
                requestClose();
            })
            .catch((error) => {
            })
    }
    return (
        <div className="tabPage" >
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

            {/* login Tab */}
            <TabPanel value={value} index={0} dir={theme.direction} style={{ 'alignContent': 'center' }} >
                <form onSubmit={login}>
                    <FormControl >
                        <InputLabel htmlFor="email_address" required>Username</InputLabel>
                        <Input id="email_address" name="email_address" onChange={loginUser} value={loggedInUser.email_address} />
                    </FormControl>
                    <br></br>
                    <FormControl>
                        <InputLabel htmlFor="password" required>Password</InputLabel>
                        <Input id="password" type='password' name="password" onChange={loginUser} value={loggedInUser.password} required />
                    </FormControl>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Button variant="contained" color="primary" type="submit">Login</Button>
                </form>
            </TabPanel>

            {/* Register tab */}
            <TabPanel value={value} index={1} dir={theme.direction}>
                <ValidatorForm onSubmit={formSubmitted}>
                    <TextValidator
                        id="first_name" type="text" name='first_name' label='First Name *' placeholder='First Name *' onChange={addUser} value={first_name}
                        validators={['required']} errorMessages={['required']}>
                    </TextValidator>
                    <br></br>
                    <TextValidator
                        id="last_name" type="text" name='last_name' label='Last Name *' placeholder='Last Name *' onChange={addUser} value={last_name}
                        validators={['required']} errorMessages={['required']}>
                    </TextValidator>
                    <br></br>
                    <TextValidator
                        id="email_address" type="email" name='email_address' label='Email *' placeholder='Email *' onChange={addUser} value={email_address}
                        validators={['required']} errorMessages={['required']}>
                    </TextValidator>
                    <br></br>
                    <TextValidator
                        id="password" name='password' label='Password *' placeholder='Password *' onChange={addUser} value={password}
                        validators={['required']} errorMessages={['required']}>
                    </TextValidator>
                    <br></br>
                    <TextValidator
                        id="mobile_number" type="text" name='mobile_number' label='Contact No *' placeholder='Contact No *' onChange={addUser} value={mobile_number}
                        validators={['required']} errorMessages={['required']}>
                    </TextValidator>
                    <br></br>
                    {registrationsuccessful ?
                        <div>Registration Successful. Please Login!</div>
                        :
                        null
                    }
                    <Button className='button' variant="contained" color="primary" type="submit">Register</Button>

                </ValidatorForm>
            </TabPanel>

        </div >
    );
}

