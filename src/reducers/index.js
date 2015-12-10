import {Map, List, fromJS} from 'immutable';

import INITIAL_STATE from '../store/initialState';

import book from './book';
import chapter from './chapter';

export default function(state = INITIAL_STATE, action) {
    var ret = Map({
        book: book(state.get('book'), action)
    });
    return ret.updateIn(['book', 'chapters'], () => chapter(ret.getIn(['book', 'chapters']), action));
}
