import {Map, List, fromJS} from 'immutable';

import {
  POSTS_REQUESTED,
  POSTS_SUCCESS,
  POSTS_FAILED,
} from '../actions';

const initialState = fromJS({
    isFetching: false,
    hasFetched: true,
    lastFetchDate: null,
    lastFetchError: null,
    items: [],
    pageToken: null,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case POSTS_REQUESTED: {
      return state.set('isFetching', true);
    }
    case POSTS_SUCCESS: {
      return state.withMutations((state) => {
        state.set('isFetching', false);
        state.set('hasFetched', false);
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
        state.set('hasFetched', false);
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
