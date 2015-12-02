import {List, Map} from 'immutable';

function setState(state, newState) {
    return state.merge(newState);
}

function setOption(state, option) {
    if(option) {
        return state.set('userOption', option);
    } else {
        return state;
    }
}

export default function(state = Map(), action) {
    switch(action.type) {
        case 'SET_STATE':
            return setState(state, action.state);
        case 'SET_OPTION':
            return setOption(state, action.option);
    }
    return state;
}
