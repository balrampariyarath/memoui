import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Home from './containers/Home';
import Add from './containers/Add';


export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/addMemo' component={Add}/>
            </Switch>
        </BrowserRouter>
    )
}