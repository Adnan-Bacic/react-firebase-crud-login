import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { auth, firestore } from '../../firebase/config';
import * as functions from '../../redux/functions';
import { Spinner, LineContainer } from '../../components';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [noDataMsg, setNoDataMsg] = useState(null);

  const isLoading = useSelector((state) => { return state.isLoading; });

  // TODO: ERROR WHEN RELOADING
  useEffect(() => {
    const getCurrentUser = async () => {
      functions.isLoading.setIsLoading(true);

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

      await isLoading.setIsLoading(false);
    };

    getCurrentUser();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Profile</h1>
          </div>
        </div>
      </div>
      <LineContainer />
      {isLoading.isLoadingState && (
        <Spinner />
      )}
      {userData && (
        <>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <p>
                  {`Name: ${userData.name}`}
                </p>
                <p>
                  {`Email: ${userData.email}`}
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
