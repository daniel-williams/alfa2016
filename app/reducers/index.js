// root reducer
import {Map, List, fromJS} from 'immutable';

// reducers
import art from './art';
import blog from './blog';
import show from './show';
import feature from './feature';
import contact from './contact';

const initialState = Map({});

export default function(state = initialState, action) {
  return Map({
    show: show(state.get('show'), action),
    feature: feature(state.get('feature'), action),
    art: art(state.get('art'), action),
    blog: blog(state.get('blog'), action),
    contact: contact(state.get('contact'), action),
  });
}
