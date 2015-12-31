import fetch from 'isomorphic-fetch';
import {checkStatus, toJSON} from './fetch-helper';
import Firebase from 'firebase';
import {
  SHOW_REQUESTED,
  SHOW_SUCCESS,
  SHOW_FAILED,
  SHOW_NEXT,
  SHOW_PREV,
}
from '.';


const firebaseDb = new Firebase('https://blistering-torch-4532.firebaseio.com/');

export function fetchShow() {
  return function(dispatch) {
    dispatch({type: SHOW_REQUESTED});

    try {
      firebaseDb.child('show').on('value', function(snapshot) {
        var show = snapshot.val();
        dispatch({
          type: SHOW_SUCCESS,
          date: new Date(),
          show: show
        });
      }, function (err) {
        dispatch({
          type: SHOW_FAILED,
          date: new Date(),
          err: new Error('The read failed: ' + err.code)
        });
      });
    } catch(err) {
      dispatch({
        type: SHOW_FAILED,
        date: new Date(),
        err: err
      });
    }


  }
}

export function nextSlide() {
  return function(dispatch) {
    console.log('NEXT');
    dispatch({
      type: SHOW_NEXT
    });
  }
}
export function prevSlide() {
  return function(dispatch) {
    console.log('PREV');
    dispatch({
      type: SHOW_PREV
    });
  }
}
