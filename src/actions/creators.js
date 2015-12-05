import {
    INDEX_REQUESTED,
    INDEX_RECEIVED,
    UPDATE_INDEX,
    CHAPTER_REQUESTED,
    CHAPTER_RECEIVED,
    UPDATE_CHAPTER
} from '.';

var urlRoot = '/content/book/';

export function getChapter(chapter, url) {
    return function(dispatch) { // thunk
        dispatch({type: CHAPTER_REQUESTED, chapter}); // notify start

        return fetch(urlRoot + url)
            .then(res => res.text())
            .then(content => {
                dispatch({type: UPDATE_CHAPTER, chapter: chapter, content: content});
                dispatch({type: CHAPTER_RECEIVED, chapter}); // notify end
            })
            .catch(err => console.debug('Oh snap!', err))
    }
}
export function fetchIndex() {
    return function(dispatch) { // thunk
        dispatch({type: INDEX_REQUESTED}); // notify start

        return fetch(urlRoot + 'index.json')
            .then(res => res.json())
            .then(json => {
                dispatch({type: UPDATE_INDEX, chapters: json});
                dispatch({type: INDEX_RECEIVED}); // notify end
            })
            .catch(err => console.debug('Oops!', err))
    }
}
