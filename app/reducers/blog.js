import {Map, List, fromJS} from 'immutable';

import constants from '../constants';
import {
  BLOG_REQUESTED,
  BLOG_SUCCESS,
  BLOG_FAILED,
  BLOG_PAGE_NEXT,
  BLOG_PAGE_PREV,
  POSTS_REQUESTED,
  POSTS_SUCCESS,
  POSTS_FAILED,
} from '../actions';

const initialState = fromJS({
    isFetching: false,
    lastFetchDate: null,
    lastFetchError: null,

    id: null,
    meta: null,
    totalItemCount: 0,
    totalPages: 0,
    itemsPerPage: constants.blog && constants.blog.itemsPerPage || 5,
    activePage: 1,
    items: [],
    pageToken: null,
});

export default function(state = initialState, action) {
  // console.log('blog reducer', action);
  switch(action.type) {
    case BLOG_REQUESTED: {
      return state.set('isFetching', true);
    }
    case BLOG_SUCCESS: {
      const blog = action.payload.blog;
      const totalItemCount = blog.posts.totalItems;
      const totalPages = Math.floor(totalItemCount / state.get('itemsPerPage')) + 1;

      return state.withMutations((state) => {
        state.set('isFetching', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', null);
        state.set('id', blog.id);
        state.set('totalItemCount', totalItemCount);
        state.set('totalPages', totalPages);
        state.set('meta', fromJS(blog));
        return state;
      });
    }
    case BLOG_FAILED: {
      return state.withMutations((state) => {
        state.set('isFetching', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', action.payload.err);
        return state;
      });
    }
    case BLOG_PAGE_NEXT: {
      const totalPages = state.get('totalPages');
      const activePage = state.get('activePage') ;
      return state.set('activePage', activePage < totalPages ? activePage + 1
                                                             : activePage);
    }
    case BLOG_PAGE_PREV: {
      const activePage = state.get('activePage') ;
      return state.set('activePage', activePage > 1 ? activePage - 1
                                                    : activePage);
    }
    case POSTS_REQUESTED: {
      return state.set('isFetching', true);
    }
    case POSTS_SUCCESS: {
      return state.withMutations((state) => {
        state.set('isFetching', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', null);

        state.set('items', state.get('items').push(...processBlogItems(action.payload.items)));
        state.set('pageToken', action.payload.pageToken)
        return state;
      });
    }
    case POSTS_FAILED: {
      return state.withMutations((state) => {
        state.set('isFetching', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', action.payload.err);
        return state;
      });
    }
    default:
      return state
  }
}


function processBlogItems(items = []) {
  return items.map((item, i) => {
    return {
        id: item.id,
        title: item.title,
        url: item.url,
        slug: getSlugFromUrl(item.url),
        content: item.content,
        date: item.published,
        tags: item.labels
    };
  });
}


function getSlugFromUrl(url) {
  var name = url.split('/').slice(-1)[0];
  if(name.indexOf('.' >= 0)) {
      name = name.substr(0, name.lastIndexOf('.'));
  }
  return name;
}
