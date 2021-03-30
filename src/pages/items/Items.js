import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { firestore } from '../../firebase/config';
import Item from './Item';
import AddItem from './AddItem';
import * as functions from '../../redux/functions';
import { Spinner, LineContainer } from '../../components';

const Items = () => {
  const [firebaseRes, setFirebaseRes] = useState(null);
  const [noDataMsg, setNoDataMsg] = useState(null);
  // const [firebaseRealTime, setFirebaseRealTime] = useState([])

  const isLoading = useSelector((state) => { return state.isLoading; });

  useEffect(() => {
    const getFirebaseData = async () => {
      functions.isLoading.setIsLoading(true);

      try {
        const ref = firestore().collection('items');
  
        const arr = [];

        const data = await ref.get();

        if (data.empty) {
          throw new Error('No data to show');
        }

        data.forEach((doc) => {
          // console.log('doc.data()', doc.data());
          const result = doc.data();
          result.id = doc.id;
          arr.push(result);
        });

        setFirebaseRes(arr);

        // realtime
        /*
        let arrRealtime = []

        await ref.onSnapshot(snapshot => {
          snapshot.forEach(doc => {
            console.log(doc.data())
            const resultRealtime = doc.data()
            resultRealtime.id = doc.id
            arrRealtime.push(resultRealtime)
          })
          setFirebaseRealTime(arrRealtime)
        });
        */
      } catch (err) {
        setNoDataMsg(err);
      }

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
      {firebaseRes && (
        <>
          <div className="container">
            <div className="row">
              {firebaseRes.map((item) => {
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

export default Items;
