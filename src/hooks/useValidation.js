import * as Yup from 'yup'

const phoneRegExp = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0|3|4|5|7|8])+([0-9]{7})$/

export const loginEmailValidationSchema = Yup.object({
  email: Yup.string().email('Địa chỉ email không hợp lệ').max(255).required('Địa chỉ Email không được để trống'),
  password: Yup.string().max(255).required('Mật khẩu không được để trống')
})

export const loginPhoneValidationSchema = Yup.object({
  phone: Yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ').required('Số điện thoại không được để trống'),
  password: Yup.string().max(255).required('Mật khẩu không được để trống')
})

export const registerValidationSchema = Yup.object({
  email: Yup.string().email('Địa chỉ email không hợp lệ').max(255).required('Vui lòng nhập địa chỉ email'),
  name: Yup.string().max(255).required('Vui nhập nhập họ tên của bạn'),
  password: Yup.string().max(255).required('Vui lòng nhập mật khẩu').min(8, 'Mật khẩu phải có độ dài ít nhất 8 kí tự'),
  repassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Mật khẩu nhập lại không khớp')
    .required('Vui lòng nhập lại mật khẩu')
})

export const userUpdateValidationSchema = Yup.object({
  code: Yup.string().required('Mã nhân viên không được để trống'),
  phone: Yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ').required('Số điện thoại không được để trống'),
  email: Yup.string().email('Địa chỉ email không hợp lệ').max(255).required('Địa chỉ email không được để trống'),
  fullName: Yup.string().max(255).required('Vui nhập nhập họ tên của bạn'),
  password: Yup.string().max(255).min(8, 'Mật khẩu phải có độ dài ít nhất 8 kí tự'),
})

export const userCreateValidationSchema = Yup.object({
  code: Yup.string().required('Mã nhân viên không được để trống'),
  role: Yup.string().required('Vui lòng chọn nhóm quyền'),
  phone: Yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ').required('Số điện thoại không được để trống'),
  email: Yup.string().email('Địa chỉ email không hợp lệ').max(255).required('Địa chỉ email không được để trống'),
  fullName: Yup.string().max(255).required('Vui nhập nhập họ tên của bạn'),
  password: Yup.string().max(255).min(8, 'Mật khẩu phải có độ dài ít nhất 8 kí tự').required('Mật khẩu không được để trống'),
})

