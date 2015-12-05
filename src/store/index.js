import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';

import reducer from '../reducers';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default createStoreWithMiddleware(reducer);
