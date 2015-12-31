import fetch from 'isomorphic-fetch';
import {checkStatus, parseJSON} from './fetch-helper';
import {
  BLOG_REQUESTED,
  BLOG_SUCCESS,
  BLOG_FAILED,
}
from '.';

const host = 'https://www.googleapis.com/blogger/v3/blogs/';
const blogId = '5080215156052292878';
const apiKey = 'AIzaSyAoTn6DttJFZ5mWGHuqfN5fE1eSvQ0jgaE';

// TODO djw: fetching all not ideal. Solution wants to efficiently retrieve for
// article list (eg /blog, /blog?page=2) or individual article (eg /blog/some-blog-article).
// const url = host + blogId + '/posts?key=' + apiKey + '&maxResults=500';
const url = host + blogId + '/posts?key=' + apiKey;

export function fetchArticleList() {
  return function(dispatch) { // thunk
    dispatch({
      type: BLOG_REQUESTED
    });

    fetch(url)
      .then(checkStatus)
      .then(parseJSON)
      .then(json => dispatch({
        type: BLOG_SUCCESS,
        date: new Date(),
        items: json.items,
        nextPageToken: json.nextPageToken
      }))
      .catch(err => dispatch({
        type: BLOG_FAILED,
        date: new Date(),
        err: err
      }));
  }
}
