import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3000'
})

export const loginUser = async (email, password) => {
  const response = await API.post('/auth/login', { email, password })
  return response.data
}

export const signupUser = async (name, email, password) => {
  const response = await API.post('/auth/signup', { name, email, password })
  return response.data
}