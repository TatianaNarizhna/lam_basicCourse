import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authOperations from '../../auth/authOperation';
import SignupForm from '../../modules/SignupForm/SignupForm';
import s from './SignupPage.module.css';

const SignupPage = () => {
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
      <SignupForm onSubmit={onSignupSubmit} />
    </div>
  );
};

export default SignupPage;
