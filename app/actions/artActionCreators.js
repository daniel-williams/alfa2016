import fetch from 'isomorphic-fetch';
import {checkStatus, toJSON} from './fetch-helper';
import Firebase from 'firebase';
import {
  ART_REQUESTED,
  ART_SUCCESS,
  ART_FAILED,
} from '.';


const firebaseDb = new Firebase('https://blistering-torch-4532.firebaseio.com/');

export function fetchArt() {
  return function(dispatch) {
    dispatch({type: ART_REQUESTED});

    try {
      firebaseDb.child('art').on('value', function(snapshot) {
        var data = snapshot.val();
        data = data
          .map((item) => {
            item.created = new Date(item.created);
            item.ticks = item.created.getTime();
            return item;
          })
          .sort((a, b) => {
            return a.ticks === b.ticks ? 0 : a.ticks > b.ticks ? 1 : -1
          })
          .reverse();

        dispatch({
          type:ART_SUCCESS,
          date: new Date(),
          items: data
        });
      }, function (err) {
        dispatch({
          type:ART_FAILED,
          date: new Date(),
          err: new Error('The read failed: ' + err.code)
        });
      });
    } catch(err) {
      dispatch({
        type:ART_FAILED,
        date: new Date(),
        err: err
      });
    }


  }
}
