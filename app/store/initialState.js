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
        items: [],
        page: 0,
        pageToken: null
    },
    show: {
      isFetching: false,
      items: [],
      active: null
    }
});

export default INITIAL_STATE;
