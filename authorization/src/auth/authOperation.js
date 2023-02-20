import axios from 'axios';

axios.defaults.baseURL = '142.93.134.108:1111';

const token = {
  set(token) {
    axios.defaults.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

async function signup() {
  try {
    const response = await axios.post('/sign_up ');
    // token.set(data.token);
    console.log(JSON.stringify(response.data));
  } catch ({ response }) {
    console.error(response.data.message);
  }
}

const authOperations = {
  signup,
};

export default authOperations;
