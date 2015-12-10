import React from 'react';
import {Route} from 'react-router';

import App from '../components/App';
import {BookContainer} from '../containers/Book';
import DbTest from '../containers/DbTest';


const routes = (
    <Route component={App}>
        <Route path="/" component={BookContainer} />
        <Route path="/test-db" component={DbTest} />
    </Route>
);

export default routes;
