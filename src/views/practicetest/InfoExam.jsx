import { Box, Button, Card, CardContent, CardHeader, Typography } from '@mui/material'
import React from 'react'
import { formattedValuePrice } from '../../utils/common/formatValue'

const InfoExam = ({ title, handleSubmit, quantity, price, time }) => {
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <Box className='mt-2'>
          <Typography>
            Số câu : <span className='font-bold'>{quantity}</span> câu
          </Typography>
          <Typography>
            Số tiền : <span className='font-bold'>{formattedValuePrice(price.toString()) || '0'}đ</span> / lần
          </Typography>
          <Typography>
            Thời gian làm bài : <span className='font-bold'>{time / 60}</span> phút
          </Typography>
        </Box>

        <Button sx={{ mt: 3 }} variant='contained' onClick={handleSubmit}>
          Bắt đầu làm bài
        </Button>
      </CardContent>
    </Card>
  )
}

export default InfoExam
