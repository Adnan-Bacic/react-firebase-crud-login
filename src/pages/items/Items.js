import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Item from './Item';
import AddItem from './AddItem';
import * as functions from '../../redux/functions';
import { Spinner, LineContainer } from '../../components';

const Items = () => {
  const [isLoading, setIsLoading] = useState(false);

  const items = useSelector((state) => { return state.items; });

  useEffect(() => {
    const getFirebaseData = async () => {
      setIsLoading(true);

      await functions.items.getAllItems();

      setIsLoading(false);
    };

    getFirebaseData();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>React Firebase</h1>
          </div>
        </div>
      </div>
      <AddItem />
      <LineContainer />
      {isLoading && (
        <Spinner />
      )}
      {items.firebaseItems && (
        <div className="container">
          <div className="row">
            {items.firebaseItems.map((item) => {
              return (
                <Item
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  subtitle={item.subtitle}
                  createdBy={item.createdBy}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Items;
