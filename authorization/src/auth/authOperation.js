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

async function getToken() {
  try {
    const response = await axios.get('/me');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
