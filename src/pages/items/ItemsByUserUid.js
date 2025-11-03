import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as functions from '../../redux/functions';
import { Spinner, LineContainer } from '../../components';

const ItemsByUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const users = useSelector((state) => { return state.users; });

  const params = useParams();

  useEffect(() => {
    const getItemsByUserUid = async () => {
      setIsLoading(true);

      await functions.users.getAllItemsByUserUid(params.uid);

      setIsLoading(false);
    };
    
    getItemsByUserUid();
  }, [params.uid]);

  return (
    <>
      <div className="container">
        <div className="row">
          <h1 className="col-12">
            {`Items by ${params.uid}`}
          </h1>
        </div>
      </div>
      <LineContainer />
      {isLoading && (
        <Spinner />
      )}
      {users.itemsByUser && (
        <div className="container">
          <div className="row">
            {users.itemsByUser.map((item) => {
              return (
                <div className="card col-lg-3 col-sm-12 mx-3 mb-3" key={item.id}>
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{item.subtitle}</h6>
                    <p>{item.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ItemsByUser;
