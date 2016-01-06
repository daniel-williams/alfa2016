import {Map, List, fromJS} from 'immutable';

import {
    SUBSCRIBE_SHOW,
    SUBSCRIBE_HIDE,
    SUBSCRIBE_POSTING,
    SUBSCRIBE_POST_SUCCESS,
    SUBSCRIBE_POST_FAILED
} from '../actions';

const initialState = fromJS({
  isActive: false,
  isPosting: false,
  lastPostDate: null,
  lastPostError: null,
  userEmail: null,
  hasResponded: false,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case SUBSCRIBE_SHOW: {
      return state.set('isActive', true);
    }
    case SUBSCRIBE_HIDE: {
      return state.withMutations(state => {
        state.set('isActive', false);
        state.set('hasResponded', true);
        return state;
      });
    }
    case SUBSCRIBE_POSTING: {
      return state.withMutations(state => {
        state.set('isPosting', true);
        state.set('lastPostDate', null);
        state.set('lastPostError', null);
        state.set('userEmail', action.payload.email);
        return state;
      });
    }
    case SUBSCRIBE_POST_SUCCESS: {
      return state.withMutations(state => {
        state.set('isPosting', false);
        state.set('lastPostDate', action.payload.date);
        state.set('lastPostError', null);
        state.set('hasResponded', true);
        return state;
      });
    }
    case SUBSCRIBE_POST_FAILED: {
      return state.withMutations(state => {
        state.set('isPosting', false);
        state.set('lastPostDate', action.payload.date);
        state.set('lastPostError', action.payload.err);
        return state;
      });
    }
    default: {
      return state;
    }
  }
}
