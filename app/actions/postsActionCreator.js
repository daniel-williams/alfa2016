import fetch from 'isomorphic-fetch';
import {checkStatus, parseJSON} from './fetch-helper';

import store from '../store';
import {
  POSTS_REQUESTED,
  POSTS_SUCCESS,
  POSTS_FAILED,
} from '.';

import constants from '../constants';


const {host, id, apiKey} = constants.blog;
const postsUrl = host + id + '/posts?key=' + apiKey;

export function fetchPosts(count = 0, pageToken) {
  if(typeof count !== 'number' || count < 1) return;
  count = '&maxResults=' + count;
  pageToken = !!pageToken ? '&pageToken=' + pageToken
                          : '';

  return function(dispatch) { // thunk
    dispatch({
      type: POSTS_REQUESTED
    });

    fetch(postsUrl + count + pageToken)
      .then(checkStatus)
      .then(parseJSON)
      .then(json => {
        dispatch({
          type: POSTS_SUCCESS,
          payload: {
            date: new Date(),
            items: json.items,
            pageToken: json.nextPageToken
          }
        })
      })
      .catch(err => dispatch({
        type: POSTS_FAILED,
        payload: {
          date: new Date(),
          err: err
        }
      }));
  }
}
