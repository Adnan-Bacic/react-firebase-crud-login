import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase/config';
//import { Link } from 'react-router-dom';

import Item from '../../components/item/Item';
import AddItem from '../../components/item/AddItem';
//import DeleteItem from '../DeleteItem';

const Items = () => {
  const [firebaseRes, setFirebaseRes] = useState([]);
  const [noDataMsg, setNoDataMsg] = useState('');
  //const [firebaseRealTime, setFirebaseRealTime] = useState([])

  useEffect(() => {
    const getFirebaseData = async () => {
      try{
        const ref = firestore().collection('items');
  
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
          setNoDataMsg('No data in the database');
        }

        //realtime
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
      }
      catch(err){
        console.error('err', err);
      }
    };

    getFirebaseData();
  }, []);

  return(
    <>
      <AddItem />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <hr />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {firebaseRes && (
            firebaseRes.map(item => {
              return(
                <Item
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  subtitle={item.subtitle}
                  createdBy={item.createdBy}
                />
              );
            })
          )}
        </div>
      </div>
      
      <div className="col-12">
        {noDataMsg && (
          <p>{noDataMsg}</p>
        )}
      </div>
    </>
  );
};

export default Items;