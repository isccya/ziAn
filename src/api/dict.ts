import request from '../utils/request'

// 获取字典
export function getDict(tpyeName:string){
    return request({
        url:`/dict/${tpyeName}`,
        method:'get'
    })
}