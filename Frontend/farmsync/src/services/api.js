import axios from 'axios';

const API = axios.create({
  baseURL: '/api/v1.0'   // ✅ correct base
});

export default API;