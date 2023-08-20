import { Button, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const dataWallet = [
  {
    key: 1,
    content: 'Số tiền hiện có trong tài khoản',
    value: '1.000.000'
  },
  {
    key: 2,
    content: 'Số tiền thưởng hiện có trong tài khoản',
    value: '55.000'
  },
  {
    key: 3,
    content: 'Tổng số tiền đã sử dụng',
    value: '0'
  },
  {
    key: 4,
    content: 'Tổng số tiền thưởng đã sử dụng',
    value: '0'
  },
  {
    key: 5,
    content: 'Tổng số tiền thưởng đã được nhận',
    value: '55.000'
  },
  {
    key: 6,
    content: 'Tổng số tiền đã nạp',
    value: '1.000.000'
  }
]

const Wallet = () => {
  const navigate = useNavigate()

  return (
    <Card>
      <CardHeader title='Ví tiền' />
      <CardContent className='mt-2'>
        {dataWallet.slice(0, 2).map((data) => (
          <Typography className='py-1'>
            {data.content} : <span className='font-bold'>{data.value}</span>
          </Typography>
        ))}
        <Divider className='!border-indigo-500/100 pt-3' />
        <div className='mt-3'>
          {dataWallet.slice(2, 6).map((data) => (
            <Typography className='py-1'>
              {data.content} : <span className='font-bold'>{data.value}</span>
            </Typography>
          ))}
        </div>

        <Button onClick={() => navigate('/payment')} sx={{ marginTop: '15px' }} variant='contained' color='success'>
          Nạp tiền
        </Button>
      </CardContent>
    </Card>
  )
}

export default Wallet
