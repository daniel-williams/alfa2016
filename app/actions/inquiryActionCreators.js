import fetch from 'isomorphic-fetch';
import {checkStatus, toJSON} from './fetch-helper';
import store from '../store';

import {
  INQUIRY_RESET,
  INQUIRY_POSTING,
  INQUIRY_POST_SUCCESS,
  INQUIRY_POST_FAILED
} from '.';


export function resetInquiry() {
  store.dispatch({type: INQUIRY_RESET});
}

export function submitInquiry(formData) {
  console.log(formData);
  return function(dispatch) {
    dispatch({type: INQUIRY_POSTING, payload: {user: formData}});

    fetch('/api/inquiry', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
    .then(checkStatus)
    .then(() => dispatch({type: INQUIRY_POST_SUCCESS, payload: {date: new Date()}}))
    .catch((err) => dispatch({type: INQUIRY_POST_FAILED, payload: {date: new Date(), err: err}}));
  }
}
