import { Box, Button, Card, CardContent, CardHeader, Typography } from '@mui/material'
import React from 'react'
import { formattedValuePrice } from '../../utils/common/formatValue'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined'

const InfoExam = ({ title, handleSubmit, quantity, price, time }) => {
  const navigate = useNavigate()
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Button onClick={() => navigate('/')} variant='outlined'>
        <ArrowCircleLeftOutlinedIcon className='mr-2' />
        Quay lại trang chủ
      </Button>
      <Typography className='!bg-yellow-300 !my-3  rounded-md p-2'>
        <span className=''>
          <span className='font-bold text-red-500'>Lưu ý: </span>
          <span>Mỗi lần thi sẽ chọn ngẫu nhiên các câu hỏi khác nhau trong tài liệu ôn tập của </span>

          <span className='text-blue-700 font-bold'>Uni</span>
          <span className='text-red-700 font-bold'> Quiz </span>
          <br />

          <span>
            Đây là đề thi thử <b>THAM KHẢO</b> để bổ sung kiến thức, các bạn nên ôn tập kèm theo các tài liệu khác nhau
            để đạt kết quả tốt nhất.
          </span>
        </span>
      </Typography>
      <Card>
        <CardHeader title={`Kiểm tra: ${title}`} />
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
