/*
import * as React from 'react';
import { auth } from '../../firebase/config';

//const [authUser, setAuthUser] = React.useState(null)

export const checkUserAuthState = () => {
    React.useEffect(() => {
        const userAuthState = () => {
          auth().onAuthStateChanged((user) => {
            if (user) {
              console.log('auth().currentUser', auth().currentUser);
            } else {
              console.warn('no user');
            }
          });
        };
        userAuthState();
      }, []);
      return auth().currentUser
}
*/