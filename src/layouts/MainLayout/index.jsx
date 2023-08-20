import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import RouteLoader from '../../components/Loader/RouteLoader'
import Topbar from '../../components/Layout/TopBar'
import Sidebar from '../../components/Layout/SideBar'
import { Paper } from '@mui/material'

const MainLayout = () => {
  return (
    <Paper style={{ backgroundColor: '#eeeeff' }}>
      <div className='flex relative w-screen'>
        <div className='fixed inset-0 z-0'></div>
        <Sidebar />
        <main className='h-full w-full pt-16 flex-1 min-w-0'>
          <Topbar />
          <Suspense fallback={<RouteLoader height='80vh' />}>
            <div className='mx-6 my-6'>
              <Outlet />
            </div>
          </Suspense>
        </main>
      </div>
    </Paper>
  )
}

export default MainLayout
