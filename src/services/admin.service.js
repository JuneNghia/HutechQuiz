import axiosConfig from "../utils/axios"

const ADMIN = {
    DEPOSIT_USER: '/wallet/deposit'
}

const AdminService = {
    depositUser: (data) => axiosConfig.post(ADMIN.DEPOSIT_USER, data)
}

export default AdminService