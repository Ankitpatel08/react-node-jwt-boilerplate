import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './MainNavigation.module.scss';

const MainNavigation = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    navigate('/auth');
  }

  const onHamburgerClickHandler = () => {
    setIsOpen(prevState => !prevState);
  }

  return (
    <nav className='navbar' role='navigation'>
      <div className='navbar-brand'>
        <Link to='/'>
          <h2 class='title'>React Node boilerplate</h2>
        </Link>
        <a role='button' className={`navbar-burger ${isOpen ? 'is-active' : ''}`} aria-label='menu' aria-expanded='false' data-target='navbar' onClick={onHamburgerClickHandler}>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
        </a>
      </div>
      <div id='navbar' className={`navbar-menu ${isOpen ? 'is-active' : ''}`}>
          <div className='navbar-start'></div>
          <div className='navbar-end'>
              <div className='buttons'>
                {!isLoggedIn && <li className='button is-light'>
                  <Link to='/auth'>Login</Link>
                </li>}
                {isLoggedIn && <><li className='button is-info'>
                  <Link to='/profile'>Profile</Link>
                </li>
                <li className='button is-danger'>
                  <p onClick={logoutHandler}>Logout</p>
                </li></>}
              </div>
          </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
