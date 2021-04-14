import {request} from './request'

export function getShopsId(){
    return request({
        url:'/shopsid'
    })
}

export function getclassify(id){
    return request({
        url:'/shopclassify',
        params:{id}
    })
}

export function addGoods(data){
    return request({
        url:'/addgoods',
        method:'post',
        data
    })
}

export function addClassify(id,name){
    return request({
        url:'/shopclassify',
        method:'put',
        params:{
            id,
            name
        }
    })
}

export function delClassify(id,name){
    return request({
        url:'/shopclassify',
        method:'delete',
        params:{
            id,
            name
        }
    })
}