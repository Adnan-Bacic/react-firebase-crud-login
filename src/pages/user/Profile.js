import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as functions from '../../redux/functions';
import { Spinner, LineContainer } from '../../components';

const Profile = () => {
  const isLoading = useSelector((state) => { return state.isLoading; });
  const user = useSelector((state) => { return state.user; });

  useEffect(() => {
    const getCurrentUser = async () => {
      if (user.userData === null) {
        return;
      }

      functions.isLoading.setIsLoading(true);

      await functions.user.getProfileData();

      functions.isLoading.setIsLoading(false);
    };

    getCurrentUser();
  }, [user.userData]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Profile</h1>
          </div>
        </div>
      </div>
      <LineContainer />
      {isLoading.isLoadingState && (
        <Spinner />
      )}
      {user.profileData && (
        <>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <p>
                  {`Name: ${user.profileData.name}`}
                </p>
                <p>
                  {`Email: ${user.profileData.email}`}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
