import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Item from './Item';
import AddItem from './AddItem';
import * as functions from '../../redux/functions';
import { Spinner, LineContainer } from '../../components';

const Items = () => {
  const isLoading = useSelector((state) => { return state.isLoading; });
  const items = useSelector((state) => { return state.items; });

  useEffect(() => {
    const getFirebaseData = async () => {
      functions.isLoading.setIsLoading(true);

      await functions.items.getAllItems();

      functions.isLoading.setIsLoading(false);
    };

    getFirebaseData();
  }, []);

  return (
    <>
      <AddItem />
      <LineContainer />
      {isLoading.isLoadingState && (
        <Spinner />
      )}
      {items.firebaseItems && (
        <>
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
        </>
      )}
    </>
  );
};

export default Items;
