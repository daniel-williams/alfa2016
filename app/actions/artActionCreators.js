import Firebase from '../services/Firebase';
import {
  ART_REQUESTED,
  ART_SUCCESS,
  ART_FAILED,
} from '.';


export function fetchArt() {
  return function(dispatch) {
    dispatch({
      type: ART_REQUESTED
    });

    Firebase.fetch('art')
      .then(data => {
        data.map((item) => {
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
          payload: {
            date: new Date(),
            items: data
          }
        });
      })
      .catch((err) => {
        dispatch({
          type:ART_FAILED,
          payload: {
            date: new Date(),
            err: new Error('The read failed: ' + err.code)
          }
        });
      });

  }
}
