import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useState, useEffect } from 'react'
import AccountMenu from '../../AccountMenu'
import { formattedValuePrice } from '../../../utils/common/formatValue'
import { useQuery } from 'react-query'
import axiosConfig from '../../../utils/axios'

const Topbar = () => {
  const { data } = useQuery(
    'me',
    async () => {
      return await axiosConfig.get('/me')
    },
    { refetchInterval: 5000 }
  )
  const [scrolled, setScrolled] = useState(false)
  const [balance, setBalance] = useState(0)
  const [bonus, setBonus] = useState(0)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (data) {
      const dataUser = data.data.data
      if (dataUser) {
        setBalance(dataUser.wallet.balance)
        setBonus(dataUser.wallet.bonus)
      }
    }
  }, [data])

  return (
    <Box
      sx={{
        boxShadow: `${
          scrolled
            ? 'rgba(80, 80, 80, 0.2) 0px 1px 8px 0px, rgba(80, 80, 80, 0.14) 0px 3px 4px 0px, rgba(80, 80, 80, 0.12) 0px 3px 3px -2px'
            : ''
        }`,
        backgroundColor: 'mediumblue',
        position: 'fixed',
        zIndex: '99',
        top: 0,
        height: '75px',
        transitionDuration: '300ms',
        width: '-webkit-fill-available'
      }}
      display='flex'
      justifyContent='end'
      alignItems='center'
      p={2}
    >
      <Box className='flex items-center'>
        {!isMobile && (
          <div className='mx-10 flex'>
            <Typography className='text-white pr-12'>
              Số dư : <span>{formattedValuePrice(balance.toString())}đ</span>
            </Typography>
            <Typography className='text-white'>Thưởng : {formattedValuePrice(bonus.toString())}đ</Typography>
          </div>
        )}

        <AccountMenu />
      </Box>
    </Box>
  )
}

export default Topbar
