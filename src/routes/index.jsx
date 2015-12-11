import React from 'react';
import {Route} from 'react-router';

import App from '../components/App';
import DbTest from '../containers/DbTest';
import {BookContainer} from '../containers/Book';


const routes = (
    <Route component={App}>
        <Route path='/' component={DbTest} />
    </Route>
);

export default routes;
