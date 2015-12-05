import React from 'react';
import {Route} from 'react-router';

import App from '../components/App';
import {BookContainer} from '../containers/Book';


const routes = (
    <Route component={App}>
        <Route path="/" component={BookContainer} />
    </Route>
);

export default routes;
