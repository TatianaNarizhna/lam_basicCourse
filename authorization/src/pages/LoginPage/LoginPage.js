import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authOperations from '../../auth/authOperation';
import MePage from '../MePage/MePage';
import Navbar from '../../modules/Navbar/Navbar';
import LoginForm from '../../modules/LoginForm/LoginForm';

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
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
      })
      .catch(console.log(Error));

    setIsLoggedIn(true);
    if (isLoggedIn) {
      navigate('/me', { replace: true });
    }
  }, [value, navigate, isLoggedIn]);

  return (
    <div className={s.RegisterContainer}>
      {isLoggedIn ? <MePage /> : <Navbar />}
      <LoginForm onSubmit={onSignupSubmit} />
    </div>
  );
};

export default LoginPage;
