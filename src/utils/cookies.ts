import Cookies from 'js-cookie'

const TokenKey = 'ziAn-token'

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
