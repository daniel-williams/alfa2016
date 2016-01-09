import fetch from 'isomorphic-fetch';
import {checkStatus, parseJSON} from './fetch-helper';

import store from '../store';
import {
  POSTS_REQUESTED,
  POSTS_SUCCESS,
  POSTS_FAILED,
  POSTS_PAGE_NEXT,
  POSTS_PAGE_PREV,
} from '.';

import constants from '../constants';


const {host, id, apiKey} = constants.blog;
const postsUrl = host + id + '/posts?key=' + apiKey;

export function postsPageNext() {
  store.dispatch({
    type: POSTS_PAGE_NEXT
  });
}
export function postsPagePrev() {
  store.dispatch({
    type: POSTS_PAGE_PREV
  });
}

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
