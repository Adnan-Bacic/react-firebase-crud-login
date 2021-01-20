import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase/config';
//import { Link } from 'react-router-dom';

import Items from '../Items';
import AddItem from '../AddItem';
//import DeleteItem from '../DeleteItem';

const Index = () => {
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
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>React Firebase</h1>
          </div>
          <div className="col-12 mb-3">
            <AddItem />
          </div>
        </div>
        <hr />
        <div className="row">
          {firebaseRes && (
            firebaseRes.map(item => {
              return(
                <Items
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  subtitle={item.subtitle}
                  createdBy={item.createdBy}
                />
              /*
                <div className="card col-3 mx-3 mb-3" key={item.id}>
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{item.subtitle}</h6>
                    <Link to={`/edit/${item.id}`}>Edit</Link>
                    <hr />
                    <DeleteItem id={item.id} />
                  </div>
                </div>
                */
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

export default Index;