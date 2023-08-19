import axiosConfig from '../utils/axios'

const AUTH = {
  login: '/auth/login'
}

const AuthService = {
  login: (phoneOrEmail, password) => axiosConfig.post(AUTH.login, { phoneOrEmail: phoneOrEmail, password: password })
}

export default AuthService
