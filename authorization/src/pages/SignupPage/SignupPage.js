import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authOperations from '../../auth/authOperation';
import SignupForm from '../../modules/SignupForm/SignupForm';
import s from './SignupPage.module.css';

const SignupPage = () => {
  const [value, setValue] = useState('');
  const [logged, setLogged] = useState(false);

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
      setLogged(true);
    }
    authOperations
      .signup(value)

      .catch(console.log(Error));
  }, [value, navigate, logged]);

  return (
    <div className={s.RegisterContainer}>
      <SignupForm onSubmit={onSignupSubmit} />
    </div>
  );
};

export default SignupPage;
