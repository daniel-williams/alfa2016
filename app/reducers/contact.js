import {Map, List, fromJS} from 'immutable';

import {
    CONTACT_SHOW,
    CONTACT_HIDE,
    CONTACT_POSTING,
    CONTACT_POST_SUCCESS,
    CONTACT_POST_FAILED
} from '../actions';

const initialState = fromJS({
  contactActive: false,
  isPosting: false,
  lastPostDate: null,
  lastPostError: null,
  useEmail: null,
  userName: null,
  userPhone: null,
  userMessage: null,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case CONTACT_SHOW: {
      return state.set('contactActive', true);
    }
    case CONTACT_HIDE: {
      return state.set('contactActive', false);
    }
    case CONTACT_POSTING: {
      console.log('reducer', action.payload);
      return state.withMutations(state => {
        state.set('isPosting', true);
        state.set('lastPostDate', null);
        state.set('lastPostError', null);
        state.set('userName', action.payload.name);
        state.set('userEmail', action.payload.email);
        state.set('userPhone', action.payload.phone);
        state.set('userMessage', action.payload.message);
        return state;
      });
    }
    case CONTACT_POST_SUCCESS: {
      return state.withMutations(state => {
        state.set('isPosting', false);
        state.set('lastPostDate', action.payload.date);
        state.set('lastPostError', null);
        state.set('userMessage', null);
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
