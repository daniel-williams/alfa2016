import React from 'react';
import thunkMiddleware from 'redux-thunk'
import ReactDom from 'react-dom';
import Router, {Route} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import history from './history';

import reducer from './reducer';
import App from './components/App';
import Home from './containers/Home';
import About from './containers/About';
import {Book, BookContainer} from './containers/Book';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

const store = createStoreWithMiddleware(reducer);

const routes = (
    <Route component={App}>
        <Route path="/" component={BookContainer} />
    </Route>
);

ReactDom.render(
    <Provider store={store}>
        <Router history={history}>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);
