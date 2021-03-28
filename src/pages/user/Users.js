import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase/config';

import UsersItem from '../../components/user/UsersItem';

const Users = () => {
  const [firebaseRes, setFirebaseRes] = useState([]);
  const [noDataMsg, setNoDataMsg] = useState('');

  useEffect(() => {
    const getFirebaseData = async () => {
      try{
        const ref = firestore().collection('users');
  
        let arr = [];

        const data = await ref.get();
        if(!data.empty){
          data.forEach(doc => {
            //console.log('doc.data()', doc.data());
            const result = doc.data();
            result.id = doc.id;
            arr.push(result);
          });
          setFirebaseRes(arr);
        } else {
          setNoDataMsg('No users in the database');
        }
      }
      catch(err){
        console.error('err', err);
      }
    };

    getFirebaseData();
  }, []);

  return(
    <>
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
          {firebaseRes && (
            firebaseRes.map(item => {
              return(
                <UsersItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  email={item.email}
                />
              );
            })
          )}
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

export default Users;