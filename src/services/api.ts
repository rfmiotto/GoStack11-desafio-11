import axios from 'axios';

// When using JSON Server with a physical device, run:
// yarn json-server --host 192.168.15.28 server.json -p 3333

const api = axios.create({
  // baseURL: 'http://localhost:3333',
  baseURL: 'http://192.168.15.28:3333',
});

export default api;
