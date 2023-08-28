import { makeStyles } from '@mui/styles'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { viVNGrid } from '../../utils/locale/vi-VN'
import { Box } from '@mui/material'

const CustomDataGrid = ({
  paginationMode,
  columns,
  rows,
  total,
  page,
  pageSize,
  setPage,
  setPageSize,
  isLoading,
  sortModel
}) => {
  const defaultSort = [{ field: 'createdAt', sort: 'desc' }]

  const useStyles = makeStyles({
    root: {
      '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus,&.MuiDataGrid-root .MuiDataGrid-cellCheckbox:focus-within,&.MuiDataGrid-root .MuiDataGrid-columnHeaderDraggableContainer:focus-within':
        {
          outline: 'none'
        },
      boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.2)',
      fontSize: 14,
      background: 'white'
    }
  })

  const classes = useStyles()

  const handlePaginationChange = (params) => {
    setPage(params.page)
    setPageSize(params.pageSize)
  }

  return (
    <Box className='w-full overflow-x-auto'>
      <DataGrid
        columns={columns}
        rows={rows}
        autoHeight
        sx={{
          '& .MuiButton-startIcon.MuiButton-iconSizeSmall.css-y6rp3m-MuiButton-startIcon': {
            marginBottom: '2px'
          }
        }}
        loading={isLoading}
        className={classes.root}
        pageSizeOptions={[10, 50, 100]}
        pagination
        disableRowSelectionOnClick
        paginationMode={paginationMode || 'server'}
        autoPageSize={paginationMode ? false : true}
        localeText={viVNGrid}
        rowCount={total}
        checkboxSelection
        onPaginationModelChange={setPage && setPageSize && handlePaginationChange}
        initialState={{
          pagination: {
            paginationModel: { page: page || 0, pageSize: pageSize || 10 }
          }
        }}
      />
    </Box>
  )
}

export default CustomDataGrid
