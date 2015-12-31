import {Map, List, fromJS} from 'immutable';

import {
  FEATURE_REQUESTED,
  FEATURE_SUCCESS,
  FEATURE_FAILED,
} from '../actions';

const initialState = fromJS({
  isFetching: false,
  isStale: true,
  lastFetchDate: null,
  lastFetchError: null,
  feature: {}
});

export default function(state = initialState, action) {
  switch(action.type) {
    case FEATURE_REQUESTED:
      return state.set('isFetching', true);
    case FEATURE_SUCCESS: {
        return state.withMutations(state => {
          state.set('isFetching', false);
          state.set('isStale', false);
          state.set('lastFetchDate', action.date);
          state.set('feature', fromJS(action.feature));
          return state;
        });
      }
    case FEATURE_FAILED: {
        return state.withMutations(state => {
          state.set('isFetching', false);
          state.set('isStale', false);
          state.set('lastFetchDate', action.date);
          state.set('lastFetchError', action.err);
          return state;
        });
      }
    default:
      return state;
  }
}
