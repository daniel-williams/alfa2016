// root reducer
import {Map, List, fromJS} from 'immutable';

// reducers
import art from './art';
import blog from './blog';
import contact from './contact';
import feature from './feature';
import inquiry from './inquiry';
import post from './post';
import show from './show';
import subscribe from './subscribe';
import user from './user';

const initialState = Map({});

export default function(state = initialState, action) {
  return Map({
    art: art(state.get('art'), action),
    blog: blog(state.get('blog'), action),
    contact: contact(state.get('contact'), action),
    feature: feature(state.get('feature'), action),
    inquiry: inquiry(state.get('inquiry'), action),
    post: post(state.get('post'), action),
    show: show(state.get('show'), action),
    subscribe: subscribe(state.get('subscribe'), action),
    user: user(state.get('user'), action),
  });
}
