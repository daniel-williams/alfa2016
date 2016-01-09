import fetch from 'isomorphic-fetch';
import {checkStatus, parseJSON} from './fetch-helper';

import store from '../store';
import {
  BLOG_REQUESTED,
  BLOG_SUCCESS,
  BLOG_FAILED,
  BLOG_PAGE_NEXT,
  BLOG_PAGE_PREV,
} from '.';

import constants from '../constants';


const {host, id, apiKey, itemsPerPage} = constants.blog;
const blogUrl = host + id + '?key=' + apiKey;

export function blogPageNext() {
  return function(dispatch) {
    dispatch({
      type: BLOG_PAGE_NEXT
    });
  }
}
export function blogPagePrev() {
  return function(dispatch) {
    dispatch({
      type: BLOG_PAGE_PREV
    });
  }
}

export function fetchBlog() {
  return function(dispatch) {
    dispatch({
      type: BLOG_REQUESTED,
    });

    fetch(blogUrl)
      .then(checkStatus)
      .then(parseJSON)
      .then(json => dispatch({
        type: BLOG_SUCCESS,
        payload: {
          blog: json
        },
      }))
      .catch(err => dispatch({
        type: BLOG_FAILED,
        payload: {
          date: new Date(),
          err: err
        },
      }));
  }
}
