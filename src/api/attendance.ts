import request from '../utils/request'

// 新增考勤记录
export function addAttendanceRecord(data: any) {
    return request({
        url: '/check/add',
        method: 'post',
        data,
    })
}

// 获取考勤记录列表
export function getAttendanceRecord(data: any) {
    return request({
        url: '/check/list',
        method: 'get',
    })
}

// 获取考勤详情
export function getAttendanceDetail(checkRecordId: number) {
    return request({
        url: `/check/details/${checkRecordId}`,
        method: 'get',
    })
}

// 查看违纪详情
export function getDisciplinaryDetail(checkRecordId: number) {
    return request({
        url: `/check/violate/${checkRecordId}`,
        method: 'get',
    })
}

// 学生是否确认
export function getConfirm(checkRecordId: number) {
    return request({
        url: `/user/check/confirm/${checkRecordId}`,
        method: 'get',
    })
}

// 获取身份信息
export function getUserInfo() {
    return request({
        url: `/user/search`,
        method: 'get',
        params:{
            page:1,
            pageSize:1
        }
    })
}