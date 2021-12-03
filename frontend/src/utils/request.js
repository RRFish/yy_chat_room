import axios from 'axios'
import { apiUrl} from "@/config.js"

// create an axios instance
const service = axios.create({
    baseURL: apiUrl,
    // baseURL: process.env.VUE_APP_LOCAL_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 15000 // request timeout
})

// response interceptor
service.interceptors.response.use(
    res => {
      // if the custom code is not 20000, it is judged as an error.
      if (res.status === 400) {
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        // if (res.message) {
        //     Message({
        //     message: res.message,
        //     type: 'success',
        //     duration: 5 * 1000
        //     })
        // }
        return res
      }
    },
    error => {
      return Promise.reject(error)
    }
  
  )


export default service