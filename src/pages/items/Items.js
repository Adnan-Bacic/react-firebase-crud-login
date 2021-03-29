import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase/config';
// import { Link } from 'react-router-dom';

import Item from '../../components/item/Item';
import AddItem from '../../components/item/AddItem';
// import DeleteItem from '../DeleteItem';

const Items = () => {
  const [firebaseRes, setFirebaseRes] = useState(null);
  const [noDataMsg, setNoDataMsg] = useState(null);
  // const [firebaseRealTime, setFirebaseRealTime] = useState([])

  useEffect(() => {
    const getFirebaseData = async () => {
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
    };

    getFirebaseData();
  }, []);

  return (
    <>
      <AddItem />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <hr />
          </div>
        </div>
      </div>
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
