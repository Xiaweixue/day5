import axios from 'axios'
const http = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: '1000'
})
http.interceptors.request.use(function (config) {
    config.headers.token = window.sessionStorage.getItem('token')
    return config
}), function (error) {
    return Promise.reject(error)
}

http.interceptors.request.use(function (response) {
    return response
}), function (error) {
    return Promise.reject(error)
}

const service = (options) => {
    options.method = options.method || 'get'
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data || options.params
    }
    return http(options)
}

export default service