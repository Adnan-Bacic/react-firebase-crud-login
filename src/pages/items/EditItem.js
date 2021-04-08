import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { firestore, auth } from '../../firebase/config';
import * as functions from '../../redux/functions';
import { Spinner, Line, LineContainer } from '../../components';

const EditItem = ({ match }) => {
  const [specificItem, setSpecificItem] = useState(null);

  const isLoading = useSelector((state) => { return state.isLoading; });
  const items = useSelector((state) => { return state.items; });
  const user = useSelector((state) => { return state.user; });

  const history = useHistory();

  useEffect(() => {
    // console.log(match)
    const getOneItem = async () => {
      functions.isLoading.setIsLoading(true);

      await functions.items.getSingleItem(match.params.id);

      functions.isLoading.setIsLoading(false);
    };

    getOneItem();
  }, [match.params.id]);

  const onChangeHandler = (e) => {
    const { target } = e;
    const { value } = target;
    const { name } = target;

    setSpecificItem({
      ...specificItem,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    await functions.items.editItem(match.params.id, specificItem.title, specificItem.subtitle, specificItem.body);
    history.go(0);
  };

  return (
    <>
      {isLoading.isLoadingState && (
        <Spinner />
      )}
      {items.singleItem && (
        <>
          <div className="container">
            <div className="row">
              <div className="col-12 mx-auto">
                <div className="jumbotron mt-3">
                  <h1 className="display-4">{items.singleItem?.title}</h1>
                  <p className="lead">{items.singleItem?.subtitle}</p>
                  <Line />
                  <p>{items.singleItem?.body}</p>
                  <Line />
                  <p>
                    {`Made by: ${items.singleItem?.createdBy}`}
                  </p>
                  <p className="lead">
                    <Link to="/">Go back to frontpage</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <LineContainer />
          
      {isLoading.isLoadingState && (
        <Spinner />
      )}
      {user?.userData?.email === items.singleItem?.createdBy && (
        <div className="container">
          <div className="row">
            <div className="col-12 mx-auto">
              <h1>Edit item</h1>
              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input type="text" name="title" value={specificItem?.title} onChange={onChangeHandler} className="form-control" id="title" />
                </div>
                <div className="form-group">
                  <label htmlFor="subtitle">Subtitle</label>
                  <input type="text" name="subtitle" value={specificItem?.subtitle} onChange={onChangeHandler} className="form-control" id="subtitle" />
                </div>
                <div className="form-group">
                  <label htmlFor="body">Body</label>
                  <input type="text" name="body" value={specificItem?.body} onChange={onChangeHandler} className="form-control" id="body" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <p className="lead">
                  <Link to="/">Go back to frontpage</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

EditItem.propTypes = {
  match: PropTypes.object.isRequired,
};

export default EditItem;
