import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from '../components/App';

import Home from '../containers/Home';
import Exhibits from '../containers/Exhibits';
import Classes from '../containers/Classes';
import About from '../containers/About';

import {ArtContainer} from '../containers/Art';
import {ArtDetailsContainer} from '../containers/ArtDetails';
import {BlogContainer} from '../containers/Blog';


const routes = (
    <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='about' component={About} />
        <Route path='exhibits' component={Exhibits} />
        <Route path='classes' component={Classes} />
        <Route path='art/:gallery' component={ArtContainer}>
          <Route path=':aslug' component={ArtDetailsContainer} />
        </Route>
        <Route path='blog' component={BlogContainer} />
    </Route>
);

export default routes;
