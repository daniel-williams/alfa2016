import {Map, List, fromJS} from 'immutable';

import {
    BLOG_REQUESTED,
    BLOG_RECEIVED,
    UPDATE_BLOG
} from '../actions';

const initialState = fromJS({
    isFetching: false,
    items: []
});

export default function(state = initialState, action) {
    switch(action.type) {
        case BLOG_REQUESTED:
            return state.set('isFetching', true);
        case UPDATE_BLOG:
            console.log('UPDATE_BLOG', action);
            return state.set('items', fromJS(action.data.items));
        case BLOG_RECEIVED:
            return state.set('isFetching', false);
        default:
            return state;
    }
}
