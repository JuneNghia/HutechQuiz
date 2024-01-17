import axiosConfig from '../utils/axios'

const REPORT = {
  QUESTION: '/report/question',
  REPORTED: '/report/reported'
}

const ReportService = {
  question: (data) => axiosConfig.post(REPORT.QUESTION, data),
  reported: () => axiosConfig.get(REPORT.REPORTED)
}

export default ReportService
