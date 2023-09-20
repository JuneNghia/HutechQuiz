import axiosConfig from '../utils/axios'

const CATEGORY = {
  ADD_TEST: (id) => `/category/${id}/add-test`
}

const CategoryService = {
  addTest: (id, data) => axiosConfig.post(CATEGORY.ADD_TEST(id), data)
}

export default CategoryService
