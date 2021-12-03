
import request from "@/utils/request.js"

export function loginApi(data){
    return request({
      url: 'login',
      method: 'post',
      data      
    })
}


