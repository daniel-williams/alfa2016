// root reducer
import {Map, List, fromJS} from 'immutable';
import INITIAL_STATE from '../store/initialState';

import galleries from './galleries';

export default function(state = INITIAL_STATE, action) {
    var ret = Map({
        galleries: galleries(state.get('galleries'), action),
    });
    return ret;
}
