import React, { useEffect, useState } from 'react'
import Error from '../../errors'
import useAuth from '../../../hooks/useAuth'
import { Chip } from '@mui/material'
import CustomDataGrid from '../../../components/Datagrid'
import UserService from '../../../services/user.service'
import dayjs from 'dayjs'
import { formattedValuePrice } from '../../../utils/common/formatValue'

const UserManagement = () => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [todayRes, setTodayRes] = useState(0)
  const [total, setTotal] = useState(0)
  const [rows, setRows] = useState([])
  const currentDate = dayjs().format('DD-MM-YYYY')

  const columns = [
    {
      field: 'name',
      headerName: 'Họ và tên',
      flex: 1,
      renderCell: (params) => {
        return (
          <div
            className='custom-link'
            onClick={() => {
              handleClick(params.row)
            }}
          >
            {params.value}
          </div>
        )
      }
    },

    { field: 'phone', headerName: 'Số điện thoại', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },

    {
      field: 'role',
      headerName: 'Vai trò',
      flex: 1,
      valueGetter: (params) => (params.value === 'ADMIN' ? 'Quản trị viên' : 'Người dùng')
    },
    {
      field: 'isActive',
      headerName: 'Trạng thái',
      flex: 1,
      renderCell: (params) => {
        return (
          <Chip
            color={params.value ? 'success' : 'error'}
            size='small'
            label={params.value ? 'Đang hoạt động' : 'Ngừng hoạt động'}
          />
        )
      }
    },
    {
      field: 'balance',
      headerName: 'Số dư hiện tại',
      flex: 1,
      valueGetter: (params) => formattedValuePrice(params.row.wallet.balance.toString())
    },
    {
      field: 'totalDeposit',
      headerName: 'Tổng tiền đã nạp',
      flex: 1,
      valueGetter: (params) => formattedValuePrice(params.row.wallet.totalDeposit.toString())
    },
    {
      field: 'createdAt',
      headerName: 'Thời gian khởi tạo',
      flex: 1,
      renderCell: (params) => {
        return <span>{dayjs(params.value).format('DD-MM-YYYY HH:MM:ss')}</span>
      }
    }
  ]

  useEffect(() => {
    setIsLoading(true)
    UserService.getAll()
      .then((res) => {
        const listUser = res.data.data
        if (listUser) {
          setIsLoading(false)
          setRows(listUser)
          setTotal(listUser.length)

          const currentDate = new Date()
          const totalRevenue = listUser.reduce((total = 0, user) => {
            if (user.role === 'USER') {
              return total + user.wallet.totalDeposit
            }
            return total
          }, 0)

          setTotalRevenue(totalRevenue)

          const todayUserRes = listUser.reduce((total = 0, user) => {
            const userCreatedAt = new Date(user.createdAt)

            if (
              userCreatedAt.getDate() === currentDate.getDate() &&
              userCreatedAt.getMonth() === currentDate.getMonth() &&
              userCreatedAt.getFullYear() === currentDate.getFullYear()
            ) {
              if (user.role === 'USER') {
                total++
              }
            }
            return total
          }, 0)

          setTodayRes(todayUserRes)
        }
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      {user.role === 'USER' ? (
        <Error />
      ) : (
        <>
          <div className='mb-3'>
            Tổng số lượng tài khoản: <span className='font-bold'>{formattedValuePrice(total.toString())}</span>
            <br />
            Tổng tài khoản mới hôm nay ({currentDate}) :{' '}
            <span className='font-bold'>{formattedValuePrice(todayRes.toString())}</span>
            <br />
            Tổng doanh thu: <span className='font-bold'>{formattedValuePrice(totalRevenue.toString())}đ</span>
          </div>
          <CustomDataGrid columns={columns} rows={rows} isLoading={isLoading} paginationMode='client' />
        </>
      )}
    </>
  )
}

export default UserManagement
