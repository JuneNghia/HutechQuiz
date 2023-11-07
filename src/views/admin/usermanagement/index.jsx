import React, { useEffect, useState } from 'react'
import Error from '../../errors'
import useAuth from '../../../hooks/useAuth'
import { Chip, IconButton, TextField } from '@mui/material'
import CustomDataGrid from '../../../components/Datagrid'
import UserService from '../../../services/user.service'
import SearchIcon from '@mui/icons-material/Search'
import dayjs from 'dayjs'
import { formattedValuePrice } from '../../../utils/common/formatValue'
import { Helmet } from 'react-helmet'

const UserManagement = () => {
  const { user } = useAuth()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [todayRes, setTodayRes] = useState(0)
  const [total, setTotal] = useState(0)
  const [totalUserNoDeposit, setTotalUserNoDeposit] = useState(0)
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
        return <span>{dayjs(params.value).format('DD-MM-YYYY HH:mm:ss')}</span>
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

          setTotalRevenue(totalRevenue - 200000)

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

          const totalNoDeposit = listUser.reduce((total = 0, user) => {
            if (user.role === 'USER' && user.wallet.totalDeposit === 0) {
              total++
            }
            return total
          }, 0)

          setTotalUserNoDeposit(totalNoDeposit)
        }
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [])

  const filteredData = rows.filter((user) => {
    if (
      user.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      user.phone.includes(searchKeyword) ||
      user.email.toLowerCase().includes(searchKeyword.toLowerCase())
    ) {
      return true
    }
    return false
  })

  return (
    <>
      {user.role === 'USER' ? (
        <Error />
      ) : (
        <>
          <Helmet>
            <title>Quản lý tài khoản</title>
          </Helmet>
          <div className='mb-3'>
            Tổng số lượng tài khoản: <span className='font-bold'>{formattedValuePrice(total.toString())}</span>
            <br />
            Tổng tài khoản mới hôm nay ({currentDate}):
            <span className='font-bold'> {formattedValuePrice(todayRes.toString())}</span>
            <br />
            Tổng tài khoản đã tạo nhưng chưa nạp:
            <span className='font-bold'> {formattedValuePrice(totalUserNoDeposit.toString())}</span>
            <br />
            Tổng doanh thu: <span className='font-bold'>{formattedValuePrice(totalRevenue.toString())}đ</span>
          </div>
          <TextField
            className=' w-full bg-white !mb-3'
            inputProps={{ style: { padding: 0 } }}
            placeholder='Tìm kiếm bằng tên, số điện thoại hoặc email'
            size='small'
            focused
            InputProps={{
              startAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              )
            }}
            value={searchKeyword}
            onChange={(event) => setSearchKeyword(event.target.value)}
          />
          <CustomDataGrid columns={columns} rows={filteredData} isLoading={isLoading} paginationMode='client' />
        </>
      )}
    </>
  )
}

export default UserManagement
