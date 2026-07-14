import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3000'
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
export const getBoard = async ()=>{
    const response = await API.get('/boards/')
    return response.data
}
export const createBoard = async(name)=>{
    const response = await API.post('/boards/',{name})
    return response.data
}