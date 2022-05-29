import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import AuthContext from '../../store/auth-context';

import classes from './AuthForm.module.scss';

const AuthForm = () => {
  const navigate = useNavigate();

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    let reqBody = {
      emailId: enteredEmail,
      password: enteredPassword
    }

    setIsLoading(true);

    if (isLogin) {
      api.post('/api/auth/login', reqBody).then(res => {
        setIsLoading(false);
        console.log(res.data);

        const expirationTime = new Date(new Date().getTime() + 3600000);
        authCtx.login(res.data.jwtToken, expirationTime.toISOString());

        navigate('/profile');
      }).catch(err => console.log(err));
    } else {
      const enteredFirstName = firstNameInputRef.current.value;
      const enteredLastName = lastNameInputRef.current.value;

      reqBody = {
        ...reqBody,
        firstName: enteredFirstName,
        lastName: enteredLastName
      }

      api.post('api/auth/register', reqBody).then(res => {
        setIsLoading(false);
        switchAuthModeHandler();

        console.log(res);
      }).catch(err => console.log(err));
    }
  }

  return (
    <section className={`${classes.auth} box`}>
      <h1 className='subtitle'>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler} className='form'>
        {!isLogin && <>
          <div className='field is-horizontal'>
            <label className='field-label is-normal' htmlFor='firstName'>First Name</label>
            <div className='field-body'>
              <div className='field'>
                <div className='control'>
                  <input className='input is-info' type='firstName' id='firstName' required ref={firstNameInputRef} />
                </div>
              </div>
            </div>
          </div>
          <div className='field is-horizontal'>
            <label className='field-label is-normal' htmlFor='lastName'>Last Name</label>
            <div className='field-body'>
              <div className='field'>
                <div className='control'>
                  <input className='input is-info' type='lastName' id='lastName' required ref={lastNameInputRef} />
                </div>
              </div>
            </div>
          </div>
        </>}
        <div className='field is-horizontal'>
          <label className='field-label is-normal' htmlFor='email'>Your Email</label>
          <div className='field-body'>
            <div className='field'>
              <div className='control'>
                <input className='input is-info' type='email' id='email' required ref={emailInputRef} />
              </div>
            </div>
          </div>
        </div>
        <div className='field is-horizontal'>
          <label className='field-label is-normal' htmlFor='password'>Your Password</label>
          <div className='field-body'>
            <div className='field'>
              <div className='control'>
                <input className='input is-info' type='password' id='password' required ref={passwordInputRef} />
              </div>
            </div>
          </div>
        </div>
        <div className={classes.actions}>
          <div className='field'>
            {!isLoading && <div className='control'>
              <button className='button is-link'>
                {isLogin ? 'Login' : 'Create Account'}
              </button>
            </div>}
          </div>
          <div className='field'>
            <div className='control'>
              <button type='button' className='button is-link is-light' onClick={switchAuthModeHandler}>
                {isLogin ? 'Create new account' : 'Login with existing account'}
              </button>
            </div>
          </div>
        </div>
        <div>
          {isLoading && <p>sending request...</p>}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
