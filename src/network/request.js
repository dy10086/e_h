import axios from 'axios'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 允许保存cookice
axios.defaults.withCredentials=true

export function request(config) {
    
    const instance = axios.create({
        baseURL:'/api',
        timeout:5000
    })

    // request拦截器
    instance.interceptors.request.use(config => {
        // 请求进度条
        Nprogress.start()
        let token = localStorage.getItem('token')
        if(token){
            config.headers = {'X-Access-Token':token}
        }
        return config
        
    })
    // response拦截器
    instance.interceptors.response.use(config => {
        // 结束进度条
        Nprogress.done()
   
        return config
        
    })
    return instance(config)
}