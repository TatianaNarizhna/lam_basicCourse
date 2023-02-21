import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authOperations from '../../auth/authOperation';
import LoginForm from '../../modules/LoginForm/LoginForm';
import s from './LoginPage.module.css';

const LoginPage = () => {
  const [value, setValue] = useState('');

  const navigate = useNavigate();

  const onSignupSubmit = value => {
    setValue(value);
  };

  useEffect(() => {
    if (value === '') {
      return;
    }

    console.log(value);

    if (value) {
      navigate('/me', { replace: true });
    }
    authOperations
      .signup(value)

      .catch(console.log(Error));
  }, [value, navigate]);

  return (
    <div className={s.RegisterContainer}>
      <LoginForm onSubmit={onSignupSubmit} />
    </div>
  );
};

export default LoginPage;
