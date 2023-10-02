import { Badge, Button, Card, CardContent, CardHeader, Chip, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import StepTitle from '../../components/StepTitle'
import useAuth from '../../hooks/useAuth'
import dataNotify from './data'
import { Helmet } from 'react-helmet'

const Home = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  return (
    <>
      <Helmet>
        <title>Trang Chủ</title>
      </Helmet>
      <StepTitle title='Thông báo' />
      <Card>
        <CardHeader title='Chào mừng bạn đến với Hutech Quiz' />
        <CardContent>
          <Typography>
            <span className='text-red-500'>
              Hiện tại trang web chỉ được tối ưu cho máy tính, xin vui lòng sử dụng máy tính để đạt trải nghiệm cao nhất
            </span>
          </Typography>
        </CardContent>
      </Card>
      {user.role === 'ADMIN' && (
        <>
          <Card className='mt-3'>
            <CardHeader
              title={
                <div>
                  <span>Nạp tiền khách hàng</span> <Chip label='ADMIN' color='success' size='small' />
                </div>
              }
            />
            <CardContent>
              <Button variant='contained' onClick={() => navigate('/user-deposit')}>
                Bấm dô đây
              </Button>
            </CardContent>
          </Card>
          <Card className='mt-3'>
            <CardHeader
              title={
                <div>
                  <span>Quản lý khách hàng / Doanh thu</span> <Chip label='ADMIN' color='success' size='small' />
                </div>
              }
            />
            <CardContent>
              <Button variant='contained' onClick={() => navigate('/user-management')}>
                Bấm dô đây
              </Button>
            </CardContent>
          </Card>
          {/* <Card className='mt-3'>
            <CardHeader
              title={
                <div>
                  <span>Thêm môn học / học phần mới</span> <Chip label='ADMIN' color='success' size='small' />
                </div>
              }
            />
            <CardContent>
              <Button variant='contained' onClick={() => navigate('/add-subject')}>
                Bấm dô đây
              </Button>
            </CardContent>
          </Card> */}
          <Card className='mt-3'>
            <CardHeader
              title={
                <div>
                  <span>Thêm câu hỏi mới</span> <Chip label='ADMIN' color='success' size='small' />
                </div>
              }
            />
            <CardContent>
              <Button variant='contained' onClick={() => navigate('/add-question')}>
                Bấm dô đây
              </Button>
            </CardContent>
          </Card>
        </>
      )}

      {dataNotify.map((notify) => (
        <Card key={`notify_${notify.title}`} className='mt-3'>
          <CardHeader
            title={
              <div>
                <span>{notify.title}</span> <Chip label='Hot' color={notify.color} size='small' />
              </div>
            }
          />
          <CardContent>
            <Typography>
              {notify.text}{' '}
              <Link className='text-blue-700' to={notify.link}>
                đây
              </Link>
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

export default Home
