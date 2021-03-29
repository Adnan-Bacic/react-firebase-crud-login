import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { firestore } from '../../firebase/config';

const ItemsByUser = ({ match, location }) => {
  const [itemsByUser, setItemsByUser] = useState(null);
  const [noDataMsg, setNoDataMsg] = useState(null);

  useEffect(() => {
    // console.log(match)
    // console.log('param(state) of user', location.state);

    const getItemsByUser = async () => {
      try {
        // if people change the url manually then location.state.id is undefined. and undefined values cannot be use in firebase queries.
        const userId = location?.state?.id;

        if (!userId) {
          throw new Error('Invalid query');
        }

        // first check if userid exists. should only happen if people manually edit the url
        const userRef = await firestore().collection('users').doc(userId).get();

        if (!userRef.exists) {
          throw new Error('This user does not exist');
        }

        // if there is a user
        const ref = firestore().collection('items').where('createdBy', '==', match.params.email);

        const data = await ref.get();
  
        const arr = [];
    
        if (data.empty) {
          throw new Error('No items for this user');
        }

        data.forEach((doc) => {
          // console.log('doc.data()', doc.data());
          const result = doc.data();
          result.id = doc.id;
          arr.push(result);
        });

        setItemsByUser(arr);
      } catch (err) {
        setNoDataMsg(err);
      }
    };
    
    getItemsByUser();
  }, [location?.state?.id, match.params.email]);

  return (
    <>
      {itemsByUser && (
        <div className="container">
          <div className="row">
            <h1 className="col-12">
              Items by
              {match.params.email}
            </h1>
            {itemsByUser.map((item) => {
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

ItemsByUser.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object,
};

ItemsByUser.defaultProps = {
  location: {},
};

export default ItemsByUser;
