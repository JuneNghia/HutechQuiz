import { Button, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { Helmet } from 'react-helmet'
import { formattedValuePrice } from '../../utils/common/formatValue'
import { useQuery } from 'react-query'

const Wallet = () => {
  const { data } = useQuery(
    'me',
    async () => {
      return await axiosConfig.get('/me')
    },
    { refetchInterval: 5000 }
  )
  const [wallet, setWallet] = useState({
    balance: 0,
    bonus: 0,
    totalBalanceUsed: 0,
    totalBonusUsed: 0,
    totalBonusReceived: 0,
    totalDeposit: 0
  })
  const navigate = useNavigate()
  const formatValue = (value) => formattedValuePrice(value)

  const dataWallet = [
    {
      key: 1,
      content: 'Số tiền hiện có trong tài khoản',
      value: wallet.balance
    },
    {
      key: 2,
      content: 'Số tiền thưởng hiện có trong tài khoản',
      value: wallet.bonus
    },
    {
      key: 3,
      content: 'Tổng số tiền đã sử dụng',
      value: wallet.totalBalanceUsed
    },
    {
      key: 4,
      content: 'Tổng số tiền thưởng đã sử dụng',
      value: wallet.totalBonusUsed
    },
    {
      key: 5,
      content: 'Tổng số tiền thưởng đã được nhận',
      value: wallet.totalBonusReceived
    },
    {
      key: 6,
      content: 'Tổng số tiền đã nạp',
      value: wallet.totalDeposit
    }
  ]

  useEffect(() => {
    if (data) {
      const dataUser = data.data.data
      if (dataUser) {
        setWallet({
          balance: dataUser.wallet.balance,
          bonus: dataUser.wallet.bonus,
          totalBalanceUsed: dataUser.wallet.totalBalanceUsed,
          totalBonusUsed: dataUser.wallet.totalBonusUsed,
          totalBonusReceived: dataUser.wallet.totalBonusReceived,
          totalDeposit: dataUser.wallet.totalDeposit
        })
      }
    }
  }, [data])

  return (
    <>
      <Helmet>
        <title>Ví tiền</title>
      </Helmet>
      <Card>
        <CardHeader title='Ví tiền' />
        <CardContent className='mt-2'>
          {dataWallet.slice(0, 2).map((data) => (
            <Typography key={data.content} className='py-1'>
              {data.content} : <span className='font-bold'>{formattedValuePrice(data.value.toString())}đ</span>
            </Typography>
          ))}
          <Divider className='!border-indigo-500/100 pt-3' />
          <div className='mt-3'>
            {dataWallet.slice(2, 6).map((data) => (
              <Typography key={data.content} className='py-1'>
                {data.content} : <span className='font-bold'>{formattedValuePrice(data.value.toString())}đ</span>
              </Typography>
            ))}
          </div>

          <Button onClick={() => navigate('/payment')} sx={{ marginTop: '15px' }} variant='contained' color='success'>
            Nạp tiền
          </Button>
        </CardContent>
      </Card>
    </>
  )
}

export default Wallet
