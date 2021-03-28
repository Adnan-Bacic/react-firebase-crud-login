import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { firestore, auth } from '../../firebase/config';
import { Link } from 'react-router-dom';

const EditItem = ({ match }) => {

  const [specificItem, setSpecificItem] = useState({
    title: '',
    subtitle: '',
    body: '',
    createdBy: ''
  });
  const [noDataMsg, setNoDataMsg] = useState('');

  useEffect(() => {
    //console.log(match)

    try{
      const getOneItem = async () => {
        const ref = firestore().collection('items').doc(match.params.id);
    
        const doc = await ref.get();
  
        if(doc.exists){
          //console.log(doc.data());
          setSpecificItem(doc.data());
        } else {
          setNoDataMsg('No item with this id');
        }
      };
      getOneItem();
    }
    catch(err){
      console.log(err);
    }
  }, []);

  const onChangeHandler = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setSpecificItem({
      ...specificItem,
      [name]: value
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try{
      if(auth()?.currentUser?.email === specificItem.createdBy){
        const ref = firestore().collection('items').doc(match.params.id);

        await ref.update({
          title: specificItem.title,
          subtitle: specificItem.subtitle,
          body: specificItem.body,
        });

        //TODO: ERROR HERE ONLINE
        location.reload();
      } else {
        console.log('you cannot delete other peoples posts');
      }
    }
    catch(err){
      console.error('err:', err);
    }
  };

  return(
    <>
      <div className="container">
        <div className="row">
          {specificItem && (
            <div className="col-12 mx-auto">
              <div className="jumbotron mt-3">
                <h1 className="display-4">{specificItem.title}</h1>
                <p className="lead">{specificItem.subtitle}</p>
                <hr className="my-4" />
                <p>{specificItem.body}</p>
                <hr />
                <p>Made by: {specificItem.createdBy}</p>
                <p className="lead">
                  <Link to="/">Go back to frontpage</Link>
                </p>
              </div>
            </div>
          )}
          <div className="col-12">
            {noDataMsg}
          </div>
        </div>
        <hr />
        {specificItem && (
          <>
            {auth()?.currentUser?.email === specificItem.createdBy && (
              <>
                <div className="row">
                  <div className="col-12 mx-auto">
                    <>
                      <h1>Edit item</h1>
                      <form onSubmit={submitHandler}>
                        <div className="form-group">
                          <label htmlFor="title">Title</label>
                          <input type="text" name="title" value={specificItem.title} onChange={onChangeHandler} className="form-control" id="title" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="subtitle">Subtitle</label>
                          <input type="text" name="subtitle" value={specificItem.subtitle} onChange={onChangeHandler} className="form-control" id="subtitle" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="body">Body</label>
                          <input type="text" name="body" value={specificItem.body} onChange={onChangeHandler} className="form-control" id="body" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <p className="lead">
                          <Link to="/">Go back to frontpage</Link>
                        </p>
                      </form>
                    </>
                  </div>
          
                </div>
              </>
            )}
          </>
              
        )}
      </div>
    </>
  );
};

EditItem.propTypes = {
  match: PropTypes.object.isRequired,
};

export default EditItem;