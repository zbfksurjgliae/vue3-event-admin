import request from '@/utils/request'
// 封装注册请求api
export const userRegisterService = ({ username, password, repassword }) => {
  request.post('/api/reg', { username, password, repassword })
}
// 封装登录请求api
export const userLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })
// 封装获取个人信息的请求
export const userGetInfoService = () => request.get('/my/userinfo')
