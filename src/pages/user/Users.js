import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { firestore } from '../../firebase/config';
import * as functions from '../../redux/functions';
import UsersItem from './UsersItem';
import { Spinner, LineContainer } from '../../components';

const Users = () => {
  const isLoading = useSelector((state) => { return state.isLoading; });
  const users = useSelector((state) => { return state.users; });
  console.log('u', users.usersList);

  useEffect(() => {
    const getFirebaseData = async () => {
      functions.isLoading.setIsLoading(true);

      await functions.users.getAllUsers();

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
      {users.usersList && (
        <div className="container">
          <div className="row">
            {users.usersList.map((item) => {
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
    </>
  );
};

export default Users;
