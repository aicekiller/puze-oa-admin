import axios from 'axios'
import {Message, MessageBox} from 'element-ui'

// 创建axios实例
const service = axios.create({
    baseURL: 'https://o2o.puzeyf.com/o2o-web', // api的base_url
    timeout: 15000                  // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data.content
        return res
        // if (res.code !== 20000) {
        //   Message({
        //     message: res.data,
        //     type: 'error',
        //     duration: 5 * 1000
        //   })
        //
        //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
        //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        //     MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        //       confirmButtonText: '重新登录',
        //       cancelButtonText: '取消',
        //       type: 'warning'
        //     }).then(() => {
        //
        //     })
        //   }
        //   return Promise.reject('error')
        // } else {
        //   return response.data.content
        // }
    },
    error => {
        console.log('err' + error)// for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
