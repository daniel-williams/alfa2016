import fetch from 'isomorphic-fetch';
import {checkStatus, toJSON} from './fetch-helper';
import store from '../store';

import {
  CONTACT_SHOW,
  CONTACT_HIDE,
  CONTACT_POSTING,
  CONTACT_POST_SUCCESS,
  CONTACT_POST_FAILED
} from '.';


export function showContact() {
  store.dispatch({type: CONTACT_SHOW});
  // return function(dispatch) {
  //   console.log('showContact dispatch:', dispatch);
  //   dispatch({type: CONTACT_SHOW});
  // }
}

export function hideContact() {
  store.dispatch({type: CONTACT_HIDE});
  // return function(dispatch) {
  //   dispatch({type: CONTACT_HIDE});
  // }
}

export function submitContact(formData) {
  return function(dispatch) {
    console.log('thunk', formData);
    dispatch({type: CONTACT_POSTING, payload: formData});

  //   fetch('')
  //     .then(checkStatus)
  //     .then(() => dispatch({type: CONTACT_POST_SUCCESS, payload: {date: new Date()}}))
  //     .catch((err) => dispatch({type: CONTACT_POST_FAILED, err: err}));
  // dispatch({type: CONTACT_POST_SUCCESS, payload: {date: new Date()}});
  }
}
