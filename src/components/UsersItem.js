import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Items = ({ id, name, email }) => {
  return(
    <>
      <div className="card col-lg-3 col-sm-12 mx-3 mb-3" key={id}>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{email}</h6>
          <Link
            to={{
              pathname: `/items-by-user/${email}`,
              state: { id: id }
            }}
          >See items by this user</Link>
        </div>
      </div>
    </>
  );
};

Items.propTypes  = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};

export default Items;