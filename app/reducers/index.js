// root reducer
import {Map, List, fromJS} from 'immutable';

import INITIAL_STATE from '../store/initialState';

// reducers
import galleries from './galleries';
import art from './art';
import blog from './blog';

export default function(state = INITIAL_STATE, action) {
    return Map({
        galleries: galleries(state.get('galleries'), action),
        art: art(state.get('art'), action),
        blog: blog(state.get('blog'), action),
    });
}
