import axios from 'axios'
import { showFailToast } from 'vant'
import { getToken, removeToken } from './cookies'

const service = axios.create({
  baseURL: 'http://49.123.0.26:8984',
  timeout: 10000,
})

service.interceptors.request.use((config: any) => {
  const token = getToken()
  if (token)
    config.header.Authorization = token

  return config
}, (error) => {
  return Promise.reject(error)
})

service.interceptors.response.use((response: any) => {
  const res = response.data
  if (res.code === 401) {
    removeToken()
    showFailToast({
      message: `${res.description}`,
    })
    setTimeout(() => {
      location.href = '/'
    }, 1000)
  }
  return res
}, (error) => {
  showFailToast({
    message: `${error.description}`,
  })
  return Promise.reject(error)
})

export default service
