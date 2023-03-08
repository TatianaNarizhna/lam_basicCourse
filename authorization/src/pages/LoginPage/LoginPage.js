import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authOperations from '../../auth/authOperation';
import Navbar from '../../modules/Navbar/Navbar';
import LoginForm from '../../modules/LoginForm/LoginForm';
import Spinner from '../../modules/Loader/Loader';

import s from './LoginPage.module.css';

const LoginPage = () => {
  const [value, setValue] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const onSignupSubmit = value => {
    setValue(value);
  };

  useEffect(() => {
    if (value === '') {
      return;
    }
    // console.log(value);
    authOperations
      .login(value)
      .then(res => {
        console.log(res);
        navigate('/me', { replace: true });
      })
      .catch(console.log(Error));

    setIsLoggedIn(true);
  }, [value, navigate, isLoggedIn]);

  return (
    <div className={s.RegisterContainer}>
      <Navbar />
      {isLoggedIn && <Spinner />}

      <LoginForm onSubmit={onSignupSubmit} />
    </div>
  );
};

export default LoginPage;
