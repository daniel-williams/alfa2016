import {Map, List, fromJS} from 'immutable';

import {
    BLOG_REQUESTED,
    BLOG_SUCCESS,
    BLOG_FAILED
} from '../actions';

const initialState = fromJS({
    isFetching: false,
    isStale: true,
    lastFetchDate: null,
    lastFetchError: null,
    items: [],
    page: 1,
    nextPageToken: null
});

export default function(state = initialState, action) {
    switch(action.type) {
        case BLOG_REQUESTED:
            return state.set('isFetching', true);
        case BLOG_SUCCESS:
            return state.withMutations((state) => {
              state.set('isFetching', false);
              state.set('isStale', false);
              state.set('lastFetchDate', action.date);
              state.set('lastFetchError', null);
              state.set('items', fromJS(processBlogItems(action.items)));
              state.set('nextPageToken', action.nextPageToken);
              return state;
            });
        case BLOG_FAILED:
            return state.withMutations((state) => {
              state.set('isFetching', false);
              state.set('isStale', false);
              state.set('lastFetchDate', action.date);
              state.set('lastFetchError', action.err);
              return state;
            });
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
