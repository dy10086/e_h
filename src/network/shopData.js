import {request} from './request'

export function getShopList(pagingData){
    return request({
        url:'/shops',
        params:pagingData
    })
}



export function removeShop(id){
    return request({
        url:'/shops',
        method:'delete',
        params:{id}
    })
}