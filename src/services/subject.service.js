import axiosConfig from '../utils/axios'

const SUBJECT = {
  GET_SUBJECTS: '/subject/get-all'  
}

const SubjectService = {
  getAllSubject: () => axiosConfig.get(SUBJECT.GET_SUBJECTS)
}

export default SubjectService
