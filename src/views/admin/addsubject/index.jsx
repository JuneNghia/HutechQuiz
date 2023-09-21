import { Box, Button, Card, CardContent, CardHeader, TextField, Typography } from '@mui/material'
import React from 'react'

const AddSubject = () => {
  return (
    <>
      <Card>
        <CardHeader title='Thêm môn học mới' />
        <CardContent>
          <Box className='flex items-center my-5'>
            <Typography className='flex-0.5'>Tên môn học: </Typography>
            <TextField className='!ml-2 flex-1 !rounded-none' inputProps={{ style: { padding: 3, marginLeft: 2 } }} size='small' />
          </Box>
          <Button variant='contained'>Thêm môn học</Button>
        </CardContent>
      </Card>
    </>
  )
}

export default AddSubject
