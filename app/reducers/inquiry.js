import {Map, List, fromJS} from 'immutable';

import {
    INQUIRY_RESET,
    INQUIRY_POSTING,
    INQUIRY_POST_SUCCESS,
    INQUIRY_POST_FAILED
} from '../actions';

const steps = {
  Intro: 'Intro',
  Form: 'Form',
  Success: 'Success',
  Failure: 'Failure',
}

const initialState = fromJS({
  Step: steps.Intro,
  isPosting: false,
  lastPostDate: null,
  lastPostError: null,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case INQUIRY_RESET: {
      return state.set('Step', steps.Intro);
    }
    case INQUIRY_POSTING: {
      return state.withMutations(state => {
        state.set('isPosting', true);
        state.set('lastPostDate', null);
        state.set('lastPostError', null);
        return state;
      });
    }
    case INQUIRY_POST_SUCCESS: {
      return state.withMutations(state => {
        state.set('isActive', false);
        state.set('isPosting', false);
        state.set('lastPostDate', action.payload.date);
        state.set('lastPostError', null);
        return state;
      });
    }
    case INQUIRY_POST_FAILED: {
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
