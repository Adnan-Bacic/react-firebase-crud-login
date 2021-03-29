import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../../firebase/config';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [noDataMsg, setNoDataMsg] = useState(null);

  // TODO: ERROR WHEN RELOADING
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        // if people go to the url manually auth().currentUser is null
        const userId = auth()?.currentUser?.uid;

        if (!userId) {
          throw new Error('Invalid query');
        }

        const doc = await firestore().collection('users').doc(userId).get();
    
        if (!doc.exists) {
          throw new Error('No user info');
        }

        setUserData(doc.data());
      } catch (err) {
        setNoDataMsg(err);
      }
    };

    getCurrentUser();
  }, []);

  return (
    <>
      {userData && (
        <>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1>Profile</h1>
                <p>
                  Name:
                  {userData.name}
                </p>
                <p>
                  Email:
                  {userData.email}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      {noDataMsg && (
        <>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2>{noDataMsg.name}</h2>
                <p>{noDataMsg.message}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
