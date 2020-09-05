import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';


import Homepage from './Component/Homepage';
import Handle404 from './Component/404';
import Transaction from './Component/Transaction';


function Layout() {

    return (
        <HashRouter>
            <Switch>
                <Route exact path='/' ><Homepage /></Route>
                <Route exact path='/transaction'><Transaction /></Route>
                <Route >
                    <Handle404 />
                </Route>
            </Switch>
        </HashRouter>
    );
}

export default Layout;
