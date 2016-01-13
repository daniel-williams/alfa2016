import Firebase from '../services/Firebase';
import {
  FEATURE_REQUESTED,
  FEATURE_SUCCESS,
  FEATURE_FAILED,
} from '.';


export function fetchFeature() {
  return function(dispatch) {
    dispatch({
      type: FEATURE_REQUESTED
    });

    Firebase.fetch('feature')
      .then(data => {
        dispatch({
          type: FEATURE_SUCCESS,
          payload: {
            date: new Date(),
            feature: data
          }
        });
      })
      .catch((err) => {
        dispatch({
          type: FEATURE_FAILED,
          payload: {
            date: new Date(),
            err: err
          }
        });
      });

  }
}
