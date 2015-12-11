import {fromJS} from 'immutable';

const INITIAL_STATE = fromJS({
    book: {
        title: 'Public Domain Mashup',
        url: '/content/book/index.json',
        isFetching: false,
        chapters: []
    }
});

export default INITIAL_STATE;
