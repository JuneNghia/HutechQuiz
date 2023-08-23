import axiosConfig from '../utils/axios'

const USER = {
  GET_USERS: `/user/get-all`,
  CREATE_USER: `/users`,
  GET_BY_ID: (id) => `/users/${id}`,
  UPDATE_BY_ID: (id) => `/users/${id}`,
  DELETE_BY_ID: (id) => `/users/${id}`,
}

const UserService = {
  getAll: (params) => axiosConfig.get(USER.GET_USERS, {params: params}),
  getByID: (id) => axiosConfig.get(USER.GET_BY_ID(id)),
  create: (data) => axiosConfig.post(USER.CREATE_USER, data),
  updateByID: (id, data) => axiosConfig.patch(USER.UPDATE_BY_ID(id), data),
  deleteByID: (id) => axiosConfig.delete(USER.DELETE_BY_ID(id)),
}

export default UserService
