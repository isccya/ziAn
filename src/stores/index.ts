import {useUserStore} from './user'
import {useDictStore} from './dict'

// 统一导出useStore方法
export default function useStore() {
  return {
    user: useUserStore(),
    dict: useDictStore(),
  }
}