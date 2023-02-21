import axios from 'axios';

const authSlice = {
  name: 'auth',
  initialState: {
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

axios.defaults.baseURL = 'http://142.93.134.108:1111';

const token = {
  set(token) {
    axios.defaults.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

async function fetchCurrUser() {
  try {
    const response = await axios.get('/me ');
    console.log(response);
  } catch ({ response }) {
    console.error(response.data.message);
  }
}

async function signup({ email, password }) {
  try {
    console.log({ email, password });
    const response = await axios.post('/sign_up', { email, password });
    console.log(response.data);
    return response.data;
    // token.set(response.token);
    // console.log(JSON.stringify(response.data));
  } catch ({ response }) {
    console.error(response.data.message);
  }
}

async function login({ email, password }) {
  try {
    console.log({ email, password });
    const response = await axios.post(
      `/login?email=${email}&password=${password} `,
      { email, password },
    );
    console.log(response.data.body);
  } catch ({ response }) {
    console.error(response.data.message);
  }
}

const authOperations = {
  fetchCurrUser,
  signup,
  login,
};

export default authOperations;
