import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from '../components/App';
import Home from '../components/Home';
import GalleriesAndExhibitions from '../components/GalleriesAndExhibitions';
import Classes from '../components/Classes';
import About from '../components/About';

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
