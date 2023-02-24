import axios from 'axios';
import authOperations from './authOperation';

const Service = axios.create({
  baseURL: 'http://142.93.134.108:1111',
});

// Service.interceptors.request.use(
//   config => {
//     const access_token = localStorage.getItem('access_token');
//     if (access_token) {
//       config.headers.common = { Authorization: `Bearer ${access_token}` };
//     }
//     return config;
//   },
//   error => {
//     Promise.reject(error.response || error.message);
//   },
// );

Service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    let originalRequest = error.config;
    let refresh_token = localStorage.getItem('refresh_token');

    if (
      refresh_token &&
      error.response.statusCode === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return authOperations
        .refreshToken()
        .then(res => {
          if (res.statusCode === 200) {
            localStorage.setItem('access_token', res.data.access_token);
            localStorage.setItem('refresh_token', res.data.refresh_token);

            originalRequest.headers[
              'Authorization'
            ] = `Bearer ${res.data.body.access_token}`;

            return axios(originalRequest);
          }
        })
        .catch(() => {
          localStorage.clear();
        });
    }
    return Promise.reject(error.response || error.message);
  },
);

export default Service;

// const userStatus = localStorage.getItem('status');

// const inter = () => {
//   axios.interceptors.response.use(
//     function (response) {
//       const userStatus = localStorage.getItem('status');
//       console.log('inter');

//       if (userStatus === 'token expired') {
//         authOperations.refreshToken().then(res => {
//           if (userStatus === 'token expired') {
//             console.log(res);
//             localStorage.setItem('access_token', res.access_token);
//             localStorage.setItem('refresh_token', res.refresh_token);
//           }
//         });
//       }
//       return response;
//     },
//     function (error) {
//       return Promise.reject(error);
//     },
//   );
// };

// export default inter;

// axios.interceptors.response.use(
//   function (response) {
//     if (userStatus === 'token expired') {
//       authOperations.refreshToken().then(res => {
//         if (userStatus === 'token expired') {
//           console.log(res);
//           localStorage.setItem('access_token', res.access_token);
//           localStorage.setItem('refresh_token', res.refresh_token);
//         }
//       });
//     }
//     return response;
//   },
//   function (error) {
//     return Promise.reject(error);
//   },
// );

// ---------------------------------------------------------

// axios.interceptors.response.use(
//   response => {
//     return response;
//   },
//   async error => {
//     const originalRequest = error.config;
//     if (error.response.statusCode === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
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
//           // originalRequest.headers['Authorization'] = Bearer ${response.data.access_token};
//           // return axios(originalRequest);
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
//     return Promise.reject(error);
//   },
// );

// --------------------
// instance.interceptors.request.use(
//     config => {
//       const access_token = localStorage.getItem('access_token');
//       if (access_token) {
//         authOperations.getUser().then(res => {
//           // console.log(res);
//           if (res.message === 'token is valid') {
//             console.log('1', res.message);
//             setLoading(false);
//             return;
//           }
//           localStorage.setItem('status', res.message);
//         });
//       }
//       return config;
//     },
//     error => {
//       return Promise.reject(error);
//     },
//   );

// axios.interceptors.response.use(
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
