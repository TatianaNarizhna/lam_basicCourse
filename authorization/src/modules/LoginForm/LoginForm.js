import Button from '@mui/material/Button';
import { useState } from 'react';
import s from './LoginForm.module.css';

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'email':
        return setEmail(value);

      case 'password':
        return setPassword(value);

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit({ email, password });
  };

  return (
    <div className={s.RegisterContainer}>
      <h2 className={s.title}>Login Page</h2>

      <form onSubmit={handleSubmit} className={s.form} autoComplete="off">
        <div className="mb-3">
          <label className={s.label} />
          Email
          <input
            type="email"
            name="email"
            value={email}
            className={s.form_control}
            placeholder="name@example.com"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className={s.label} />
          Password
          <input
            type="password"
            name="password"
            value={password}
            className={s.form_control}
            placeholder="more then 5 symbols"
            onChange={handleChange}
          />
        </div>

        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
