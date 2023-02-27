import { useEffect, useState } from 'react';
import authOperations from '../../auth/authOperation';
import s from './MePage.module.css';

const MePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authOperations
      .getUser()
      .then(res => {
        if (res.message === 'token is valid') {
          setLoading(false);
          return;
        }
        localStorage.setItem('status', res.message);
      })

      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      {loading ? (
        'Loading...'
      ) : (
        <div className={s.title_block}>
          <h3>Token is valid</h3>
        </div>
      )}
    </div>
  );
};

export default MePage;
