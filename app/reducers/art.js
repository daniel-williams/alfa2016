import {Map, List, fromJS} from 'immutable';

import {
  ART_REQUESTED,
  ART_SUCCESS,
  ART_FAILED
} from '../actions';

const initialState = fromJS({
  isFetching: false,
  hasFetched: true,
  lastFetchDate: null,
  lastFetchError: null,
  items: []
});

export default function(state = initialState, action) {
  switch(action.type) {
    case ART_REQUESTED: {
      return state.set('isFetching', true);
    }
    case ART_SUCCESS: {
      return state.withMutations(state => {
        state.set('isFetching', false);
        state.set('hasFetched', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('items', fromJS(action.payload.items));
        return state;
      });
    }
    case ART_FAILED: {
      return state.withMutations(state => {
        state.set('isFetching', false);
        state.set('hasFetched', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', action.payload.err);
        return state;
      });
    }
    default:
        return state;
  }
}
