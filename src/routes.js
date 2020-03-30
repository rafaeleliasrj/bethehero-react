import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Logon from './pages/Logon/index';
import Register from './pages/Register/index';
import Profile from './pages/Profile/index';
import Incident from './pages/Incident/index';

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/incident/new" component={Incident} />
            </Switch>
        </BrowserRouter>
    )
}