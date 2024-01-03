import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sidebar as ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import logoHutech from '../../../assets/logo-hutech.png'
import { MenuSideBar } from '../../../constants'
import useMediaQuery from '@mui/material/useMediaQuery'

const Item = ({ title, to, icon, selected, newBlank }) => {
  return (
    <MenuItem
      active={selected === to}
      style={{ color: 'white' }}
      icon={icon}
      component={<Link to={to} target={newBlank && '_blank'} />}
    >
      <Typography variant='h5'>{title}</Typography>
    </MenuItem>
  )
}

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [selected, setSelected] = useState('')
  const location = useLocation()
  const theme = useTheme()

  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

  useEffect(() => {
    if (location.pathname) {
      setSelected(location.pathname)
      if(isMobile) { 
        setIsCollapsed(true)
      }
    }
  }, [location.pathname])

  useEffect(() => {
    setIsCollapsed(isMobile)
  }, [isMobile])

  return (
    <Box
      sx={{
        position: `${isMobile ? 'absolute' : 'relative'}`,
        '& .ps-sidebar-container.css-dip3t8': {
          position: 'fixed',
          zIndex: 9999,
          width: `${isMobile ? (isCollapsed ? '0' : '250px') : isCollapsed ? '75px' : '250px'}`,
          transitionDuration: '300ms',
          backgroundColor: 'white',
          boxShadow: 'rgba(0, 0, 0, 0.3) 0px 16px 30px, rgba(0, 0, 0, 0.22) 0px 8px 8px'
        },
        '& .css-1wvake5.ps-collapsed': {
          width: `${isMobile ? '0px' : '75px'}`,
          minWidth: `${isMobile ? '0px' : '75px'}`
        },
        '& .ps-menu-root.css-vj11vy': {
          width: `${isCollapsed ? '75px' : '250px'}`
        },
        '& .ps-menu-root.css-vj11vy li': {
          margin: `${isMobile ? '10px 0px 0px' : '4px 0px 0px'}`,
          width: '95%'
        },
        // "& .ps-menu-root.css-vj11vy li:hover": {
        //   backgroundColor: "red !important",
        //   borderRadius: "0 50px 50px 0"
        // },
        '& .ps-menu-icon': {
          backgroundColor: 'transparent !important'
        },
        '& .ps-menu-icon.css-wx7wi4': {
          marginLeft: `${isCollapsed ? '11px' : '0'}`,
          color: '#484848'
        },
        '& .ps-menu-button': {
          fontWeight: '500',
          paddingLeft: '8px !important',
          paddingRight: '15px !important',
          transitionDuration: '300ms',
          position: 'relative'
        },
        '& .ps-menu-button:hover': {
          backgroundColor: '#fdfd96 !important',
          transitionDuration: '300ms',
          borderRadius: '0 50px 50px 0'
        },
        '& .ps-menu-label.ps-open.css-12w9als': {
          color: '#800000',
          fontWeight: 'bold'
        },
        '& .ps-menu-icon.ps-open.css-wx7wi4': {
          color: '#800000'
        },
        '& .ps-submenu-expand-icon.css-1cuxlhl': {
          position: 'absolute',
          top: '8px',
          right: '7px'
        },
        '& .ps-submenu-expand-icon.ps-open.css-1cuxlhl': {
          color: '#ff6d00',
          position: 'absolute',
          top: '8px',
          right: '7px'
        },
        '& .ps-menu-button.ps-active': {
          backgroundColor: '#fcd5a3 !important',
          transitionDuration: '300ms',
          borderRadius: '0 50px 50px 0'
        },
        '& .ps-menu-button.ps-open': {
          color: `black !important`
        },
        '& .ps-sidebar-root.css-1wvake5': {
          height: '100%'
        },
        '& .ps-menuitem-root.ps-submenu-root.ps-open.css-16jesut': {
          position: 'relative'
        },
        '& .ps-menuitem-root.ps-submenu-root.ps-open.css-16jesut::before': {
          content: '""',
          inset: '0',
          position: 'absolute',
          left: '0px',
          width: '5px',
          backgroundColor: `#991b1b`,
          borderRadius: '20px'
        },
        '& .ps-submenu-content.ps-open.css-z5rm24': {
          backgroundColor: 'white',
          '& ul': {
            paddingLeft: '0px !important',
            '& li': {
              marginLeft: '5px !important',
              '& .ps-menu-icon': {
                marginLeft: '8px !important'
              }
            }
          }
        },
        '& .css-1097eso': {
          display: 'none'
        },
        '& .ps-menu-label': {
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '1rem',
          lineHeight: 1.2,
          color: 'black',
          '& h5': {
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 500,
            fontSize: '1rem',
            lineHeight: 1.2,
            color: 'black'
          }
        },
        height: '100vh'
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape='square'>
          {!isCollapsed ? (
            <div className='w-[90%] h-[200px] mx-auto relative mt-3.5'>
              <span
                className={`absolute z-10 left-0 right-0 top-2.5 m-auto flex justify-start items-center text-xl font-bold`}
              >
                <div className='max-h-[30%] text-[28px]'>
                  <span style={{ color: '#0063cc' }}>Hutech </span>
                  <span className='text-red-800'>Quiz</span>
                </div>
              </span>
              <div className='relative  overflow-hidden top-[-6px] w-[96%] mx-auto'>
                <div className='flex justify-center items-center h-full'>
                  <Box
                    sx={{
                      '& .MuiAvatar-root.MuiAvatar-circular.MuiAvatar-colorDefault.css-dab9rk-MuiAvatar-root': {
                        backgroundColor: '#fcd5a3',
                        boxShadow:
                          'box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;',
                        color: `black`,
                        fontWeight: '600',
                        marginTop: '32px'
                      }
                    }}
                  >
                    <Link>
                      <img className='mt-[75px]' width={170} src={logoHutech} alt='logo-hutech' />
                    </Link>
                  </Box>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex justify-center items-center mt-20'>
              <img src={logoHutech} alt='logo-hutech' />
            </div>
          )}

          <Box paddingLeft={isCollapsed ? undefined : '0%'}>
            <Menu>
              {MenuSideBar.slice(0, 1).map((item) => (
                <Item
                  key={item.index}
                  title={item.title}
                  icon={item.icon}
                  to={item.to}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}

              {!isCollapsed && (
                <h4 className='px-4 py-3' style={{ color: `black`, fontWeight: '600' }}>
                  Luyện thi trắc nghiệm
                </h4>
              )}

              {MenuSideBar.slice(1, 7).map((item) => (
                <SubMenu className='text-zinc-600' icon={item.icon} key={item.index} label={item.title}>
                  {item.subMenu.map((e) => (
                    <Item
                      key={e.title}
                      title={e.title}
                      icon={e.icon}
                      to={e.to}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  ))}
                </SubMenu>
              ))}

              {MenuSideBar.slice(7, 8).map((item) => (
                <Item
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                  to={item.to}
                  selected={selected}
                  setSelected={setSelected}
                  newBlank={item.newBlank}
                />
              ))}
            </Menu>
          </Box>
        </Menu>
      </ProSidebar>
      <Box
        sx={{
          position: 'fixed',
          zIndex: '9999',
          top: `${isMobile ? (isCollapsed ? '20px' : '23px') : isCollapsed ? '20px' : '24px'}`,
          left: `${isMobile ? (isCollapsed ? '15px' : '200px') : isCollapsed ? '21px' : '200px'}`,
          transitionDuration: '200ms'
          // right: `${isCollapsed ? "26%" : "-7.5%"}`,
        }}
      >
        <IconButton sx={{outline: 3}} className='!hover:bg-slate-200 !bg-white !p-[5px] !outline !outline-cyan-500' onClick={() => setIsCollapsed(!isCollapsed)}>
          <MenuOutlinedIcon sx={{ color: 'black' }} />
        </IconButton>
      </Box>
    </Box>
  )
}

export default Sidebar
