import {request} from './request';

export function getChart(){
    return request({
        url:'/chart'
    })
}

export function getData(){
    return request({
        url:'/data'
    })
}