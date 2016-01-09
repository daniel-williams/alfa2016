import {Map, List, fromJS} from 'immutable';

import {
  SHOW_REQUESTED,
  SHOW_SUCCESS,
  SHOW_FAILED,
  SHOW_NEXT,
  SHOW_PREV,
} from '../actions';

const initialState = fromJS({
  isFetching: false,
  hasFetched: true,
  lastFetchDate: null,
  lastFetchError: null,
  active: 0,
  show: {
    showControls: false,
    pauseTime: 10000,
    transitionTime: 1000,
    items: []
  }
});

export default function(state = initialState, action) {
  switch(action.type) {
    case SHOW_REQUESTED:
      return state.set('isFetching', true);
    case SHOW_SUCCESS: {
        return state.withMutations(state => {
          state.set('isFetching', false);
          state.set('hasFetched', false);
          state.set('lastFetchDate', action.date);
          state.set('show', fromJS(action.show));
          return state;
        });
      }
    case SHOW_FAILED: {
        return state.withMutations(state => {
          state.set('isFetching', false);
          state.set('hasFetched', false);
          state.set('lastFetchDate', action.date);
          state.set('lastFetchError', action.err);
          return state;
        });
      }
    case SHOW_NEXT: {
        let active = state.get('active');
        let count = state.getIn(['show', 'items']).toJS().length;
        return state.set('active', ++active === count ? 0 : active);
      }
    case SHOW_PREV: {
        let active = state.get('active');
        let count = state.getIn(['show', 'items']).toJS().length;
        return state.set('active', --active < 0 ? count - 1 : active);
      }
    default:
      return state;
  }
}
