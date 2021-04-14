import {request} from './request'

export function getUserList(pagingData){
    return request({
        url:'/users',
        params:pagingData
    })
}

export function registered(userMessage,time_){
    userMessage.reg_time = time_
    return request({
        url:'/userregistered',
        method:'post',
        data:userMessage
    })
}

export function updateuser(id,password){

    return request({
        url:'/users',
        method:'put',
        params:{
            id,
            password
        }
    })
}

export function removeUser(id){
    return request({
        url:'/users',
        method:'delete',
        params:{id}
    })
}