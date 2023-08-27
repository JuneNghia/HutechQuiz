import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useState, useEffect } from 'react'
import AccountMenu from '../../AccountMenu'
import useAuth from '../../../hooks/useAuth'
import { formattedValuePrice } from '../../../utils/common/formatValue'

const Topbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const { user } = useAuth()
  const [balance, setBalance] = useState(user?.wallet?.balance || 0)
  const [bonus, setBonus] = useState(user?.wallet?.bonus || 0)

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
    setBalance(user?.wallet?.balance || 0)
    setBonus(user?.wallet?.bonus || 0)
  }, [user?.wallet])

  console.log('hello')

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
            <Typography className='text-white'>
              Thưởng : {formattedValuePrice(bonus.toString())}đ
            </Typography>
          </div>
        )}

        <AccountMenu />
      </Box>
    </Box>
  )
}

export default Topbar
