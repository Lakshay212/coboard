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
export const getCards = async (listId) => {
  const response = await API.get(`/cards/${listId}`)
  return response.data
}

export const createCard = async (listId, title) => {
  const response = await API.post('/cards', { list_id: listId, title, position: 1 })
  return response.data
}