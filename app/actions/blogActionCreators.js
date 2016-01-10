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
  POST_REQUESTED,
  POST_SUCCESS,
  POST_FAILED,
} from '.';

import constants from '../constants';


const {host, id, apiKey, itemsPerPage} = constants.blog;
const blogUrl = host + id + '?key=' + apiKey;
const postsUrl = host + id + '/posts?key=' + apiKey;
function getPostUrl(itemId) {
  return host + id + '/posts/' + itemId + '?key=' + apiKey;
}



export function fetchAsNeeded(slug) {
  return function(dispatch, getState) {
    const blogId = getState().getIn(['blog', 'id']);

    if(!blogId) {
      fetchBlog(dispatch, getState);
    } else {
      fetchPostsAsNeeded(dispatch, getState, slug);
    }
  }
}

function fetchBlog(dispatch) {
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

function fetchPostsAsNeeded(dispatch, getState, slug) {
  const blog = getState().get('blog').toJS();
  if(slug) {
    if(!blog.items.find((item) => item.slug === slug)) {
      const post = getState().get('post').toJS();
      if(!post.isFetching && !post.item && !post.lastFetchError) {
        fetchPostBySlug(slug)(dispatch, getState);
      }
    }
  }
    const {activePage, itemsPerPage, totalItemCount} = blog;
    const loadedItemCount = blog.items.length;

    // do we have enough posts for the current page?
    if((activePage * itemsPerPage) > loadedItemCount && loadedItemCount < totalItemCount) {
      // yes! how many do we need?
      const count = activePage * itemsPerPage - loadedItemCount;
      const pageToken = blog.pageToken;
      fetchPost(count, pageToken)(dispatch, getState);
    }
}

function fetchPost(count = 0, pageToken) {
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

function fetchPostBySlug(slug) {
  return function(dispatch, getState) {
    dispatch({
      type: POST_REQUESTED,
    });
    fetch(postsUrl + '&maxResults=500&fields=items(id,url)')
      .then(checkStatus)
      .then(parseJSON)
      .then(json => {
        const slugMap = json.items.map(item => {
          return {
            id: item.id,
            slug: getSlugFromUrl(item.url),
          }
        });
        const tgtItem = slugMap.find(item => item.slug === slug);
        if(tgtItem) {
          fetch(getPostUrl(tgtItem.id))
            .then(checkStatus)
            .then(parseJSON)
            .then(json => {
              dispatch({
                type: POST_SUCCESS,
                payload: {
                  date: new Date(),
                  item: processBlogItem(json)
                },
              });
            })
            .catch(err => dispatch({
              type: POST_FAILED,
              payload: {
                date: new Date(),
                err: err
              },
            }))
        } else {
          dispatch({
            type: POST_FAILED,
            payload: {
              date: new Date(),
              err: 'Post not found.'
            },
          });
        }
      })
      .catch(err => dispatch({
        type: POST_FAILED,
        payload: {
          date: new Date(),
          err: err
        },
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


function processBlogItem(item) {
  return {
      id: item.id,
      title: item.title,
      url: item.url,
      slug: getSlugFromUrl(item.url),
      content: item.content,
      date: item.published,
      tags: item.labels
  };
}

function getSlugFromUrl(url) {
  var name = url.split('/').slice(-1)[0];
  if(name.indexOf('.' >= 0)) {
      name = name.substr(0, name.lastIndexOf('.'));
  }
  return name;
}
