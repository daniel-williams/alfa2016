import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from '../pages/App';
import Home from '../pages/Home';
import GalleriesAndExhibitions from '../pages/GalleriesAndExhibitions';
import Classes from '../pages/Classes';
import About from '../pages/About';

import {ArtContainer} from '../containers/Art';
import {ArtDetailsContainer} from '../containers/ArtDetails';
import {BlogContainer} from '../containers/Blog';
import {ArticleContainer} from '../containers/Article';


const routes = (
    <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='about' component={About} />
        <Route path='galleries-and-exhibitions' component={GalleriesAndExhibitions} />
        <Route path='classes' component={Classes} />
        <Route path='art/:gallerySlug' component={ArtContainer}>
          <Route path=':artSlug' component={ArtDetailsContainer} />
        </Route>
        <Route path='blog' component={BlogContainer} />
        <Route path='blog/:articleSlug' component={ArticleContainer} />
    </Route>
);

export default routes;
