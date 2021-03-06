import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Home from '../pages/Home';
import GalleriesAndExhibitions from '../pages/GalleriesAndExhibitions';
import News from '../pages/News';
import About from '../pages/About';
import Contact from '../pages/Contact';

import {AppContainer} from '../containers/AppContainer';
import {ArtContainer} from '../containers/ArtContainer';
import {ArtDetailsContainer} from '../containers/ArtDetailsContainer';
import BlogContainer from '../containers/BlogContainer';


const routes = (
  <Route path='/' component={AppContainer}>
    <IndexRoute component={Home} />
    <Route path='/about' component={About} />
    <Route path='/galleries-and-exhibitions' component={GalleriesAndExhibitions} />
    <Route path='/News' component={News} />
    <Route path='/art/:gallerySlug' component={ArtContainer}>
      <Route path=':artSlug' component={ArtDetailsContainer} />
    </Route>
    <Route path='/blog' component={BlogContainer}>
      <Route path='/blog/:articleSlug' component={BlogContainer} />
    </Route>
    <Route path='/contact' component={Contact} />
    <Route path='*' component={Home} />
  </Route>
);

export default routes;
