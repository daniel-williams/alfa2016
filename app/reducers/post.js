import {Map, List, fromJS} from 'immutable';

import {
  POST_REQUESTED,
  POST_SUCCESS,
  POST_FAILED,
} from '../actions';

const initialState = fromJS({
    isFetching: false,
    lastFetchDate: null,
    lastFetchError: null,
    item: null,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case POST_REQUESTED: {
      return state.set('isFetching', true);
    }
    case POST_SUCCESS: {
      return state.withMutations((state) => {
        state.set('isFetching', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', null);
        state.set('item', action.payload.item);
        return state;
      });
    }
    case POST_FAILED: {
      return state.withMutations((state) => {
        state.set('isFetching', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', action.payload.err);
        return state;
      });
    }
    default:
        return state
  }
}
