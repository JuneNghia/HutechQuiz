import { useFormik } from 'formik'
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material'
import { registerValidationSchema } from '../../hooks/useValidation'
import { AuthLayout } from '../../layouts/Auth'
import { Helmet } from 'react-helmet'

const Register = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      repassword: '',
      submit: null
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await auth.signUp(values.email, values.name, values.password)
      } catch (err) {
        helpers.setStatus({ success: false })
        helpers.setErrors({ submit: err.message })
        helpers.setSubmitting(false)
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
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label={
                      <span>
                        Mật khẩu <span className='text-red-600'>*</span>
                      </span>
                    }
                    name='password'
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
                <Button fullWidth size='large' sx={{ mt: 3 }} type='submit' variant='contained'>
                  Đăng ký
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
