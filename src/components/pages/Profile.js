import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../../firebase/config';

const Profile = () => {

  const [userData, setUserData] = useState({});
  const [noDataMsg, setNoDataMsg] = useState('');

  //TODO: ERROR WHEN RELOADING
  useEffect(() => {

    //if people go to the url manually auth().currentUser is null
    //so just replace it with anything really. any string value just so we can handle errors
    const userId = auth()?.currentUser?.uid || Math.random().toString();

    try{
      const getCurrentUser = async () => {
        console.log('profile au', auth()?.currentUser);
        const doc = await firestore().collection('users').doc(userId).get();
    
        if(doc?.exists){
          console.log('profile', doc.data());
          setUserData(doc.data());
        } else {
          console.log('no profile');
          setNoDataMsg('You are not logged ind');
        }
      };
      getCurrentUser();
    }
    catch(err){
      console.log(err);
    }
  }, []);

  return(
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Profile</h1>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
          </div>
          <div className="col-12">
            {noDataMsg && (
              <p>{noDataMsg}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;