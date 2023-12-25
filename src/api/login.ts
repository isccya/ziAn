import request from '../utils/request'

// 测试登录
export function loginByTest(){
    return request({
        url:'/user/login/mock',
        method:'post'
    })
}

// 获取用户信息
export function getUserInfo(){
    return request({
        url:'',
        method:'post'
    })
}

// 企业微信登录
export function loginByCode(code : string){
    return request({
        url:'',
        method:'post',
        params: {
            code,
        }
    })
}