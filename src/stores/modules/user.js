import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user.js'
// 用户模块
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('') // 定义token
    const user = ref({}) // 定义userInfo
    // 设置token
    const setToken = (newToken) => (token.value = newToken)
    // 获取个人信息
    const getUser = async () => {
      const res = await userGetInfoService()
      user.value = res.data.data
    }
    // 设置个人信息
    const setUser = (newUser) => {
      user.value = newUser
    }
    // 删除个人token
    const removeToken = () => {
      token.value = ''
    }
    return { token, user, setToken, getUser, setUser, removeToken }
  },
  {
    persist: true // 持久化
  }
)
