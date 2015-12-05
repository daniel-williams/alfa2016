import Immutable, {List, Map, fromJS} from 'immutable';

import {
    INDEX_REQUESTED,
    UPDATE_INDEX,
    INDEX_RECEIVED
} from '../actions';

const initialState = Map({});

export default function(state = initialState, action) {
    switch(action.type) {
        case INDEX_REQUESTED:
            return indexRequested(state)
        case UPDATE_INDEX:
            return updateIndex(state, action)
        case INDEX_RECEIVED:
            return indexReceived(state)
        default:
            return state
    }
}

function indexRequested(state) {
    return state.set('isFetching', true);
}
function updateIndex(state, action) {
    var toMerge = fromJS({
        chapters: action.chapters.map(item => ({url: item, isFetching: false}))
    });
    return state.merge(toMerge);
}
function indexReceived(state) {
    return state.set('isFetching', false);
}
