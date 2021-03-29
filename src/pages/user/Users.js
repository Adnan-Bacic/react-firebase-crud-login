import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase/config';

import UsersItem from '../../components/user/UsersItem';

const Users = () => {
  const [firebaseRes, setFirebaseRes] = useState(null);
  const [noDataMsg, setNoDataMsg] = useState(null);

  useEffect(() => {
    const getFirebaseData = async () => {
      try {
        const ref = firestore().collection('users');
  
        const arr = [];

        const data = await ref.get();

        if (data.empty) {
          throw new Error('No users');
        }

        data.forEach((doc) => {
          // console.log('doc.data()', doc.data());
          const result = doc.data();
          result.id = doc.id;
          arr.push(result);
        });
        
        setFirebaseRes(arr);
      } catch (err) {
        setNoDataMsg(err);
      }
    };

    getFirebaseData();
  }, []);

  return (
    <>
      {firebaseRes && (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>Users</h1>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <hr />
              </div>
            </div>
          </div>
          <div className="row">
            {firebaseRes.map((item) => {
              return (
                <UsersItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  email={item.email}
                />
              );
            })}
          </div>
        </div>
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

export default Users;
