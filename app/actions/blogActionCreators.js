import fetch from 'isomorphic-fetch';
import {checkStatus, parseJSON} from './fetch-helper';

import store from '../store';
import {
  BLOG_REQUESTED,
  BLOG_SUCCESS,
  BLOG_FAILED,
  BLOG_PAGE_NEXT,
  BLOG_PAGE_PREV,
  POSTS_REQUESTED,
  POSTS_SUCCESS,
  POSTS_FAILED,
} from '.';

import constants from '../constants';


const {host, id, apiKey, itemsPerPage} = constants.blog;
const blogUrl = host + id + '?key=' + apiKey;
const postsUrl = host + id + '/posts?key=' + apiKey;



export function fetchAsNeeded() {
  return function(dispatch, getState) {
    const blogId = getState().getIn(['blog', 'id']);

    if(!blogId) {
      fetchB(dispatch, getState);
    } else {
      fetchPostsAsNeeded(dispatch, getState);
    }
  }
}

function fetchB(dispatch) {
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

function fetchPostsAsNeeded(dispatch, getState) {
  const blog = getState().get('blog').toJS()
  const {activePage, itemsPerPage, totalItemCount} = blog;
  const loadedItemCount = blog.items.length;

  // do we have enough posts for the current page?
  if((activePage * itemsPerPage) > loadedItemCount && loadedItemCount < totalItemCount) {
    // yes! how many do we need?
    const count = activePage * itemsPerPage - loadedItemCount;
    const pageToken = blog.pageToken;
    fetchP(count, pageToken)(dispatch, getState);
  }
}

function fetchP(count = 0, pageToken) {
  if(typeof count !== 'number' || count < 1) return;
  count = '&maxResults=' + count;
  pageToken = !!pageToken ? '&pageToken=' + pageToken
                          : '';

  return function(dispatch) {
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
