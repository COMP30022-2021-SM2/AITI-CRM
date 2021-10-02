import _axios from 'axios';

// Having the online Heroku link with our web app and the localhost connection
const axios = (baseUrl) => {
  const instance = _axios.create({
    // 'https://aiti-crm-server.herokuapp.com' ||
    // baseURL: 'https://aiti-crm-server.herokuapp.com'
    baseURL: 'http://localhost:5000'
  });
  return instance;
};

export default axios();
