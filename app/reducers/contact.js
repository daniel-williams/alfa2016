import {Map, List, fromJS} from 'immutable';

import {
    CONTACT_RESET,
    CONTACT_POSTING,
    CONTACT_POST_SUCCESS,
    CONTACT_POST_FAILED
} from '../actions';

const initialState = fromJS({
  isActive: true,
  isPosting: false,
  lastPostDate: null,
  lastPostError: null,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case CONTACT_RESET: {
      return state.set('isActive', true);
    }
    case CONTACT_POSTING: {
      return state.withMutations(state => {
        state.set('isPosting', true);
        state.set('lastPostDate', null);
        state.set('lastPostError', null);
        return state;
      });
    }
    case CONTACT_POST_SUCCESS: {
      return state.withMutations(state => {
        state.set('isActive', false);
        state.set('isPosting', false);
        state.set('lastPostDate', action.payload.date);
        state.set('lastPostError', null);
        return state;
      });
    }
    case CONTACT_POST_FAILED: {
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
