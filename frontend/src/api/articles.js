import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

const getAuthHeader = async (getToken) => {
  const token = await getToken()
  return { Authorization: `Bearer ${token}` }
}

export const articlesApi = {
  getAll: async (getToken, params = {}) => {
    const headers = await getAuthHeader(getToken)
    const res = await axios.get(`${API}/articles`, { headers, params })
    return res.data.articles
  },

  create: async (getToken, data) => {
    const headers = await getAuthHeader(getToken)
    const res = await axios.post(`${API}/articles`, data, { headers })
    return res.data.article
  },

  update: async (getToken, id, data) => {
    const headers = await getAuthHeader(getToken)
    const res = await axios.put(`${API}/articles/${id}`, data, { headers })
    return res.data.article
  },

  delete: async (getToken, id) => {
    const headers = await getAuthHeader(getToken)
    await axios.delete(`${API}/articles/${id}`, { headers })
  },

  importCsv: async (getToken, file) => {
    const token = await getToken()
    const formData = new FormData()
    formData.append('file', file)
    const res = await axios.post(`${API}/csv/import`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    return res.data
  },
}