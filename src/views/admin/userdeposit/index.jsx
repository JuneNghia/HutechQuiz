import { Button, Card, CardContent, CardHeader, FormControl, FormGroup, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import Swal from 'sweetalert2'
import { depositUserValidation } from '../../../hooks/useValidation'
import { formattedValuePrice } from '../../../utils/common/formatValue'
import AdminService from '../../../services/admin.service'

const UserDeposit = () => {
  const handleSubmit = (values) => {
    const amountWithoutDot = values.amount.replace(/\./g, '')
    const amount = parseInt(amountWithoutDot, 10)
    Swal.fire({
      icon: 'question',
      html: `Bạn có chắc chắn muốn nạp cho số điện thoại <b>${values.phone}</b> số tiền <b>${values.amount}</b>`,
      showCancelButton: true,
      cancelButtonText: 'Huỷ',
      confirmButtonText: 'Nạp tiền',
      preConfirm: () => {
        Swal.update({
          showCancelButton: false,
          showConfirmButton: false,
          icon: 'info',
          html: 'Đang xử lý...<br/> Vui lòng không tắt trang hoặc trình duyệt'
        })

        AdminService.depositUser({
          phone: values.phone,
          amount: amount
        })
          .then(() => {
            setTimeout(() => {
              Swal.update({
                icon: 'success',
                html: 'Nạp tiền thành công',
                showConfirmButton: false,
                showCancelButton: true,
                cancelButtonText: 'Xác nhận',
                cancelButtonColor: 'green'
              })
            }, 1000)
          })
          .catch(() => {
            Swal.update({
              icon: 'error',
              html: `Không tìm thấy người dùng có số điện thoại <b>${values.phone}</b>`,
              showConfirmButton: false,
              showCancelButton: true,
              cancelButtonText: 'Thử lại',
              cancelButtonColor: '#0000cd'
            })
          })

        return false
      }
    })
  }

  const formik = useFormik({
    initialValues: {
      phone: '',
      amount: ''
    },
    validationSchema: depositUserValidation,
    onSubmit: handleSubmit
  })

  const handleAmountChange = (event) => {
    const { value } = event.target
    formik.handleChange('amount')(formattedValuePrice(value))
  }

  return (
    <Card>
      <CardHeader className='text-center' title='Nạp tiền khách hàng' />
      <CardContent>
        <form noValidate onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl margin='normal'>
              <TextField
                name='phone'
                value={formik.values.phone}
                onChange={formik.handleChange}
                label='Số điện thoại'
                size='small'
                error={!!(formik.errors.phone && formik.touched.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </FormControl>
            <FormControl margin='normal'>
              <TextField
                name='amount'
                value={formik.values.amount}
                onChange={handleAmountChange}
                label='Số tiền'
                size='small'
                error={!!(formik.errors.amount && formik.touched.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
              />
            </FormControl>
          </FormGroup>
          <div className='w-full flex justify-center mt-2'>
            <Button type='submit' variant='contained' color='success'>
              Nạp tiền
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default UserDeposit
