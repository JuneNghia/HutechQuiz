import axiosConfig from '../utils/axios'

const CATEGORY = {
  GET_QUESTION_BY_ID: (id) => `/category/${id}/get-all-test`,
  ADD_TEST: (id) => `/category/${id}/add-test`,
  EDIT_TEST: (id) => `/category/${id}/edit-test`
}

const CategoryService = {
  getQuesById: (id) => axiosConfig.get(CATEGORY.GET_QUESTION_BY_ID(id)),
  addTest: (id, data) => axiosConfig.post(CATEGORY.ADD_TEST(id), data),
  editTest: (id, data) => axiosConfig.put(CATEGORY.EDIT_TEST(id), data)
}

export default CategoryService
