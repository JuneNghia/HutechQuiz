import CircleWithText from '../components/Icon/CircleWithText'
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'

export const BASE_URL = '/dashboard'
export const BASE_URL_SERVICE = 'https://api.uniquiz.online/api/v1'

// http://localhost:8080/api/v1

export const MenuSideBar = [
  {
    title: 'Trang Chủ',
    to: '/',
    icon: <HomeOutlinedIcon />,
    index: 0,
    subMenu: []
  },
  {
    title: 'Ví tiền',
    to: '/wallet',
    icon: <AccountBalanceWalletOutlinedIcon />,
    index: 7,
    subMenu: []
  },
  {
    title: 'Chứng Chỉ',
    to: '',
    icon: <CircleWithText text='CC' />,
    subMenu: [
      // {
      //   title: "Word",
      //   to: "/module-m1/word",
      //   index: 11,
      //   icon: <HomeOutlinedIcon />,
      // },
      // {
      //   title: "Powerpoint",
      //   to: "/module-m1/powerpoint",
      //   index: 12,
      //   icon: <HomeOutlinedIcon />,
      // },
      // {
      //   title: "Excel",
      //   to: "/module-m1/excel",
      //   index: 13,
      //   icon: <HomeOutlinedIcon />,
      // },
      {
        title: 'Module M1',
        to: '/module_m1/exam',
        icon: <CircleWithText text='M1' />
      },
      {
        title: 'Module M3',
        to: '/module_m3/exam',
        icon: <CircleWithText text='M3' />
      }
    ],
    index: 1
  },
  // {
  //   title: "Module M3",
  //   to: "/module-m3",
  //   icon: <CircleWithText text="M3" />,
  //   subMenu: [
  //     {
  //       title: "Word",
  //       to: "/module-m3/word",
  //       index: 21,
  //       icon: <HomeOutlinedIcon />,
  //     },
  //     {
  //       title: "Powerpoint",
  //       to: "/module-m3/powerpoint",
  //       index: 22,
  //       icon: <HomeOutlinedIcon />,
  //     },
  //     {
  //       title: "Excel",
  //       to: "/module-m3/excel",
  //       index: 23,
  //       icon: <HomeOutlinedIcon />,
  //     },
  //   ],
  //   index: 2,
  // },
  // {
  //   title: "B1 Tiếng Anh",
  //   to: "/b1/english",
  //   icon: <CircleWithText text="B1" />,
  //   subMenu: [
  //       {
  //         title: "200 câu trắc nghiệm",
  //         to: "/module-m3/word",
  //         index: 31,
  //         icon: <HomeOutlinedIcon />,
  //       },
  //       {
  //         title: "40 câu hình",
  //         to: "/module-m3/powerpoint",
  //         index: 32,
  //         icon: <HomeOutlinedIcon />,
  //       },
  //       {
  //         title: "Đọc - Hiểu",
  //         to: "/module-m3/excel",
  //         index: 33,
  //         icon: <HomeOutlinedIcon />,
  //       },
  //       {
  //         title: "Nghe",
  //         to: "/module-m3/excel",
  //         index: 34,
  //         icon: <HomeOutlinedIcon />,
  //       },
  //     ],
  //   index: 3,
  // },
  {
    title: 'QPAN',
    to: '',
    icon: <CircleWithText text='QP' />,
    index: 2,
    subMenu: [
      {
        title: 'QPAN 1',
        to: '/qpan_1/exam',
        icon: <CircleWithText text='1' />
      },
      {
        title: 'QPAN 2',
        to: '/qpan_2/exam',
        icon: <CircleWithText text='2' />
      },
      {
        title: 'QPAN 3',
        to: '/qpan_3/exam',
        icon: <CircleWithText text='3' />
      }
    ]
  },
  {
    title: 'Đại Cương',
    to: '',
    icon: <CircleWithText text='ĐC' />,
    index: 3,
    subMenu: [
      {
        title: 'Triết Học Mac',
        to: '/triet_hoc_mac/exam',
        icon: <CircleWithText text='1' />
      },
      {
        title: 'Kinh Tế Chính Trị Mac - Lênin',
        to: '/ktct_mac/exam',
        icon: <CircleWithText text='2' />
      },
      {
        title: 'Lịch Sử Văn Minh Thế Giới',
        to: '/lsvmtg/exam',
        icon: <CircleWithText text='3' />
      },
      {
        title: 'Quản Trị Học',
        to: '/quan_tri_hoc/exam',
        icon: <CircleWithText text='4' />
      },
      {
        title: 'Chủ Nghĩa Xã Hội Khoa Học',
        to: '/cnxhkh/exam',
        icon: <CircleWithText text='5' />
      },
      {
        title: 'Lịch Sử Đảng Cộng Sản Việt Nam',
        to: '/lich_su_dang/exam',
        icon: <CircleWithText text='6' />
      },
      {
        title: 'Tư Tưởng Hồ Chí Minh',
        to: '/tthcm/exam',
        icon: <CircleWithText text='7' />
      },
      {
        title: 'Cơ Sở Văn Hoá Việt Nam',
        to: '/csvhvn/exam',
        icon: <CircleWithText text='8' />
      },
      {
        title: 'Pháp Luật Đại Cương',
        to: '/phap_luat_dai_cuong/exam',
        icon: <CircleWithText text='9' />
      }
    ]
  },
  {
    title: 'Anh Ngữ / Tiếng Anh',
    to: '',
    icon: <CircleWithText text='TA' />,
    index: 5,
    subMenu: [
      {
        title: 'Anh Ngữ 1',
        to: '/anh_ngu_1/exam',
        icon: <CircleWithText text='A1' />
      },
      {
        title: 'Anh Ngữ 2',
        to: '/anh_ngu_2/exam',
        icon: <CircleWithText text='A2' />
      },
      {
        title: 'Tiếng Anh 1 (Sách 3A)',
        to: '/tieng_anh_1_sach_3a/exam',
        icon: <CircleWithText text='T1' />
      },
      {
        title: 'Tiếng Anh 2 (Sách 3B)',
        to: '/tieng_anh_2_sach_3b/exam',
        icon: <CircleWithText text='T2' />
      },
      {
        title: 'Tiếng Anh 3 (Sách 3A)',
        to: '/tieng_anh_3_sach_3a/exam',
        icon: <CircleWithText text='T3' />
      },
      {
        title: 'Tiếng Anh 4 (Sách 3B)',
        to: '/tieng_anh_4_sach_3b/exam',
        icon: <CircleWithText text='T4' />
      },
     
      {
        title: 'Tiếng Anh 6',
        to: '/tieng_anh_6/exam',
        icon: <CircleWithText text='T6' />
      },
    ]
  },
  {
    title: 'Ngôn Ngữ Hàn',
    to: '',
    icon: <CircleWithText text='HQ' />,
    index: 6,
    subMenu: [
      {
        title: 'Nhập môn ngôn ngữ Hàn',
        to: '/nhap_mon_ngon_ngu_han/exam',
        icon: <CircleWithText text='1' />
      },
      {
        title: 'Âm Vị Học',
        to: '/am_vi_hoc/exam',
        icon: <CircleWithText text='2' />
      },
    ]
  },
  {
    title: 'Công Nghệ Thông Tin',
    to: '',
    icon: <CircleWithText text='IT' />,
    index: 7,
    subMenu: [
      {
        title: 'LTHĐT',
        to: '/lap_trinh_huong_doi_tuong/exam',
        icon: <CircleWithText text='1' />
      }
    ]
  },
  {
    title: 'Quản Trị Kinh Doanh',
    to: '',
    icon: <CircleWithText text='KD' />,
    index: 8,
    subMenu: [
      {
        title: 'Marketing Căn Bản',
        to: '/marketing_can_ban/exam',
        icon: <CircleWithText text='1' />
      },
      {
        title: 'Nghiệp Vụ Ngoại Thương',
        to: '/nghiep_vu_ngoai_thuong/exam',
        icon: <CircleWithText text='2' />
      },
      {
        title: 'Quản trị chiến lược',
        to: '/quan_tri_chien_luoc/exam',
        icon: <CircleWithText text='3' />
      },
      {
        title: 'QTKD quốc tế',
        to: '/qtkd_quoc_te/exam',
        icon: <CircleWithText text='4' />
      },
      {
        title: 'Thanh toán quốc tế',
        to: '/thanh_toan_quoc_te/exam',
        icon: <CircleWithText text='5' />
      },
    ]
  },
  {
    title: 'Các môn Kinh tế',
    to: '',
    icon: <CircleWithText text='KT' />,
    index: 9,
    subMenu: [
      {
        title: 'Kinh tế vi mô',
        to: '/kt_vi_mo/exam',
        icon: <CircleWithText text='1' />
      },
      {
        title: 'Kinh tế vĩ mô',
        to: '/kt_vi~_mo/exam',
        icon: <CircleWithText text='2' />
      },
      {
        title: 'Nguyên lý thống kê kinh tế',
        to: '/nguyen_ly_thong_ke_kinh_te/exam',
        icon: <CircleWithText text='3' />
      },
    ]
  },
  {
    title: 'Các môn Đại Số',
    to: '',
    icon: <CircleWithText text='ĐS' />,
    index: 10,
    subMenu: [
      {
        title: 'Giải tích',
        to: '/giai_tich/exam',
        icon: <CircleWithText text='1' />
      },
      {
        title: 'Đại số tuyến tính',
        to: '/dai_so_tuyen_tinh/exam',
        icon: <CircleWithText text='2' />
      },
    ]
  },

  {
    title: 'Tài liệu ôn tập',
    to: '/document',
    icon: <LocalLibraryOutlinedIcon />,
    index: 999,
    subMenu: []
  },
  {
    title: 'Chia sẻ tài liệu',
    to: 'https://www.facebook.com/groups/679595774098227',
    icon: <ShareOutlinedIcon />,
    index: 1000,
    newBlank: true,
    subMenu: []
  }
]
