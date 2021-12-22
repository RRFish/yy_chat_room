import axios from 'axios'
import { apiUrl} from "@/config.js"
import store from '@/store'
import { authTokenGet } from '@/utils/auth'

// create an axios instance
const service = axios.create({
    baseURL: apiUrl,
    timeout: 15000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['Authorization'] = authTokenGet()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
    res => {
      // if the custom code is not 20000, it is judged as an error.
      if (res.status === 400) {
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        return res
      }
    },
    error => {
      return Promise.reject(error)
    }
  
  )


export default service