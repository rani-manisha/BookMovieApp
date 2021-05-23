import React from "react";
import ReactDOM from "react-dom";
import Header from "./common/header/Header.js";
import Home from "./screens/home/Home"
import Details from "./screens/details/Details"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function Controller() {

    return (
        <Router>
            <div className="Controller">
                <div>
                    <Switch>
                        <Route exact path='/home' component={Home} />
                    </Switch>
                </div>
                <Details />
            </div>
        </Router>
    );
}

export default Controller;


