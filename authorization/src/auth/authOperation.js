import axios from 'axios';

const access_token = localStorage.getItem('access_token');
const refresh_token = localStorage.getItem('refresh_token');

axios.defaults.baseURL = 'http://142.93.134.108:1111';

const setAuthHeader = access_token => {
  console.log(access_token);
  axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
};

// const clearAuthHeader = () => {
//   axios.defaults.headers.common.Authorization = '';
// };

async function getUser() {
  const access_token = localStorage.getItem('access_token');
  console.log('access', access_token);
  try {
    const response = await axios.get('/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // console.log(response.data.body.message);
    return response.data.body;
    // setAuthHeader(response.data.body.access_token);
  } catch ({ response }) {
    console.error(response);
  }
}

async function signup({ email, password }) {
  try {
    const response = await axios.post('/sign_up', { email, password });
    // console.log(response.data);
    return response.data;
  } catch ({ response }) {
    console.error(response.data.message);
  }
}

async function login({ email, password }) {
  try {
    // console.log({ email, password });
    const response = await axios.post(
      `/login?email=${email}&password=${password} `,
      { email, password },
    );
    // console.log(response.data.body);
    setAuthHeader(response.data.body.access_token);
    return response.data.body;
  } catch ({ response }) {
    console.error(response.data.message);
  }
}

async function refreshToken() {
  const refresh_token = localStorage.getItem('refresh_token');
  try {
    const response = await axios.post('/refresh', {
      Authorization: `Bearer ${refresh_token}`,
    });
    return response.data.body;
  } catch ({ response }) {
    console.error(response);
  }
}

// async function logout() {
//   try {
//     await axios.post('/logout');
//    clearAuthHeader()
//   } catch ({ response }) {
//     console.error(response.data.message);
//   }
// }

const authOperations = {
  getUser,
  refreshToken,
  signup,
  login,
};

export default authOperations;
