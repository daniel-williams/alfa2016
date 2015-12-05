import Immutable, {List, Map, fromJS} from 'immutable';

import {
    CHAPTER_REQUESTED,
    CHAPTER_RECEIVED,
    UPDATE_CHAPTER
} from '../actions';

const initialState = List([]);

export default function(state = initialState, action) {
    switch(action.type) {
        case CHAPTER_REQUESTED:
            return chapterRequested(state, action)
        case UPDATE_CHAPTER:
            return updateChapter(state, action)
        case CHAPTER_RECEIVED:
            return chapterReceived(state, action)
        default:
            return state
    }
}

function chapterRequested(state, action) {
    var {chapter, content} = action;
    return state.updateIn([chapter, 'isFetching'], () => true);
}
function updateChapter(state, action) {
    var {chapter, content} = action;
    return state.updateIn([chapter, 'content'], () => content);
}
function chapterReceived(state, action) {
    var {chapter, content} = action;
    return state.updateIn([chapter, 'isFetching'], () => false);
}
