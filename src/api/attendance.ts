import request from '../utils/request'

// 新增考勤记录
export function addAttendanceRecord(data: any) {
    return request({
        url: 'user/check/add',
        method: 'post',
        data,
    })
}

// 获取考勤记录列表
export function getAttendanceRecord() {
    return request({
        url: 'user/check/list',
        method: 'get',
    })
}

// 获取考勤详情
export function getAttendanceDetail(checkRecordId: number) {
    return request({
        url: `user/check/details/${checkRecordId}`,
        method: 'get',
    })
}

// 查看违纪详情
export function getDisciplinaryDetail(checkRecordId: number) {
    return request({
        url: `user/check/violate/${checkRecordId}`,
        method: 'get',
    })
}

// 学生是否确认
export function getConfirm(checkRecordId: number) {
    return request({
        url: `/user/check/isConfirm/${checkRecordId}`,
        method: 'get',
    })
}

// 获取违纪人身份信息
export function getUserById(userId :string) {
    return request({
        url: `/user/search`,
        method: 'get',
        params: {
            userId,
        }
    })
}