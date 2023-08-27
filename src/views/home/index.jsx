import { Badge, Card, CardContent, CardHeader, Chip, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import StepTitle from '../../components/StepTitle'

const Home = () => {
  return (
    <>
      <StepTitle title='Thông báo' />
      <Card>
        <CardHeader title='Chào mừng bạn đến với Hutech Quiz' />
        <CardContent>
          <Typography>
            <span className='text-red-500'>
              Hiện tại trang web chỉ được tối ưu cho máy tính, xin vui lòng sử dụng máy tính để đạt trải nghiệm cao nhất
            </span>
            <br />
            <br />
            Bạn đã được tặng 5000đ vào tài khoản thưởng để trải nghiệm
            <br />
            Kiểm tra số dư tại{' '}
            <Link className='text-blue-700' to='wallet'>
              đây
            </Link>
          </Typography>
        </CardContent>
      </Card>
      <Card className='mt-3'>
        <CardHeader
          title={
            <div>
              <span>Kiểm tra M1</span> <Chip label='Mới' color='error' size='small' />
            </div>
          }
        />
        <CardContent>
          <Typography>
            Di chuyển nhanh tới trang kiểm tra M1 tại{' '}
            <Link className='text-blue-700' to='module-m1/exam'>
              đây
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}

export default Home
