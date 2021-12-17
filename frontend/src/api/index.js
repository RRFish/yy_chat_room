
import request from "@/utils/request.js"

export function loginApi(data){
    return request({
      url: 'login',
      method: 'post',
      data      
    })
}

export function registerApi(data){
    return request({
      url: 'register',
      method: 'post',
      data      
    })
}

export function chatMessageApi(){
    return request({
      url: 'chat_message',
      method: 'get'
    })
}


