import Firebase from '../services/Firebase';
import {
  SHOW_REQUESTED,
  SHOW_SUCCESS,
  SHOW_FAILED,
  SHOW_NEXT,
  SHOW_PREV,
}
from '.';


export function fetchShow() {
  return function(dispatch) {
    dispatch({
      type: SHOW_REQUESTED
    });

    Firebase.fetch('show')
      .then(data => {
        dispatch({
          type: SHOW_SUCCESS,
          payload: {
            date: new Date(),
            show: data
          }
        });
      })
      .catch(err => {
        dispatch({
          type: SHOW_FAILED,
          payload: {
            date: new Date(),
            err: new Error('The read failed: ' + err.code)
          }
        });
      });

  }
}

export function nextSlide() {
  return {
    type: SHOW_NEXT
  };
}
export function prevSlide() {
  return {
    type: SHOW_PREV
  };
}
