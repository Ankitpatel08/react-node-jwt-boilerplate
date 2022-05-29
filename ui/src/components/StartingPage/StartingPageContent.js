import classes from './StartingPageContent.module.scss';
import AuthContext from '../../store/auth-context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const StartingPageContent = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <section className='box'>
      <h1>Welcome on Board!</h1>
      {!isLoggedIn && <button className='button is-light'>
        <Link to='/auth'>Login</Link>
      </button>}
      {isLoggedIn && <button className='button is-light'>
        <Link to='/profile'>Profile</Link>
      </button>}
    </section>
  );
};

export default StartingPageContent;
