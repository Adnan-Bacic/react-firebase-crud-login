import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { firestore } from '../../firebase/config';

const ItemsByUser = ({ match, location }) => {

  const [itemsByUser, setItemsByUser] = useState([]);
  const [noDataMsg, setNoDataMsg] = useState('');

  useEffect(() => {
    //console.log(match)
    //console.log('param(state) of user', location.state);

    //if people change the url manually then location.state.id is undefined. and undefined values cannot be use in firebase queries.
    //so just replace it with anything really. any string value just so we can handle errors
    const userId = location?.state?.id || Math.random().toString();
    //console.log(userId)

    try{
      const getItemsByUser = async () => {
        //first check if userid exists. should only happen if people manually edit the url
        const userRef = await firestore().collection('users').doc(userId).get();

        //if ther is a user
        if(userRef?.exists){
          const ref = firestore().collection('items').where('createdBy', '==', match.params.email);

          const data = await ref.get();
  
          let arr = [];
    
          if(!data.empty){
            data.forEach(doc => {
              //console.log('doc.data()', doc.data());
              const result = doc.data();
              result.id = doc.id;
              arr.push(result);
            });
            setItemsByUser(arr);
          } else {
            setNoDataMsg('No items for this user');
          }
          //no, user
        } else {
          setNoDataMsg('No user with this email');
        }
      };
      getItemsByUser();
    }
    catch(err){
      console.log(err);
    }
  }, []);

  return(
    <>
      <div className="container">
        <div className="row">
          <h1 className="col-12">Items by {match.params.email}</h1>
          {itemsByUser.map(item => {
            return(

              <div className="card col-lg-3 col-sm-12 mx-3 mb-3" key={item.id}>
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{item.subtitle}</h6>
                  <p>{item.body}</p>
                </div>
              </div>
            );
          })}
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

ItemsByUser.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object
};

ItemsByUser.defaultProps = {
  location: {},
};

export default ItemsByUser;