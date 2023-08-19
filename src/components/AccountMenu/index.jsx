import * as React from 'react'

import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import useAuth from '../../hooks/useAuth'
import { handleAlertConfirm } from '../../utils/common/handleAlertConfirm'
import Swal from 'sweetalert2'

const AccountMenu = () => {
  const { logout } = useAuth()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogOut = () => {
    handleAlertConfirm({
      text: 'Bạn có chắc chắn muốn đăng xuất ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'red',
      confirmText: 'Đăng xuất',
      cancelText: 'Huỷ',
      handleConfirmed: () => {
        Swal.fire({
          html: '<div class="loading-container"><div class="loading-bar"></div><div class="mt-7">' + 'Đang đăng xuất' + '</div></div>',
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        })
        setTimeout(() => {
          logout()
          Swal.fire('', 'Đăng xuất thành công', 'success')
        }, 1200)
      }
    })
  }
  return (
    <React.Fragment>
      <Box>
        <Tooltip title='Thiết lập tài khoản'>
          <IconButton
            onClick={handleClick}
            size='small'
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonOutlineIcon fontSize='small' />
          </ListItemIcon>
          Thông tin cá nhân
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon>
          Cài đặt
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}

export default AccountMenu
