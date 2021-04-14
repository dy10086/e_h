import {request} from './request'

export function getOrderData(params){
    return request({
        url:'/orderdata',
        params
    })
}

export function updState(order_number){
    return request({
        url:'/orderstate',
        params:{
            order_number
        }
    })
}

export function delOrder(order_number) {
    return request({
        url:'/orderdata',
        method:'delete',
        params:{order_number}
    })
}