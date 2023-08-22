import { useState } from 'react'
import { useFormik } from 'formik'
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material'
import { registerValidationSchema } from '../../hooks/useValidation'
import { AuthLayout } from '../../layouts/Auth'
import { Helmet } from 'react-helmet'
import AuthService from '../../services/auth.service'
import { handleAlertConfirm } from '../../utils/common/handleAlertConfirm'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [showLoader, setShowLoader] = useState(false)
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      phone: '',
      password: '',
      repassword: '',
      submit: null
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values, helpers) => {
      setShowLoader(true)
      try {
        await AuthService.register({
          phone: values.phone,
          name: values.name,
          password: values.password,
          email: values.email
        }).then(() => {
          setTimeout(() => {
            handleAlertConfirm({
              html: `Chúc mừng <b>${values.name}</b> đã tạo tài khoản thành công <br/>Bạn sẽ hài lòng khi đến với <span class='text-red-500 font-bold'>Hutech</span><span class='text-blue-500 font-bold'>Quiz</span>`,
              icon: 'success',
              confirmText: 'Đăng nhập ngay',
              handleConfirmed: () => navigate('/login', { replace: true })
            })
          }, 1500)
        })
      } catch (err) {
        setTimeout(() => {
          const errCode = err.response.status
          setShowLoader(false)
          helpers.setStatus({ success: false })
          helpers.setSubmitting(false)
          if (errCode === 409) {
            helpers.setErrors({ submit: 'Địa chỉ email hoặc số điện thoại đã được sử dụng' })
          } else {
            helpers.setErrors({ submit: `Lỗi kết nối máy chủ (Mã lỗi: ${errCode}) ` })
          }
        }, 1000)
      }
    }
  })

  return (
    <>
      <Helmet>
        <title>Đăng ký</title>
      </Helmet>
      <AuthLayout>
        <Box
          sx={{
            flex: '1 1 auto',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Box
            className='py-[100px] xs:pt-[18px] xs:pb-[30px]'
            sx={{
              maxWidth: 550,
              px: 3,

              width: '100%'
            }}
          >
            <div>
              <Stack spacing={1} sx={{ mb: 3 }}>
                <Typography variant='h4'>Đăng ký</Typography>
                <Typography color='text.secondary' variant='body2'>
                  Đã có tài khoản? &nbsp;
                  <Link href='/login' underline='hover' variant='subtitle2'>
                    Đăng nhập
                  </Link>
                </Typography>
              </Stack>
              <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.name && formik.errors.name)}
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    label={
                      <span>
                        Họ và tên <span className='text-red-600'>*</span>
                      </span>
                    }
                    name='name'
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label={
                      <span>
                        Địa chỉ email <span className='text-red-600'>*</span>
                      </span>
                    }
                    name='email'
                    onChange={formik.handleChange}
                    type='email'
                    value={formik.values.email}
                  />
                  <TextField
                    error={!!(formik.touched.phone && formik.errors.phone)}
                    fullWidth
                    helperText={formik.touched.phone && formik.errors.phone}
                    label={
                      <span>
                        Số điện thoại <span className='text-red-600'>*</span>
                      </span>
                    }
                    name='phone'
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label={
                      <span>
                        Mật khẩu <span className='text-red-600'>*</span>
                      </span>
                    }
                    name='password'
                    autoComplete='new-password'
                    onChange={formik.handleChange}
                    type='password'
                    value={formik.values.password}
                  />
                  <TextField
                    error={!!(formik.touched.repassword && formik.errors.repassword)}
                    fullWidth
                    helperText={formik.touched.repassword && formik.errors.repassword}
                    label={
                      <span>
                        Nhập lại mật khẩu <span className='text-red-600'>*</span>
                      </span>
                    }
                    name='repassword'
                    onChange={formik.handleChange}
                    type='password'
                    value={formik.values.repassword}
                  />
                </Stack>
                {formik.errors.submit && (
                  <Typography color='error' sx={{ mt: 3 }} variant='body2'>
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button sx={{ mt: 3 }} disabled={showLoader} fullWidth size='large' type='submit' variant='contained'>
                  {showLoader ? 'Đang đăng ký...' : 'Đăng ký'}
                </Button>
              </form>
            </div>
          </Box>
        </Box>
      </AuthLayout>
    </>
  )
}

export default Register
