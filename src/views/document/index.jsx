import { Box, Card, CardContent, CardHeader, Chip, IconButton, TextField, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { Helmet } from 'react-helmet'
import data from './data.json'
import SearchIcon from '@mui/icons-material/Search'
import Swal from 'sweetalert2'
import StepTitle from '../../components/StepTitle'
import zaloQrImg from '../../assets/zalo-qr.png'

const textFieldStyle = {
  '& .MuiInputBase-root': {
    '& input': {
      padding: 0
    }
  }
}

const Document = () => {
  const [searchKeyword, setSearchKeyword] = useState('')

  const handleShowSupportInfo = useCallback((subject) => {
    Swal.fire({
      html: `<div class='flex items-center flex-col justify-center'>
      <h5 class='mb-4'>Mở ứng dụng Zalo và quét mã dưới đây hoặc liên hệ <br/><span class='font-bold text-red-700'>Zalo: 0335.585.970 - 0967.319.312</span><br/> để mua tài liệu ôn tập môn <span class='text-blue-500 font-bold'>${subject}</span></h5><img src='${zaloQrImg}' width='200'></div>`,
      confirmButtonText: 'Xong'
    })
  }, [])

  const filteredData = data.filter((document) => {
    if (
      document.category.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      document.subject.some((subject) => subject.toLowerCase().includes(searchKeyword.toLowerCase()))
    ) {
      return true
    }
    return false
  })

  return (
    <>
      <Helmet>
        <title>Tài liệu ôn tập</title>
      </Helmet>

      <StepTitle title='Tài liệu ôn tập' />

      <TextField
        className='w-full bg-white !mb-3'
        placeholder='Nhập lĩnh vực hoặc tên môn học'
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
        sx={textFieldStyle}
        onChange={(event) => setSearchKeyword(event.target.value)}
      />

      {filteredData.map((document) => (
        <Card className='mb-4'>
          <CardHeader title={document.category} />
          <CardContent className='mt-2'>
            {document.subject.map((subject) => (
              <Chip
                label={subject}
                color='success'
                size='medium'
                className='!mr-2 !mb-2'
                onClick={() => handleShowSupportInfo(subject)}
              />
            ))}
          </CardContent>
        </Card>
      ))}

      {filteredData.length === 0 && <div>Không có dữ liệu</div>}
    </>
  )
}

export default Document
