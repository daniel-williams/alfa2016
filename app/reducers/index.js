// root reducer
import {Map, List, fromJS} from 'immutable';

// reducers
import art from './art';
import blog from './blog';

const initialState = Map({});

export default function(state = initialState, action) {
    return Map({
        art: art(state.get('art'), action),
        blog: blog(state.get('blog'), action),
    });
}
