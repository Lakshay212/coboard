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
export const getLists = async (boardId) => {
  const response = await API.get(`/lists/${boardId}`)
  return response.data
}

export const createList = async (boardId, title) => {
  const response = await API.post('/lists', { board_id: boardId, title, position: 1 })
  return response.data
}