import { Label } from '@mui/icons-material'
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
  TextField
} from '@mui/material'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import BankInfo from './BankInfo'
import { useFormik } from 'formik'
import { paymentValidation } from '../../hooks/useValidation'

const Payment = () => {
  const [isSuccess, setIsSuccess] = useState(false)

  const dataBanking = [
    '08001010962089 - Ngân hàng Maritime Bank (MSB) - Nguyễn Minh Trung Nghĩa',
    '000019122003 - Ngân hàng MB Bank - Lê Lan Nhi',
    '0000028012001 - Ngân hàng MB Bank - Lê Kiều Lan'
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

  return (
    <>
      <Helmet>
        <title>Nạp tiền vào ví</title>
      </Helmet>
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
                    onChange={formik.handleChange}
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

              {formik.values.method === 'bank' && (
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
              )}
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
