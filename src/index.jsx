import React from 'react';
import ReactDom from 'react-dom';
import Router, {Route} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import reducer from './reducer';
// import {setState} from './action_creators';
// import remoteActionMiddleware from './remote_action_middleware';
import App from './components/App';
import Home from './containers/Home';
import About from './containers/About';
// import {ResultsContainer} from './components/Results';
// import {VotingContainer} from './components/Voting';

// const socket = io(`${location.protocol}//${location.hostname}:8090`);
// socket.on('state', state =>
//     store.dispatch(setState(state))
// );

// const createStoreWithMiddleWare = applyMiddleware(remoteActionMiddleware(socket))(createStore);
// const store = createStoreWithMiddleWare(reducer);
const store = createStore(reducer);

const routes = (
    <Route component={App}>
        <Route path="/about" component={About} />
        <Route path="/" component={Home} />
    </Route>
);

ReactDom.render(
    <Provider store={store}>
        <Router>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);
