import fetch from 'isomorphic-fetch';
import {checkStatus, toJSON} from './fetch-helper';
import Firebase from 'firebase';
import {
  ART_REQUESTED,
  ART_SUCCESS,
  ART_FAILED,
}
from '.';


const firebaseDb = new Firebase('https://blistering-torch-4532.firebaseio.com/');

export function fetchArt() {
  return function(dispatch) {
    dispatch({type: ART_REQUESTED});

    try {

      firebaseDb.child('art').on('value', function(snapshot) {
        dispatch({type:ART_SUCCESS, date: new Date(), items: snapshot.val()});
      }, function (err) {
        dispatch({type:ART_FAILED, date: new Date(), err: new Error('The read failed: ' + err.code)})
      });

    } catch(err) {
      dispatch({type:ART_FAILED, date: new Date(), err: err})
    }


  }
}
