import { useState, useEffect, useContext } from 'react';
import api from '../../api/api';

import classes from './UserProfile.module.scss';

const UserProfile = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    api.post('/api/user/details', {
    }).then(res => {
      console.log(res.data);
      setUserData(res.data);
    }).catch(err => {
      console.log(err);
    })
  }, []);

  return (
    <section className={`${classes.profile} box`}>
      {userData && <>
        <div className="tile is-ancestor">
          <div className='tile is-vertical is-parent'>
            <div className='tile is-child is-info notification'>
              <div className='title'>FirstName</div>
              <div className='subtitle'>{userData.firstName}</div>
            </div>
            <div className='tile is-child is-info notification'>
              <div className='title'>LastName</div>
              <div className='subtitle'>{userData.lastName}</div>
            </div>
            <div className='tile is-child is-warning notification'>
              <div className='title'>email</div>
              <div className='subtitle'>{userData.emailId}</div>
            </div>
          </div>
        </div>
      </>}
    </section>
  );
};

export default UserProfile;
