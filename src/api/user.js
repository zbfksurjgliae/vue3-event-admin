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
// 更新个人信息
export const userUpdateInfoService = ({ id, nickname, email }) => {
  request.put('/my/userinfo', { id, nickname, email })
}
// 更新头像
export const userUpdateAvatarService = (avatar) => {
  request.patch('/my/update/avatar', { avatar })
}
// 更新密码
export const userUpdatePassService = ({ old_pwd, new_pwd, re_pwd }) =>
  request.patch('/my/updatepwd', { old_pwd, new_pwd, re_pwd })
