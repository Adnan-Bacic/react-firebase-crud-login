import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { Line } from '../../components';
import DeleteItem from './DeleteItem';

const Item = ({
  id, title, subtitle, createdBy,
}) => {
  return (
    <>
      <div className="card col-lg-3 col-sm-12 mx-3 mb-3" key={id}>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
          <Link to={`/edit/${id}`}>See more</Link>
          <Line />
          <p>{createdBy}</p>
          {auth()?.currentUser?.email === createdBy && (
            <DeleteItem id={id} createdBy={createdBy} />
          )}
        </div>
      </div>
    </>
  );
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  createdBy: PropTypes.string.isRequired,
};

export default Item;