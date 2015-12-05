import Immutable, {List, Map, fromJS} from 'immutable';
import {fetch} from 'isomorphic-fetch';

import {
    INDEX_REQUESTED,
    INDEX_RECEIVED,
    UPDATE_INDEX,
    CHAPTER_REQUESTED,
    CHAPTER_RECEIVED,
    UPDATE_CHAPTER
} from '../actions';

const INITIAL_STATE = Map({
    book: Map({
        url: '/content/book/index.json',
        isFetching: false,
        chapters: []
    })
});

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case UPDATE_INDEX:
            return updateIndex(state, action)
        case INDEX_REQUESTED:
            return indexRequested(state)
        case INDEX_RECEIVED:
            return indexReceived(state)
        case UPDATE_CHAPTER:
            return updateChapter(state, action)
        case CHAPTER_REQUESTED:
            return chapterRequested(state, action)
        case CHAPTER_RECEIVED:
            return chapterReceived(state, action)
        default:
            return state;
    }
}



function chapterRequested(state, action) {
    var {chapter, content} = action;
    return state.updateIn(['book', 'chapters', chapter, 'isFetching'], () => true);
}
function chapterReceived(state, action) {
    var {chapter, content} = action;
    return state.updateIn(['book', 'chapters', chapter, 'isFetching'], () => false);
}
function updateChapter(state, action) {
    var {chapter, content} = action;
    return state.updateIn(['book', 'chapters', chapter, 'content'], () => content);
}


function updateIndex(state, action) {
    var chapters = action.chapters.map((item) => {
        return {url: item, isFetching: false}
    });
    var toMerge = {
        book: {
            chapters: chapters
        }
    }
    return state.mergeDeep(toMerge);
}

function indexRequested(state) {
    return state.updateIn(['book', 'isFetching'], () => true);
}

function indexReceived(state) {
    return state.updateIn(['book', 'isFetching'], () => false);
}
