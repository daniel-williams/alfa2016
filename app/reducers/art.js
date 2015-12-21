import {Map, List, fromJS} from 'immutable';

import {
    ART_REQUESTED,
    ART_RECEIVED,
    UPDATE_ART
} from '../actions';

const initialState = fromJS({
    isFetching: false,
    items: []
});

export default function(state = initialState, action) {
    switch(action.type) {
        case ART_REQUESTED:
            return state.set('isFetching', true);
        case UPDATE_ART:
            return state.set('items', fromJS(action.data));
        case ART_RECEIVED:
            return state.set('isFetching', false);
        default:
            return state;
    }
}
