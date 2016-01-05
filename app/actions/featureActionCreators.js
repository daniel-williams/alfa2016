import fetch from 'isomorphic-fetch';
import {checkStatus, toJSON} from './fetch-helper';
import Firebase from 'firebase';
import {
  FEATURE_REQUESTED,
  FEATURE_SUCCESS,
  FEATURE_FAILED,
  FEATURE_NEXT,
  FEATURE_PREV,
} from '.';


const firebaseDb = new Firebase('https://blistering-torch-4532.firebaseio.com/');

export function fetchFeature() {
  return function(dispatch) {
    dispatch({type: FEATURE_REQUESTED});

    try {
      firebaseDb.child('feature').on('value', function(snapshot) {
        var feature = snapshot.val();
        dispatch({
          type: FEATURE_SUCCESS,
          date: new Date(),
          feature: feature
        });
      }, function (err) {
        dispatch({
          type: FEATURE_FAILED,
          date: new Date(),
          err: new Error('The read failed: ' + err.code)
        });
      });
    } catch(err) {
      dispatch({
        type: FEATURE_FAILED,
        date: new Date(),
        err: err
      });
    }

  }
}
