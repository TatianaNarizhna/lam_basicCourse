import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authOperations from '../../auth/authOperation';
import SignupForm from '../../modules/SignupForm/SignupForm';
import UserCreatedPage from '../UserCreatedPage/UserCreatedPage';
import Navbar from '../../modules/Navbar/Navbar';
import s from './SignupPage.module.css';

const SignupPage = () => {
  const [value, setValue] = useState('');
  // const [logged, setLogged] = useState(false);

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
      .then(res => console.log(res))
      .catch(console.log(Error));

    // setLogged(true);
    // if (logged === 'Ok') {
    //   mySuccess();
    //   // navigate('/me', { replace: true });
    //   // // setLogged(true);
    // }
  }, [value, navigate]);

  return (
    <div className={s.RegisterContainer}>
      <Navbar />
      <SignupForm onSubmit={onSignupSubmit} />
    </div>
  );
};

export default SignupPage;
