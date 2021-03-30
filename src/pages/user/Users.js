import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { firestore } from '../../firebase/config';
import * as functions from '../../redux/functions';
import UsersItem from './UsersItem';
import { Spinner, LineContainer } from '../../components';

const Users = () => {
  const [firebaseRes, setFirebaseRes] = useState(null);
  const [noDataMsg, setNoDataMsg] = useState(null);

  const isLoading = useSelector((state) => { return state.isLoading; });

  useEffect(() => {
    const getFirebaseData = async () => {
      functions.isLoading.setIsLoading(true);

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

      functions.isLoading.setIsLoading(false);
    };

    getFirebaseData();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Users</h1>
          </div>
        </div>
      </div>
      <LineContainer />
      {isLoading.isLoadingState && (
        <Spinner />
      )}
      {firebaseRes && (
        <div className="container">
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
