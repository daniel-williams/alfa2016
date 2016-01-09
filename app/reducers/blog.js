import {Map, List, fromJS} from 'immutable';

import constants from '../constants';
import {
  BLOG_REQUESTED,
  BLOG_SUCCESS,
  BLOG_FAILED,
  BLOG_PAGE_NEXT,
  BLOG_PAGE_PREV,
} from '../actions';

const initialState = fromJS({
    isFetching: false,
    hasFetched: true,
    lastFetchDate: null,
    lastFetchError: null,
    itemsPerPage: constants.blog && constants.blog.itemsPerPage || 5,
    totalPages: 0,
    activePage: 1,
    postCount: 0,
    meta: null,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case BLOG_REQUESTED: {
      return state.set('isFetching', true);
    }
    case BLOG_SUCCESS: {
      const itemsPerPage = state.get('itemsPerPage');
      const postCount = action.payload.blog.posts.totalItems;
      const totalPages = Math.floor(postCount / itemsPerPage) + 1;
      return state.withMutations((state) => {
        state.set('isFetching', false);
        state.set('hasFetched', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', null);
        state.set('postCount', postCount);
        state.set('totalPages', totalPages);
        state.set('meta', fromJS(action.payload.blog));
        return state;
      });
    }
    case BLOG_FAILED: {
      return state.withMutations((state) => {
        state.set('isFetching', false);
        state.set('hasFetched', false);
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
        }
    });
}


function getSlugFromUrl(url) {
    var name = url.split('/').slice(-1)[0];
    if(name.indexOf('.' >= 0)) {
        name = name.substr(0, name.lastIndexOf('.'));
    }
    return name;
}
