import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import BankInfo from './BankInfo'
import { useFormik } from 'formik'
import { paymentValidation } from '../../hooks/useValidation'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined'
import { useNavigate } from 'react-router-dom'
import { formattedValuePrice } from '../../utils/common/formatValue'
import StepTitle from '../../components/StepTitle'
import { useQuery } from 'react-query'
import zaloQrImg from '../../assets/zalo-qr.png'
import Swal from 'sweetalert2'

const Payment = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const navigate = useNavigate()
  const [balance, setBalance] = useState(0)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

  const { data: dataUser } = useQuery(
    'me',
    async () => {
      return await axiosConfig.get('/me')
    },
    { refetchInterval: 5000 }
  )

  const dataBanking = ['8889 8017 478 573 - Ngân hàng Maritime Bank (MSB) - Nguyễn Minh Trung Nghĩa']

  const data = {
    method: '',
    amount: '',
    info: dataBanking[0]
  }

  const handleSubmit = (value) => {
    setIsSuccess(true)
  }

  const formik = useFormik({
    initialValues: data,
    validationSchema: paymentValidation,
    onSubmit: handleSubmit
  })

  const hanldeChangeMethod = (e) => {
    setIsSuccess(false)
    formik.handleChange(e)
  }

  const handleShowSupportInfo = useCallback(() => {
    Swal.fire({
      html: `<div class='flex items-center flex-col justify-center'>
      <h5 class='mb-4'>Mở ứng dụng Zalo và quét mã dưới đây</h5><img src='${zaloQrImg}' width='200'></div>`,
      confirmButtonText: 'Xong'
    })
  }, [])

  const handleAmountChange = (event) => {
    setIsSuccess(false)
    const { value } = event.target
    formik.handleChange('amount')(formattedValuePrice(value))
  }

  useEffect(() => {
    if (dataUser) {
      setBalance(dataUser.data.data.wallet.balance)
    }
  }, [dataUser])

  return (
    <>
      <Helmet>
        <title>Nạp tiền vào ví</title>
      </Helmet>
      {isMobile && <StepTitle title={`Số dư : ${formattedValuePrice(balance.toString())}đ`} />}
      <Button onClick={() => navigate('/wallet')} variant='outlined' sx={{ mb: 2 }}>
        <KeyboardBackspaceOutlinedIcon className='mr-2' fontSize='small' /> Quay lại ví tiền
      </Button>
      <div className='!bg-yellow-300 !mb-3 rounded-md p-2'>
        <span className='flex items-center gap-x-4'>
          <span className='font-bold'>
            Nếu sau 5 phút, số dư vẫn không được cập nhật vui lòng{' '}
            <span>
              <Button variant='contained' color='error' size='small' onClick={handleShowSupportInfo}>
                Nhấn vào đây
              </Button>
            </span>{' '}
            để được hỗ trợ giải quyết nhanh chóng.
          </span>
        </span>
      </div>
      <Card className='!bg-white !mb-5'>
        <CardHeader title='Nạp tiền vào ví Uni Quiz' />
        <CardContent>
          <form noValidate onSubmit={formik.handleSubmit}>
            <FormGroup>
              <FormControl margin='normal'>
                <InputLabel id='label-select-method'>Chọn phương thức chuyển khoản</InputLabel>
                <Select
                  name='method'
                  labelId='label-select-method'
                  id='select-method'
                  label='Chọn phương thức chuyển khoản'
                  value={formik.values.method}
                  onChange={hanldeChangeMethod}
                >
                  <MenuItem value='momo'>Ví Momo</MenuItem>
                  <MenuItem value='bank'>Chuyển khoản ngân hàng</MenuItem>
                </Select>
              </FormControl>
              {formik.values.method && (
                <FormControl margin='normal'>
                  <TextField
                    name='amount'
                    value={formik.values.amount}
                    onChange={handleAmountChange}
                    onBlur={formik.handleBlur}
                    label={
                      <span>
                        Số tiền cần nạp <span className='text-red-500'>*</span>
                      </span>
                    }
                    error={!!(formik.errors.amount && formik.touched.amount)}
                    helperText={formik.touched.amount && formik.errors.amount}
                  />
                </FormControl>
              )}

              {!!(formik.errors.amount && formik.touched.amount) && (
                <Typography className='py-2'>
                  <span className='font-bold'>Lưu ý: </span>Nếu bạn thanh toán với số tiền nhỏ hơn mức quy định thì việc
                  nạp tiền không được thực hiện và không được hoàn lại số tiền đã thanh toán.
                </Typography>
              )}

              {/* {formik.values.method === 'bank' && (
                <FormControl margin='normal'>
                  <InputLabel id='label-select-bank'>Chọn ngân hàng chuyển khoản</InputLabel>
                  <Select
                    labelId='label-select-bank'
                    id='select-bank'
                    name='info'
                    label='Chọn ngân hàng chuyển khoản'
                    defaultValue={dataBanking[0]}
                    onChange={formik.handleChange}
                  >
                    {dataBanking.map((data) => (
                      <MenuItem value={data}>{data}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )} */}
            </FormGroup>
            {formik.values.method && (
              <Button type='submit' sx={{ marginTop: '15px', textTransform: 'uppercase' }} variant='contained'>
                Tạo thông tin chuyển khoản
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
      {isSuccess && <BankInfo type={formik.values.method} data={formik.values} />}
    </>
  )
}

export default Payment
