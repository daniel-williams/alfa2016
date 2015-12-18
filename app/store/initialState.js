import {fromJS} from 'immutable';

const INITIAL_STATE = fromJS({
    galleries: {
        isFetching: false,
        items: []
    },
    art: {
        isFetching: false,
        items: []
    },
    blog: {
        isFetching: false,
        items: []
    },
    articles: {
        isFetching: false,
        items: []
    }
});

export default INITIAL_STATE;
