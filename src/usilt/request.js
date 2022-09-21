
// 引入axios
import axios from 'axios'
import { Message } from "element-ui"
// 自定义错误信息提示内容
const exceptionMessage = {
    1000: '用户名或者密码发生错误',
    3000: ''
}



//创建axios实例配置, 返回实例对象
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(function (config) {
    // 获取vuex的token
    const token = store.getters.token
    // 当token存在的时候，则将token通过请求头发送给后台
    if (token) config.headers.authorization = "Bearer " + token
    return config;
}, function (error) {
    return Promise.reject(error);
})

// 响应拦截器
service.interceptors.response.use(function (response) {

    if (response.status < 400) {
        //失败
        _showError(response.data.code, response.data.message)
        //成功
        return response.data.data

    }

    if (response.status === 401) {
        // TODO token的过期处理
        return
    }




    return response;
}, function (error) {
    return Promise.reject(error);
})

/**
 * 错误提示
 */
const _showError = (errorCode, message) => {
    let title
    title = exceptionMessage[errorCode] || message || '发生未知错误'
    Message.error(title)
}

/**
 * 解决不同请求方式时统一使用data来进行传参
 * @param options
 */
const request = (options) => {

    options.method = options.method || 'get'
    if (options.method.toLowerCase() === "get") {
        options.params = options.data || options.params
        delete options.data
    }

    // 解决多个代理请求的问题
    service.defaults.baseURL = options.proxy || process.env.VUE_APP_BASE_API

    return service(options)
}


// 导出实例对象
export default request