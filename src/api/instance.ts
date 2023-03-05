import axios from 'axios';

// let apiKey;
// const token = localStorage.getItem('token')?.toString()
// if (token) {
//   apiKey = token
// }

// process.env.REACT_APP_API_PROD_URL

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
  },
});
