import React from "react";
import ReactDOM from "react-dom";
import Header from "./common/header/Header.js";
import Home from "./screens/home/Home"
import Details from "./screens/details/Details"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import BookShow from "./screens/bookshow/BookShow.js";

function Controller() {

    return (
        <CookiesProvider>
            <Router>
                <div className="Controller">
                    <Header />
                    <div>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route path='/movie/:id' component={Details} />
                            <Route path='/bookshow/:id' component={BookShow} />
                        </Switch>

                    </div>
                </div>
            </Router>
        </CookiesProvider>
    );
}

export default Controller;


