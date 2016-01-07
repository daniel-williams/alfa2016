import {Map, List, fromJS} from 'immutable';

import {
  SUBSCRIBE_POSTING,
  CONTACT_POSTING,
  CONTACT_POST_SUCCESS,
  INQUIRY_POSTING,
  INQUIRY_POST_SUCCESS,
} from '../actions';

const initialState = fromJS({
  name: null,
  email: null,
  phone: null,
  message: null,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case SUBSCRIBE_POSTING: {
      return Map(Object.assign({}, state.toJS(), action.payload.user));
    }
    case CONTACT_POSTING: {
      return Map(Object.assign({}, state.toJS(), action.payload.user));
    }
    case CONTACT_POST_SUCCESS: {
      return Map(Object.assign({}, state.toJS(), {message: null}));
    }
    case INQUIRY_POSTING: {
      return Map(Object.assign({}, state.toJS(), action.payload.user));
    }
    case INQUIRY_POST_SUCCESS: {
      return Map(Object.assign({}, state.toJS(), {message: null}));
    }
    default: {
      return state;
    }
  }
}
