import Immutable, {Map, List, fromJS} from 'immutable';

import {
    GALLERIES_REQUESTED,
    GALLERIES_RECEIVED,
    UPDATE_GALLERIES
} from '../actions';

var initialState = fromJS({
    isFetching: false,
    items: [],
});

export default function(state = initialState, action) {
    switch(action.type) {
        case GALLERIES_REQUESTED:
            return galleriesRequested(state, action);
        case GALLERIES_RECEIVED:
            return galleriesReceived(state, action);
        case UPDATE_GALLERIES:
            return updateGalleries(state, action);
        default:
            return state;
    }
}

function galleriesRequested(state) {
    return state.set('isFetching', true);
}
function updateGalleries(state, action) {
    return state.set('items', fromJS(action.galleries));

    // note to self on reducer composition, when using Immutables
    // var toMerge = fromJS({
    //     chapters: action.chapters.map(item => ({url: item, isFetching: false}))
    // });
    // return state.merge(toMerge);
}
function galleriesReceived(state) {
    return state.set('isFetching', false);
}
