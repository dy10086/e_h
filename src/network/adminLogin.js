import {request} from './request'

export function adminLogin(username,password) {
    return request({
        url:'/login',
        method:'post',
        data:{
            username,
            password
        }
    })
}