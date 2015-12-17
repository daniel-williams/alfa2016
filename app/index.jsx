import React from 'react';
import ReactDom from 'react-dom';
import Router from 'react-router';
import {Provider} from 'react-redux';

import store from './store';
import history from './routes/history';
import routes from './routes';


ReactDom.render(
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('app')
);
