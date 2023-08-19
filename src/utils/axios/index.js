import axios from 'axios'
import { BASE_URL_SERVICE } from '../../constants/index'

const token = localStorage.getItem('serviceToken')

const axiosConfig = axios.create({
  baseURL: BASE_URL_SERVICE,
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`
  }
})

// Add a request interceptor
axiosConfig.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosConfig.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default axiosConfig
