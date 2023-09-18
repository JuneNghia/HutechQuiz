import axiosConfig from '../utils/axios'

const REPORT = {
  QUESTION: '/report/question'
}

const ReportService = {
  question: (data) => axiosConfig.post(REPORT.QUESTION, data)
}

export default ReportService
