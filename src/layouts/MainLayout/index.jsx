import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import RouteLoader from '../../components/Loader/RouteLoader'
import Topbar from '../../components/Layout/TopBar'
import Sidebar from '../../components/Layout/SideBar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { Paper, useMediaQuery, useTheme } from '@mui/material'

const MainLayout = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  return (
    <Paper className='w-full min-h-screen  h-auto' style={{ backgroundColor: '#eeeeff' }}>
      <div className='flex relative'>
        <div className='fixed z-0'></div>
        <Sidebar />
        <main className='h-full w-full pt-16 flex-1 min-w-0'>
          <Topbar />
          <Suspense fallback={<RouteLoader height='80vh' />}>
            <div className={`${isMobile ? 'mx-3 my-6' : 'ml-6 mr-3 my-6'} `}>
              <Outlet />
            </div>
          </Suspense>
        </main>
      </div>
    </Paper>
  )
}

export default MainLayout
