import { defineStore } from 'pinia'
import { ref } from 'vue'
// 用户模块
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('') // 定义token
    const setToken = (newToken) => (token.value = newToken) // 设置token
    return { token, setToken }
  },
  {
    persist: true // 持久化
  }
)
