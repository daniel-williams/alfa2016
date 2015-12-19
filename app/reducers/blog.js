import {Map, List, fromJS} from 'immutable';

import {
    BLOG_REQUESTED,
    BLOG_RECEIVED,
    UPDATE_BLOG
} from '../actions';

const initialState = fromJS({
    isFetching: false,
    items: []
});

export default function(state = initialState, action) {
    switch(action.type) {
        case BLOG_REQUESTED:
            return state.set('isFetching', true);
        case UPDATE_BLOG:
            return state.set('items', fromJS(processBlogItems(action.data.items)));
        case BLOG_RECEIVED:
            return state.set('isFetching', false);
        default:
            return state;
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
