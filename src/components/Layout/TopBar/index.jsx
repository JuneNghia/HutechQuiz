import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useState, useEffect } from 'react'
import AccountMenu from '../../AccountMenu'
import useAuth from '../../../hooks/useAuth'
import { formattedValuePrice } from '../../../utils/common/formatValue'
import UserService from '../../../services/user.service'

const Topbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const {user} = useAuth()
  const [dataUser, setDataUser] = useState(user)
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
    UserService.getMe().then((res) => {
      setDataUser(res.data.data)
    })
  }, [dataUser])

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
      {/* ICONS */}

      <Box className='flex items-center'>
        {/* <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton> */}
        {!isMobile && (
          <div className='mx-10 flex'>
            <Typography className='text-white pr-12'>
              Số dư : <span>{formattedValuePrice(dataUser.wallet.balance.toString())}đ</span>
            </Typography>
            <Typography className='text-white'>
              Thưởng : {formattedValuePrice(dataUser.wallet.bonus.toString())}đ
            </Typography>
          </div>
        )}

        <AccountMenu />
      </Box>
    </Box>
  )
}

export default Topbar
