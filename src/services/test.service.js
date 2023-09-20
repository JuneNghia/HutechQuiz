import axiosConfig from "../utils/axios"

const TEST = {
    GET_EXAM: (id) => `/test/get-exam/${id}`,
}

const TestService = {
    getExam: (id) => axiosConfig.get(TEST.GET_EXAM(id))
}

export default TestService