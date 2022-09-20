import https from '../usilt/request'

const login =(data)=>{
   return https({
        url:'/admin/login',
        method:'post',
        data
    })
}

export default {
    login
}