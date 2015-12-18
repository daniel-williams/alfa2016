import React from 'react';
import {Route} from 'react-router';

import App from '../components/App';
import Home from '../containers/Home';
import Blog from '../containers/Blog';

import DbTest from '../containers/DbTest';
import {GalleriesContainer} from '../containers/Galleries';
import {ArtContainer} from '../containers/Art';
import {BlogContainer} from '../containers/Blog';


const routes = (
    <Route component={App}>
        <Route path='/' component={Home} />
        <Route path='/gallery' component={GalleriesContainer} />
        <Route path='/art' component={ArtContainer} />
        <Route path='/blog' component={BlogContainer} />
    </Route>
);

export default routes;
