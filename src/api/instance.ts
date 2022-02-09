import axios from 'axios'

let apiKey;
const token = localStorage.getItem('token')?.toString()
if (token) {
  apiKey = token
}


export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: { 'token': String(apiKey) }
})