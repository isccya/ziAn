import { acceptHMRUpdate, defineStore } from 'pinia'
import { getUserInfo, loginByCode, loginByTest } from '~/api/login'
import { setSex, setToken, setUserId, setUserName } from '~/utils/cookies'

export const useUserStore = defineStore('user', () => {

  const sex: any = ref('')
  const userId = ref('')
  const userName = ref('')
  // 模拟登录
  const testLogin = async () => {
    try {
      const res = await loginByTest()
      console.log(res);
      setToken(res.data)
      let userInfo: any = (await getUserInfo()).data;
      ({
        sex: sex.value,
        userId: userId.value,
        userName: userName.value
      } = userInfo)
      setSex(sex.value)
      setUserId(userId.value)
      setUserName(userName.value)
    }
    catch (error) {
      return Promise.reject(error)
    }
  }

  // 生产环境登录
  async function login(code: any, path: any, query: any) {
    if (code === '' && code === null && code === undefined) {
      // const corpId = 'wx6219dbfa9b86489e';
      // const redirect_uri = `labor.ticknet.hnust.cn` + path;
      // window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${corpId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
    }
    else {
      const token: any = (await loginByCode(code)).data
      setToken(token)
    }
  }

  return {
    testLogin,
    login,
    sex,
    userId,
    userName
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
