import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

const getAuthHeader = async (getToken) => {
  const token = await getToken()
  return { Authorization: `Bearer ${token}` }
}

export const clientsApi = {
  getAll: async (getToken, search = '') => {
    const headers = await getAuthHeader(getToken)
    const params = search ? { search } : {}
    const res = await axios.get(`${API}/clients`, { headers, params })
    return res.data.clients
  },

  getById: async (getToken, id) => {
    const headers = await getAuthHeader(getToken)
    const res = await axios.get(`${API}/clients/${id}`, { headers })
    return res.data.client
  },

  create: async (getToken, data) => {
    const headers = await getAuthHeader(getToken)
    const res = await axios.post(`${API}/clients`, data, { headers })
    return res.data.client
  },

  update: async (getToken, id, data) => {
    const headers = await getAuthHeader(getToken)
    const res = await axios.put(`${API}/clients/${id}`, data, { headers })
    return res.data.client
  },

  delete: async (getToken, id) => {
    const headers = await getAuthHeader(getToken)
    await axios.delete(`${API}/clients/${id}`, { headers })
  },
}