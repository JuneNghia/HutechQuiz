import { Box, Card, CardContent, CardHeader, Chip, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import data from './data.json'
import SearchIcon from '@mui/icons-material/Search'
import Swal from 'sweetalert2'
import StepTitle from '../../components/StepTitle'

const textFieldStyle = {
  '& .MuiInputBase-root': {
    '& input': {
      padding: 0
    }
  }
}

const Document = () => {
  const [searchKeyword, setSearchKeyword] = useState('')

  const showAlert = (subject) => {
    Swal.fire({
      icon: 'info',
      html: `Liên hệ các Admin sau để mua tài liệu môn <br/><b class='text-blue-500'>${subject}</b><br/> <div class='mt-2'><b>Admin 1 : 0934 945 803 ( Zalo )</b><br/> <b>Admin 2 : 0335 585 970 ( Zalo )</b><br/>  <b>Admin 3 : 0967 319 312 ( Zalo )</b><br/></div>`
    })
  }

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

      <StepTitle title='Tài liệu ôn tập Hutech' />

      <TextField
        className='w-full bg-white !mb-3'
        placeholder='Nhập từ khoá để tìm kiếm ( VD: Đại cương hoặc Quốc phòng an ninh )'
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
                onClick={() => showAlert(subject)}
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
