import React from 'react';
import {Route} from 'react-router';

import App from '../components/App';
import Home from '../containers/Home';

import {GalleriesContainer} from '../containers/Galleries';
import {ArtContainer} from '../containers/Art';
import {BlogContainer} from '../containers/Blog';


const routes = (
    <Route component={App}>
        <Route path='/' component={Home} />
        <Route path='/about' component={Home} />
        <Route path='/exhibits' component={Home} />
        <Route path='/classes' component={Home} />
        <Route path='/art' component={ArtContainer}>
            <Route path=':slug' component={ArtContainer} />
        </Route>
        <Route path='/gallery' component={GalleriesContainer}>
            <Route path=':name' component={GalleriesContainer}>
                <Route path=':slug' component={GalleriesContainer} />
            </Route>
        </Route>
        <Route path='/blog' component={BlogContainer}>
            <Route path=':slug' component={BlogContainer} />
        </Route>
    </Route>
);

export default routes;
