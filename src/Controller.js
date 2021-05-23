import React from "react";
import ReactDOM from "react-dom";
import Header from "./common/header/Header.js";
import Home from "./screens/home/Home"
import Details from "./screens/details/Details"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

function Controller() {

    return (
        <CookiesProvider>
            <Router>
                <div className="Controller">
                    <Header />
                    <div>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route path='/details/:id' component={Details} />
                        </Switch>

                    </div>
                </div>
            </Router>
        </CookiesProvider>
    );
}

export default Controller;


