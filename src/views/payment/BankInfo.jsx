import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import useAuth from '../../hooks/useAuth'
import PageLoader from '../../components/Loader/PageLoader'

const BankInfo = ({ data, type }) => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [accountNo, bankName, accountOwner] = data.info.split(' - ')

  const infoBank = [
    `Số tài khoản : ${accountNo}`,
    `Ngân hàng :  ${bankName}`,
    `Chủ tài khoản : ${accountOwner}`,
    `Số tiền chuyển khoản : ${data.amount}`,
    `Nội dung : hutechquiz ${user.phone}`
  ]
  const infoMomo = [
    'Số điện thoại : 0934945803',
    'Tên người nhận : Nguyễn Minh Trung Nghĩa',
    `Số tiền chuyển khoản : ${data.amount}`,
    `Nội dung : hutechquiz ${user.phone}`
  ]

  const handlePaid = () => {
    Swal.fire(
      '',
      'Sau khi thực hiện thanh toán, vui lòng đợi khoảng 3-5 phút và thực hiện tải lại trang để cập nhật số dư.<br/><br/><b>Hotline hỗ trợ : 055 9560 220</b>',
      'info'
    )
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1200)
  })

  return (
    <Card>
      {isLoading ? (
        <PageLoader height='30vh' text='Đang tạo' />
      ) : (
        <>
          <CardHeader title='Thông tin chuyển khoản' />
          <CardContent component='div' className='mt-3'>
            {type === 'bank'
              ? infoBank.map((info) => (
                  <Typography key={info} sx={{ marginTop: '5px' }}>
                    {info}
                  </Typography>
                ))
              : infoMomo.map((info) => (
                  <Typography key={info} sx={{ marginTop: '5px' }}>
                    {info}
                  </Typography>
                ))}

            <Button
              onClick={handlePaid}
              variant='contained'
              color='success'
              sx={{ textTransform: 'uppercase', marginTop: '25px' }}
            >
              Tôi đã thực hiện thanh toán
            </Button>
          </CardContent>
        </>
      )}
    </Card>
  )
}

export default BankInfo
