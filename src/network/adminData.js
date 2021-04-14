import {request} from './request'

export function getUserList(pagingData){
    return request({
        url:'/adminusers',
        params:pagingData
    })
}

export function registered(userMessage,time_){
    userMessage.reg_time = time_
    return request({
        url:'/adminregistered',
        method:'post',
        data:userMessage
    })
}

export function updateuser(id,password){

    return request({
        url:'/adminusers',
        method:'put',
        params:{
            id,
            password
        }
    })
}

export function removeUser(id){
    return request({
        url:'/adminusers',
        method:'delete',
        params:{id}
    })
}