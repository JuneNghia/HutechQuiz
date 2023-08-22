import axiosConfig from '../utils/axios'

const AUTH = {
  login: '/auth/login',
  register: '/auth/register'
}

const AuthService = {
  login: (phoneOrEmail, password) => axiosConfig.post(AUTH.login, { phoneOrEmail: phoneOrEmail, password: password }),
  register: (data) => axiosConfig.post(AUTH.register, data)
}

export default AuthService
