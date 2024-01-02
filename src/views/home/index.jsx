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
          <Card className='mt-3'>
            <CardHeader
              title={
                <div>
                  <span>Quản lý câu hỏi</span> <Chip label='ADMIN' color='success' size='small' />
                </div>
              }
            />
            <CardContent>
              <Button variant='contained' onClick={() => navigate('/question-management')}>
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
              <div className='flex items-center'>
                <Chip label={notify.label} color={notify.color} size='small' />{' '}
                <span className='h-[19px] ml-2'>{notify.title}</span>
              </div>
            }
          />
          <CardContent>
            <Typography className='flex'>
              {notify.text}{' '}
              {notify.html && <div dangerouslySetInnerHTML={{ __html: notify.html }} />}
              {notify.link && (
                <Link className='text-blue-700 underline ml-1' to={notify.link}>
                  tại đây
                </Link>
              )}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

export default Home
