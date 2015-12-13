import Rebase from 're-base';
import {
    GALLERIES_REQUESTED,
    GALLERIES_RECEIVED,
    UPDATE_GALLERIES,
    ART_REQUESTED,
    ART_RECEIVED,
    UPDATE_ART,
} from '.';

var galleries = Rebase.createClass('https://blistering-torch-4532.firebaseio.com/gallery');
var art = Rebase.createClass('https://blistering-torch-4532.firebaseio.com/art');

export function fetchGalleries() {
    return function(dispatch) { // thunk
        dispatch({type: GALLERIES_REQUESTED});

        galleries.fetch('gallery', {
            context: {},
            asArray: true,
            then(data) {
                dispatch({type: UPDATE_GALLERIES, galleries: data});
                dispatch({type: GALLERIES_RECEIVED});
            }
        });
    }
}

export function fetchArt() {
    return function(dispatch) {
        dispatch({type: ART_REQUESTED});

        art.fetch('art', {
            context: {},
            asArray: true,
            then(data) {
                dispatch({type: UPDATE_ART, art: data});
                dispatch({type: ART_RECEIVED});
            }
        });
    }
}
