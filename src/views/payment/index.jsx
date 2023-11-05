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
  useTheme
} from '@mui/material'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import BankInfo from './BankInfo'
import { useFormik } from 'formik'
import { paymentValidation } from '../../hooks/useValidation'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined'
import { useNavigate } from 'react-router-dom'
import { formattedValuePrice } from '../../utils/common/formatValue'

const Payment = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const navigate = useNavigate()


  const dataBanking = [
    '8889 8017 478 573 - Ngân hàng Maritime Bank (MSB) - Nguyễn Minh Trung Nghĩa',
  ]

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

  const handleAmountChange = (event) => {
    setIsSuccess(false)
    const { value } = event.target
    formik.handleChange('amount')(formattedValuePrice(value))
  }

  return (
    <>
      <Helmet>
        <title>Nạp tiền vào ví</title>
      </Helmet>
      <Button onClick={() => navigate('/wallet')} variant='outlined' sx={{ mb: 2 }}>
        <KeyboardBackspaceOutlinedIcon className='mr-2' fontSize='small' /> Quay lại ví tiền
      </Button>
      <Typography className='!bg-yellow-300 !mb-3 rounded-md p-2'>
        <span className=''>
          <span className='font-bold'>Nếu sau 5 phút, các bạn tải lại trang vẫn không nhận tiền vui lòng liên hệ <span className='text-red-500'>0934 945 803</span> để được hỗ trợ giải quyết nhanh chóng.</span>
          
         
        </span>
      </Typography>
      <Card className='!bg-white !mb-5'>
        <CardHeader title='Nạp tiền vào ví Hutech Quiz' />
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
