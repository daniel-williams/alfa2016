// import Rebase from 're-base';
import fetch from 'isomorphic-fetch';
import Firebase from 'firebase';

import {
  GALLERIES_REQUESTED,
  GALLERIES_RECEIVED,
  UPDATE_GALLERIES,
  ART_REQUESTED,
  ART_RECEIVED,
  UPDATE_ART,
}
from '.';

//var galleries = Rebase.createClass('https://blistering-torch-4532.firebaseio.com/gallery');
//var art = Rebase.createClass('https://blistering-torch-4532.firebaseio.com/art');

var firebaseDb = new Firebase('https://blistering-torch-4532.firebaseio.com/');

export function fetchGalleries() {
  return function(dispatch) { // thunk
    dispatch({
      type: GALLERIES_REQUESTED
    });

    // galleries.fetch('gallery', {
    //     context: {},
    //     asArray: true,
    //     then(data) {
    //         dispatch({type: UPDATE_GALLERIES, galleries: data});
    //         dispatch({type: GALLERIES_RECEIVED});
    //     }
    // });
  }
}

export function fetchArt() {
  return function(dispatch) {
    dispatch({type: ART_REQUESTED});

    firebaseDb.child('art').on('value', function(snapshot) {
      var data = snapshot.val();
      dispatch({type:UPDATE_ART, data: data});
      dispatch({type: ART_RECEIVED});
    });


  }
}
