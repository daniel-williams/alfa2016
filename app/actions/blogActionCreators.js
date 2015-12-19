import fetch from 'isomorphic-fetch';
import {
    BLOG_REQUESTED,
    BLOG_RECEIVED,
    UPDATE_BLOG,
} from '.';

const host = 'https://www.googleapis.com/blogger/v3/blogs/';
const blogId = '5080215156052292878';
const apiKey = 'AIzaSyAoTn6DttJFZ5mWGHuqfN5fE1eSvQ0jgaE';

const url = host + blogId + '/posts?maxResults=500&key=' + apiKey;

export function fetchArticleList() {
    return function(dispatch) { // thunk
        dispatch({type: BLOG_REQUESTED});

        fetch(url)
            .then(data => {
                return data.json();
            })
            .then(data => {
                console.log('BLOGGER RESULT:', data);
                dispatch({type: UPDATE_BLOG, data: data});
            })
            .catch(err => console.log('BLOGGER ERROR:', err))
            .then(() => dispatch({type: BLOG_RECEIVED}));
    }
}
