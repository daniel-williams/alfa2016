import Firebase from 'firebase';

import constants from '../constants';


export default {
  fetch: function(query) {
    let firebaseRoot = new Firebase(constants.firebase.host);
    return new Promise((resolve, reject) => {

        firebaseRoot.child(query)
          .on('value', function(snapshot) {
            resolve(snapshot.val());
          }, function(err) {
            reject(err);
          });
    })
  }
}
