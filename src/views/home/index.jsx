import {
  Badge,
  Button,
  Card,
  CardContent,
  TextField,
  IconButton,
  CardHeader,
  Chip,
  Typography,
  Grid
} from '@mui/material'
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StepTitle from '../../components/StepTitle'
import { Helmet } from 'react-helmet'
import SearchIcon from '@mui/icons-material/Search'
import BookOutlinedIcon from '@mui/icons-material/BookOutlined'
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined'
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined'
import Swal from 'sweetalert2'
import zaloQrImg from '../../assets/zalo-qr.png'

const listSubject = [
  {
    path: '/module_m1/exam',
    quantity: 30,
    title: 'Module M1',
    time: 30
  },
  {
    path: '/module_m3/exam',
    quantity: 30,
    title: 'Module M3',
    time: 30
  },
  {
    path: '/qpan_1/exam',
    quantity: 60,
    title: 'Quốc Phòng An Ninh 1',
    time: 60
  },
  {
    path: '/qpan_2/exam',
    quantity: 60,
    title: 'Quốc Phòng An Ninh 2',
    time: 60
  },
  {
    path: '/qpan_3/exam',
    quantity: 60,
    title: 'Quốc Phòng An Ninh 3',
    time: 60
  },
  {
    path: '/ktct_mac/exam',
    quantity: 45,
    title: 'Kinh Tế Chính Trị Mác - Lênin',
    time: 45
  },
  {
    path: '/lsvmtg/exam',
    quantity: 45,
    title: 'Lịch Sử Văn Minh Thế Giới',
    time: 45
  },
  {
    path: '/quan_tri_hoc/exam',
    quantity: 45,
    title: 'Quản Trị Học',
    time: 45
  },
  {
    path: '/triet_hoc_mac/exam',
    quantity: 45,
    title: 'Triết học Mac - Lênin',
    time: 45
  },
  {
    path: '/cnxhkh/exam',
    quantity: 45,
    title: 'Chủ Nghĩa Xã Hội Khoa Học',
    time: 45
  },
  {
    path: '/lich_su_dang/exam',
    quantity: 45,
    title: 'Lịch Sử Đảng Cộng Sản Việt Nam',
    time: 45
  },
  {
    path: '/tthcm/exam',
    quantity: 45,
    title: 'Tư Tưởng Hồ Chí Minh',
    time: 45
  },
  {
    path: '/nghiep_vu_ngoai_thuong/exam',
    quantity: 45,
    title: 'Nghiệp Vụ Ngoại Thương',
    time: 45
  },
  {
    path: '/phap_luat_dai_cuong/exam',
    quantity: 45,
    title: 'Pháp Luật Đại Cương',
    time: 45
  },
  {
    path: '/anh_ngu_1/exam',
    quantity: 45,
    title: 'Anh Ngữ 1 ( Ngữ pháp - Đọc hiểu )',
    time: 45
  },
  {
    path: '/anh_ngu_2/exam',
    quantity: 60,
    title: 'Anh Ngữ 2 ( Ngữ Pháp )',
    time: 60
  },
  {
    path: '/tieng_anh_6/exam',
    quantity: 60,
    title: 'Tiếng Anh 6',
    time: 60
  },

  {
    path: '/tieng_anh_1_sach_3a/exam',
    quantity: 60,
    title: 'Tiếng Anh 1 - Sách 3A ( Ngữ Pháp )',
    time: 60
  },
  {
    path: '/tieng_anh_2_sach_3b/exam',
    quantity: 60,
    title: 'Tiếng Anh 2 - Sách 3B ( Ngữ Pháp )',
    time: 60
  },
  {
    path: '/tieng_anh_3_sach_3a/exam',
    quantity: 60,
    title: 'Tiếng Anh 3 - Sách 3A ( Ngữ Pháp )',
    time: 60
  },
  {
    path: '/tieng_anh_4_sach_3b/exam',
    quantity: 60,
    title: 'Tiếng Anh 4 - Sách 3B ( Ngữ Pháp )',
    time: 60
  },
  {
    path: '/csvhvn/exam',
    quantity: 45,
    title: 'Cơ Sở Văn Hoá Việt Nam',
    time: 45
  },
  {
    path: '/marketing_can_ban/exam',
    quantity: 60,
    title: 'Marketing Căn Bản',
    time: 60
  },
  {
    path: '/am_vi_hoc/exam',
    quantity: 20,
    title: 'Âm Vị Học',
    time: 40
  },
  {
    path: '/nhap_mon_ngon_ngu_han/exam',
    quantity: 20,
    title: 'Nhập Môn Ngôn Ngữ Hàn',
    time: 40
  },
  {
    path: '/kt_vi_mo/exam',
    quantity: 40,
    title: 'Kinh tế vi mô',
    time: 40
  },
  {
    path: '/kt_vi~_mo/exam',
    quantity: 45,
    title: 'Kinh tế vĩ mô',
    time: 45
  },
  {
    path: '/quan_tri_chien_luoc/exam',
    quantity: 45,
    title: 'Quản trị chiến lược',
    time: 45
  },
  {
    path: '/qtkd_quoc_te/exam',
    quantity: 45,
    title: 'Quản trị kinh doanh quốc tế',
    time: 45
  },
  {
    path: '/lap_trinh_huong_doi_tuong/exam',
    quantity: 60,
    title: 'Lập trình hướng đối tượng',
    time: 60
  },
  {
    path: '/dai_so_tuyen_tinh/exam',
    quantity: 60,
    title: 'Đại số tuyến tính',
    time: 60
  },
  {
    path: '/giai_tich/exam',
    quantity: 45,
    title: 'Giải tích',
    time: 45
  },
  {
    path: '/thanh_toan_quoc_te/exam',
    quantity: 45,
    title: 'Thanh toán quốc tế',
    time: 45
  },
  {
    path: '/nguyen_ly_thong_ke_kinh_te/exam',
    quantity: 60,
    title: 'Nguyên lý thống kê kinh tế',
    time: 60
  },
  {
    path: '/van_hoa_xa_hoi_han_quoc/exam',
    quantity: 25,
    title: 'Văn hoá - xã hội Hàn Quốc',
    time: 50
  }
]

const textFieldStyle = {
  '& .MuiInputBase-root': {
    '& input': {
      padding: 0
    }
  }
}

const Home = () => {
  const [searchKeyword, setSearchKeyword] = useState('')
  const navigate = useNavigate()

  const filteredData = listSubject.filter((subject) =>
    subject.title.toLowerCase().includes(searchKeyword.toLowerCase())
  )

  const handleShowSupportInfo = useCallback(() => {
    Swal.fire({
      html: `<div class='flex items-center flex-col justify-center'>
      <h5 class='mb-4'>Mở ứng dụng Zalo và quét mã dưới đây</h5><img src='${zaloQrImg}' width='200'></div>`,
      confirmButtonText: 'Xong'
    })
  }, [])

  return (
    <>
      <Helmet>
        <title>Trang Chủ</title>
      </Helmet>
      <StepTitle title='Trang chủ' />

      <div className='!bg-yellow-300 !mb-5 rounded-md p-2'>
        <span className=''>
          <span className='font-bold flex items-center gap-x-4'>
            Cần hỗ trợ ?
            <Button variant='contained' color='error' size='small' onClick={handleShowSupportInfo}>
              Nhấn vào đây
            </Button>
          </span>
        </span>
      </div>

      <TextField
        className='w-full bg-white !mb-5'
        placeholder='Tìm kiếm theo tên môn học / chứng chỉ Module'
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

      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {filteredData.length === 0 ? (
          <span className='ml-7 mt-4 font-bold text-[1.2rem]'>Không tìm thấy môn học</span>
        ) : (
          filteredData.map((subject, index) => (
            <Grid key={index} item md={4} xs={6} className='md:h-[160px] xs:min-h-[200px]'>
              <Card
                onClick={() => navigate(subject.path)}
                className=' border border-slate-400 h-full hover:bg-blue-500 hover:text-white hover:cursor-pointer'
              >
                <CardContent className='flex justify-center flex-col !pt-[25px] md:!pb-[20px]'>
                  <p className='mb-4 flex items-center font-medium md:text-[1.2rem]'>
                    <BookOutlinedIcon className='!w-[20px] !h-[20px] mr-2' />
                    <span className=''>{subject.title}</span>
                  </p>
                  <p className='mb-4 flex items-center'>
                    <NumbersOutlinedIcon className='!w-[20px] !h-[20px] mr-2' /> {subject.quantity} câu hỏi
                  </p>
                  <p className='flex items-center'>
                    <AccessAlarmOutlinedIcon className='!w-[20px] !h-[20px] mr-2' /> {subject.time} phút
                  </p>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* <Carousel showThumbs={false} showStatus={false} className='w-full flex justify-center' width={800}>
        <div>
          <img src={slide1} />
        </div>
      </Carousel> */}
    </>
  )
}

export default Home
