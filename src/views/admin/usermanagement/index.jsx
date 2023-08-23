import React, { useEffect, useState } from 'react'
import Error from '../../errors'
import useAuth from '../../../hooks/useAuth'
import { Chip } from '@mui/material'
import CustomDataGrid from '../../../components/Datagrid'
import UserService from '../../../services/user.service'
import dayjs from 'dayjs'

const UserManagement = () => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [rows, setRows] = useState([])
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
          setTotal(rows.length)
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
        <CustomDataGrid columns={columns} rows={rows} isLoading={isLoading} />
      )}
    </>
  )
}

export default UserManagement
