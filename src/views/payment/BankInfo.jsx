import { Box, Button, Card, CardContent, CardHeader, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import useAuth from '../../hooks/useAuth'
import PageLoader from '../../components/Loader/PageLoader'
import qrMomo from '../../assets/momo-qr.png'
import qrBank from '../../assets/bank-qr.png'

const BankInfo = ({ data, type }) => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [accountNo, bankName, accountOwner] = data.info.split(' - ')

  const infoBank = [`Số tài khoản : ${accountNo}`, `Ngân hàng :  ${bankName}`, `Chủ tài khoản : ${accountOwner}`]
  const infoMomo = ['Số điện thoại : 0934945803', 'Tên người nhận : Nguyễn Minh Trung Nghĩa']

  const handlePaid = () => {
    Swal.fire(
      '',
      'Sau khi thực hiện thanh toán, vui lòng đợi khoảng 3-5 phút và thực hiện tải lại trang để cập nhật số dư.<br/><br/><b>Hotline hỗ trợ : 0934 945 803</b>',
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
        <PageLoader height='30vh' text='Đang tạo' variant='h5' />
      ) : (
        <>
          <CardHeader title='Thông tin chuyển khoản' />
          <CardContent component='div' className='mt-3'>
            <div className='flex items-center gap-6'>
              <Box className='p-2 border-dotted border-2 border-sky-500 w-fit'>
                {type === 'bank'
                  ? infoBank.map((info) => (
                      <Typography key={info} sx={{ marginTop: '5px' }}>
                        {info}
                      </Typography>
                    ))
                  : infoMomo.map((info) => (
                      <Fragment>
                        <div>
                          <Typography key={info} sx={{ marginTop: '5px' }}>
                            {info}
                          </Typography>
                        </div>
                      </Fragment>
                    ))}
              </Box>

              <img src={type === 'bank' ? qrBank : qrMomo} width={'150px'} />
              <div className='flex flex-col'>
                <div className='font-bold'>
                  Số tiền : <span className='text-[24px] text-red-500'>{data.amount}</span>
                </div>
                <div className='font-bold'>
                  Nội dung : <span className='text-[24px] text-red-500'>hutechquiz {user.phone}</span>
                </div>
              </div>
            </div>

            <Typography className='!mt-3'>
              <span className='font-bold text-red-600'>Lưu ý: </span>Trước khi xác nhận chuyển khoản, vui lòng
              <b> kiểm tra chính xác nội dung</b> chuyển khoản trước khi chuyển vì đây là thông tin được xác định để
              thực hiện yêu cầu nạp tiền của bạn. Các giao dịch <b>không có nội dung</b> hoặc{' '}
              <b>nội dung không chính xác</b> sẽ không được hỗ trợ hoàn tiền.
            </Typography>

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
