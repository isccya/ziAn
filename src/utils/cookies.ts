import Cookies from 'js-cookie'

const TokenKey = 'ziAn-token'
const UserId = 'ziAn-userId'
const Sex = 'ziAn-sex'
const UserName = 'ziAn-userName'

export function getToken() {
  return Cookies.get(TokenKey)
}
// { expires: 7 }
export function setToken(token: string) {
  return Cookies.set(TokenKey, token)
  // return Cookies.set(TokenKey, token, { expires: 30 })//设置cookie30天过期
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserId() {
  return Cookies.get(UserId)
}

export function setUserId(userId: string) {
  return Cookies.set(UserId, userId)
}

export function removeUserId() {
  return Cookies.remove(UserId)
}

export function getSex() {
  return Cookies.get(Sex)
}

export function setSex(sex: string) {
  return Cookies.set(Sex, sex)
}

export function removeSex() {
  return Cookies.remove(Sex)
}

export function getUserName() {
  return Cookies.get(UserName)
}

export function setUserName(userName: string) {
  return Cookies.set(UserName, userName)
}

export function removeUserName() {
  return Cookies.remove(UserName)
}
