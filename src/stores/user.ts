import { acceptHMRUpdate, defineStore } from 'pinia'
import { getUserInfo, loginByCode, loginByTest } from '~/api/login'
import { setToken } from '~/utils/cookies'

export const useUserStore = defineStore('user', () => {
  // 模拟登录
  const testLogin = async () => {
    try {
      const res = await loginByTest()
      setToken(res.data)
      const data = await getUserInfo()
      console.log(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }


  // 生产环境登录
  async function login(code: any, path: any, query: any) {
    if (code === '' && code === null && code === undefined) {
      // const corpId = 'wx6219dbfa9b86489e';
      // const redirect_uri = `labor.ticknet.hnust.cn` + path;
      // window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${corpId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
    } else {
      const token: any = (await loginByCode(code)).data;
      setToken(token);
    }
  }


  return {
    testLogin,
    login,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
