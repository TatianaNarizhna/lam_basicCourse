import { useEffect, useState } from 'react';
import axios from 'axios';
import authOperations from '../../auth/authOperation';
// import '../../auth/catchFetch';
// import inter from '../../auth/catchFetch';
// import Service from '../../auth/catchFetch';

const MePage = () => {
  const [loading, setLoading] = useState(true);

  const userStatus = localStorage.getItem('status');

  console.log();

  const status = localStorage.getItem('status');

  useEffect(() => {
    // console.log(value);
    authOperations.getUser().then(res => {
      // console.log(res);
      if (res.message === 'token is valid') {
        console.log('1', res.message);
        setLoading(false);
        return;
      }
      localStorage.setItem('status', res.message);
    });

    // .catch(console.log(Error));
  }, []);

  // useEffect(() => {
  //   instance.interceptors.request.use(
  //     config => {
  //       authOperations.getUser().then(res => {
  //         // console.log(res);
  //         if (res.message === 'token is valid') {
  //           console.log('1', res.message);
  //           setLoading(false);
  //           return;
  //         }
  //         localStorage.setItem('status', res.message);
  //       });

  //       return config;
  //     },
  //     error => {
  //       return Promise.reject(error);
  //     },
  //   );
  // }, []);

  // instance.interceptors.response.use(
  //   async response => {
  //     if (response.statusCode === 401) {
  //       const refresh_token = localStorage.getItem('refresh_token');
  //       if (refresh_token) {
  //         try {
  //           const response = await axios.post(
  //             'http://142.93.134.108:1111/refresh',
  //             {
  //               Authorization: `Bearer ${refresh_token}`,
  //             },
  //           );
  //           localStorage.setItem(
  //             'access_token',
  //             response.data.body.access_token,
  //           );

  //           authOperations.getUser().then(res => {
  //             // console.log(res);
  //             if (res.message === 'token is valid') {
  //               console.log('1', res.message);
  //               setLoading(false);
  //               return;
  //             }
  //           });
  //         } catch (error) {
  //           console.error(error);
  //           // Redirect to login page
  //         }
  //       } else {
  //         // Redirect to login page
  //       }
  //     }
  //   },
  //   function (error) {
  //     return Promise.reject(error);
  //   },
  // );

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
