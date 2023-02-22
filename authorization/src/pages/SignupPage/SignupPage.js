import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authOperations from '../../auth/authOperation';
import SignupForm from '../../modules/SignupForm/SignupForm';
import UserCreatedPage from '../UserCreatedPage/UserCreatedPage';
import Navbar from '../../modules/Navbar/Navbar';
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

    // console.log(value);

    authOperations
      .signup(value)
      .then(res => setLogged(res.status))
      .catch(console.log(Error));

    // if (logged === 'Ok') {
    //   navigate('/me', { replace: true });
    //   // setLogged(true);
    // }
  }, [value, navigate, logged]);

  return (
    <div className={s.RegisterContainer}>
      {logged ? <UserCreatedPage /> : <Navbar />}
      <SignupForm onSubmit={onSignupSubmit} />
    </div>
  );
};

export default SignupPage;
