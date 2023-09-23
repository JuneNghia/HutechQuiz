import { Box, Button, Card, CardContent, CardHeader, Typography } from '@mui/material'
import React from 'react'
import { formattedValuePrice } from '../../utils/common/formatValue'
import { useNavigate } from 'react-router-dom'

const InfoExam = ({ title, handleSubmit, quantity, price, time }) => {
  const navigate = useNavigate()
  return (
    <>
      <Typography className='!bg-yellow-300 !mb-3 rounded-md p-2'>
        <span className=''>
          <span className='font-bold text-red-500'>Lưu ý: </span>
          <span>Mỗi lần thi sẽ chọn ngẫu nhiên các câu hỏi khác nhau trong tài liệu ôn tập của </span>

          <span className='text-blue-700 font-bold'>Hutech</span>
          <span className='text-red-700 font-bold'> Quiz </span>
          <br />
          <span>Số câu hỏi của một đề thi thử tương ứng với số câu khi các bạn thi thực tế.</span>
          <br />
         
        </span>
      </Typography>
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
          <Button sx={{ mt: 3, ml: 2 }} variant='contained' color='success' onClick={() => navigate('/document')}>
            Mua tài liệu ôn tập
          </Button>
        </CardContent>
      </Card>
    </>
  )
}

export default InfoExam
