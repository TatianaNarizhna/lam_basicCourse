import { useEffect, useState } from 'react';
import authOperations from '../../auth/authOperation';
import '../../auth/catchFetch';

const MePage = () => {
  const [loading, setLoading] = useState(true);

  console.log();

  useEffect(() => {
    // console.log(value);
    authOperations
      .fetchCurrUser()
      .then(res => {
        if (res.message === 'token expired') {
          console.log(res.message);
          localStorage.setItem('status', res.message);
        }
        setLoading(false);
      })
      .catch(console.log(Error));
  }, []);

  return (
    <div>
      {loading ? (
        'Loading...'
      ) : (
        <div>
          <h3>Token is valid</h3>
          <button type="button">Logout</button>
        </div>
      )}
    </div>
  );
};

export default MePage;
