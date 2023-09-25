import request from '@/utils/request'
// 封装注册请求api
export const userRegisterService = ({ username, password, repassword }) => {
  request.post('/api/reg', { username, password, repassword })
}
// 封装登录请求api
export const userLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })
