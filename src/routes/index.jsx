import React from 'react';
import {Route} from 'react-router';

import App from '../components/App';
import DbTest from '../containers/DbTest';
import {GalleriesContainer} from '../containers/Galleries';


const routes = (
    <Route component={App}>
        <Route path='/' component={GalleriesContainer} />
    </Route>
);

export default routes;
