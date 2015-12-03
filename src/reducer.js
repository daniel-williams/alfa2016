import {List, Map, fromJS} from 'immutable';
import {fetch} from 'isomorphic-fetch';

import {
    INDEX_REQUESTED,
    INDEX_RECEIVED,
    UPDATE_INDEX
} from './actions';

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
            return indexUpdate(state, action)
        case INDEX_REQUESTED:
            return indexRequested(state)
        case INDEX_RECEIVED:
            return indexReceived(state)
        default:
            return state;
    }
}



function indexUpdate(state, action) {
    var chapters = action.chapters.map((item) => {
        return {url: item, fetched: false}
    });
    var toMerge = {
        book: {
            chapters: chapters
        }
    }
    return state.mergeDeep(toMerge);
}

function indexRequested(state) {
    return state.mergeDeep({
        book: {
            isFetching: true
        }
    });
}

function indexReceived(state) {
    return state.mergeDeep({
        book: {
            isFetching: false
        }
    });
}

// {
//     book: {
//         url: '/content/book/index.json',
//         isFetching: false,
//         chapters = [
//             {url: 'chap 1 url', text: 'fetched text', fetched: true},
//             {url: 'chap 2 url', text: '', fetched: false},
//             {url: 'chap 3 url', text: '', fetched: false}
//             .
//             .
//             .
//             {url: 'chap n url', text: '', fetched: false}
//         ]
//     }
// }
