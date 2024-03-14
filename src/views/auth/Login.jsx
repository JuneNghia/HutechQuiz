import { useCallback, useState } from 'react'
import { useFormik } from 'formik'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material'
import { AuthLayout } from '../../layouts/Auth'
import { loginEmailValidationSchema, loginPhoneValidationSchema } from '../../hooks/useValidation'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { Helmet } from 'react-helmet'
import PageLoader from '../../components/Loader/PageLoader'
import Swal from 'sweetalert2'

const Login = () => {
  const navigate = useNavigate()
  const auth = useAuth()
  const [method, setMethod] = useState('email')
  const [showLoader, setShowLoader] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const formik1 = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null
    },
    validationSchema: loginEmailValidationSchema,
    onSubmit: async (values, helpers) => {
      setShowLoader(true)
      try {
        await auth.login(values.email, values.password).then(() => {
          setTimeout(() => {
            setIsSuccess(true)
            location.pathname = '/'
          }, 1000)
        })
      } catch (err) {
        setTimeout(() => {
          const errCode = err.response.status
          setShowLoader(false)
          helpers.setStatus({ success: false })
          helpers.setSubmitting(false)
          if (errCode === 404) {
            helpers.setErrors({ submit: 'Địa chỉ email hoặc mật khẩu không chính xác' })
          } else if (errCode === 403) {
            helpers.setErrors({ submit: 'Tài khoản của bạn đã bị khoá. Hotline hỗ trợ : 0934 945 803' })
          } else {
            helpers.setErrors({ submit: `Lỗi kết nối máy chủ (Mã lỗi: ${errCode}) ` })
          }
        }, 1000)
      }
    }
  })

  const formik2 = useFormik({
    initialValues: {
      phone: '',
      password: '',
      submit: null
    },
    validationSchema: loginPhoneValidationSchema,
    onSubmit: async (values, helpers) => {
      setShowLoader(true)
      try {
        await auth.login(values.phone, values.password).then(() => {
          setIsSuccess(true)

          navigate('/', { replace: true })
          window.location.reload()
        })
      } catch (err) {
        setTimeout(() => {
          const errCode = err.response.status
          setShowLoader(false)
          helpers.setStatus({ success: false })
          helpers.setSubmitting(false)
          if (errCode === 404) {
            helpers.setErrors({ submit: 'Số điện thoại hoặc mật khẩu không chính xác' })
          } else if (errCode === 403) {
            helpers.setErrors({ submit: 'Tài khoản của bạn đã bị khoá. Hotline hỗ trợ : 0934 945 803' })
          } else {
            helpers.setErrors({ submit: `Lỗi kết nối máy chủ (Mã lỗi: ${errCode}) ` })
          }
        }, 1000)
      }
    }
  })

  const handleForgot = useCallback(() => {
    Swal.fire("Thông báo", "Chức năng đang được xây dựng, để lấy lại mật khẩu vui lòng liên hệ <b>093 4945 803 (Zalo)</b><br/><br/>Xin cảm ơn !", "info")
  }, [])

  const handleMethodChange = useCallback((event, value) => {
    setMethod(value)
    formik1.resetForm()
    formik2.resetForm()
  }, [])

  if (isSuccess) {
    return <PageLoader />
  }

  return (
    <>
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>
      <AuthLayout>
        <Box
          sx={{
            backgroundColor: 'background.paper',
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
                <Typography variant='h4'>Đăng nhập</Typography>
                <Typography color='text.secondary' variant='body2'>
                  Chưa có tài khoản? &nbsp;
                  <Link href='/register' underline='hover' variant='subtitle2'>
                    Đăng ký ngay
                  </Link>
                </Typography>
              </Stack>
              <Tabs onChange={handleMethodChange} sx={{ mb: 3 }} value={method}>
                <Tab label='Email' value='email' />
                <Tab label='Số điện thoại' value='phoneNumber' />
              </Tabs>

              {method === 'email' && (
                <form noValidate onSubmit={formik1.handleSubmit}>
                  <Stack spacing={3}>
                    <TextField
                      error={!!(formik1.touched.email && formik1.errors.email)}
                      fullWidth
                      helperText={formik1.touched.email && formik1.errors.email}
                      label={
                        <span>
                          Địa chỉ email <span className='text-red-600'>*</span>
                        </span>
                      }
                      name='email'
                      onChange={formik1.handleChange}
                      type='email'
                      value={formik1.values.email}
                    />
                    <TextField
                      error={!!(formik1.touched.password && formik1.errors.password)}
                      fullWidth
                      helperText={formik1.touched.password && formik1.errors.password}
                      label={
                        <span>
                          Mật khẩu <span className='text-red-600'>*</span>
                        </span>
                      }
                      name='password'
                      onChange={formik1.handleChange}
                      type='password'
                      value={formik1.values.password}
                    />
                  </Stack>
                  {formik1.errors.submit && (
                    <Typography color='error' sx={{ mt: 3 }} variant='body2'>
                      {formik1.errors.submit}
                    </Typography>
                  )}
                  <Grid sx={{ my: 2, justifyContent: 'space-between', alignItems: 'center' }} container>
                    <FormControlLabel
                      control={<Checkbox />}
                      label={
                        <Typography color='text.secondary' variant='body2'>
                          Nhớ mật khẩu
                        </Typography>
                      }
                    />

                    <Link onClick={handleForgot}  href='#' underline='hover' variant='subtitle2'>
                      Quên mật khẩu?
                    </Link>
                  </Grid>
                  <Button disabled={showLoader} fullWidth size='large' type='submit' variant='contained'>
                    {showLoader ? 'Đang đăng nhập...' : 'Đăng nhập'}
                  </Button>
                </form>
              )}

              {method === 'phoneNumber' && (
                <form noValidate onSubmit={formik2.handleSubmit}>
                  <Stack spacing={3}>
                    <TextField
                      error={!!(formik2.touched.phone && formik2.errors.phone)}
                      fullWidth
                      helperText={formik2.touched.phone && formik2.errors.phone}
                      label={
                        <span>
                          Số điện thoại <span className='text-red-600'>*</span>
                        </span>
                      }
                      name='phone'
                      onChange={formik2.handleChange}
                      value={formik2.values.phone}
                    />
                    <TextField
                      error={!!(formik2.touched.password && formik2.errors.password)}
                      fullWidth
                      helperText={formik2.touched.password && formik2.errors.password}
                      label={
                        <span>
                          Mật khẩu <span className='text-red-600'>*</span>
                        </span>
                      }
                      name='password'
                      onChange={formik2.handleChange}
                      type='password'
                      value={formik2.values.password}
                    />
                  </Stack>
                  {formik2.errors.submit && (
                    <Typography color='error' sx={{ mt: 3 }} variant='body2'>
                      {formik2.errors.submit}
                    </Typography>
                  )}
                  <Grid sx={{ my: 2, justifyContent: 'space-between', alignItems: 'center' }} container>
                    <FormControlLabel
                      control={<Checkbox />}
                      label={
                        <Typography color='text.secondary' variant='body2'>
                          Nhớ mật khẩu
                        </Typography>
                      }
                    />

                    <Link href='#' onClick={handleForgot}  underline='hover' variant='subtitle2'>
                      Quên mật khẩu?
                    </Link>
                  </Grid>
                  <Button disabled={showLoader} fullWidth size='large' type='submit' variant='contained'>
                    {showLoader ? 'Đang đăng nhập...' : 'Đăng nhập'}
                  </Button>
                </form>
              )}
            </div>
          </Box>
        </Box>
      </AuthLayout>
    </>
  )
}

export default Login
