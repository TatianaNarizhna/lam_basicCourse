import axios from 'axios';
import authOperations from './authOperation';

const userStatus = localStorage.getItem('status');

axios.interceptors.response.use(
  function (response) {
    if (userStatus === 'token expired') {
      authOperations.refreshToken().then(res => {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
      });
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);
