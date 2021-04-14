import {request} from './request'


export function getShopOption(){
    return request({
        url:'/shopclass'
    })
}

export function regShopData(formData) {
    
    return request({
        url:'/regshop',
        method:'post',
        data:formData,
        
    })
}

export function getCity() {
    
    return request({
        url:'/city',

    })
}

export function getAddress(keyword,region){
    return request({
        url:'/address',
        params:{
            keyword,
            region
        }
    })
}