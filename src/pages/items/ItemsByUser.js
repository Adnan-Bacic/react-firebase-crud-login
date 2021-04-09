import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import * as functions from '../../redux/functions';
import { Spinner, LineContainer } from '../../components';

const ItemsByUser = ({ match, location }) => {
  const isLoading = useSelector((state) => { return state.isLoading; });
  const users = useSelector((state) => { return state.users; });

  useEffect(() => {
    // console.log('match', match.params.email);
    // console.log('param(state) of user', location.state.id);

    const getItemsByUser = async () => {
      functions.isLoading.setIsLoading(true);

      await functions.users.getAllItemsByUser(location?.state?.id, match.params.email);

      functions.isLoading.setIsLoading(false);
    };
    
    getItemsByUser();
  }, [location?.state?.id, match.params.email]);

  return (
    <>
      <div className="container">
        <div className="row">
          <h1 className="col-12">
            {`Items by ${match.params.email}`}
          </h1>
        </div>
      </div>
      <LineContainer />
      {isLoading.isLoadingState && (
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

ItemsByUser.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object,
};

ItemsByUser.defaultProps = {
  location: {},
};

export default ItemsByUser;
