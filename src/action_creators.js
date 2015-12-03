import {
    FETCH_INDEX,
    INDEX_REQUESTED,
    INDEX_RECEIVED,
    UPDATE_INDEX
} from './actions';

export function getIndex() {
    return {type: FETCH_INDEX};
}

export function fetchIndex() {
    return function(dispatch) {
        // notify start
        dispatch({type: INDEX_REQUESTED});

        return fetch('/content/book/index.json')
            .then((res) => res.json())
            .then((json) => {
                dispatch({type: UPDATE_INDEX, chapters: json});
            })
            .catch((err) => console.debug('Oops!', err))
            .then(() => {
                setTimeout(() => dispatch({type: INDEX_RECEIVED}), 5000);
            }) // notify end
    }
}
