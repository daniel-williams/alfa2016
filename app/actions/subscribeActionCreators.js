import fetch from 'isomorphic-fetch';
import {checkStatus, toJSON} from './fetch-helper';
import store from '../store';

import {
  SUBSCRIBE_SHOW,
  SUBSCRIBE_HIDE,
  SUBSCRIBE_POSTING,
  SUBSCRIBE_POST_SUCCESS,
  SUBSCRIBE_POST_FAILED
} from '.';


export function showSubscribe() {
  store.dispatch({type: SUBSCRIBE_SHOW});
}

export function hideSubscribe() {
  store.dispatch({type: SUBSCRIBE_HIDE});
}

export function submitSubscribe(formData) {
  return function(dispatch) {
    dispatch({type: SUBSCRIBE_POSTING, payload: {user: formData}});

    fetch('/api/subscribe', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
    .then(checkStatus)
    .then(() => dispatch({type: SUBSCRIBE_POST_SUCCESS, payload: {date: new Date()}}))
    .catch((err) => dispatch({type: SUBSCRIBE_POST_FAILED, payload: {date: new Date(), err: err}}));
  }
}
