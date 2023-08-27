import axiosConfig from "../utils/axios"

const WALLET = {
    PAY: '/wallet/pay'
}

const WalletService = {
    pay: (data) => axiosConfig.post(WALLET.PAY, data)
}

export default WalletService