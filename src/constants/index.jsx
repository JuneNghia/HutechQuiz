import CircleWithText from '../components/Icon/CircleWithText'
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined'

export const BASE_URL = '/dashboard'
export const BASE_URL_SERVICE = 'https://hutechquiz-api-64604df21b2f.herokuapp.com/api/v1'

// https://hutechquiz-api-64604df21b2f.herokuapp.com/api/v1
// http://localhost:8080/api/v1

export const MenuSideBar = [
  {
    title: 'Trang chủ',
    to: '/',
    icon: <HomeOutlinedIcon />,
    index: 0,
    subMenu: []
  },
  {
    title: 'Module M1',
    to: '/module-m1',
    icon: <CircleWithText text='M1' />,
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
        title: 'Kiểm tra',
        to: '/module-m1/exam',
        index: 14,
        icon: <EmojiEventsOutlinedIcon />
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
    to: '/qpan_1',
    icon: <CircleWithText text='QP' />,
    index: 2,
    subMenu: [
      {
        title: 'QPAN 1',
        to: '/qpan_1/exam',
        icon: <CircleWithText text='1' />,
        index: 21,
      },
      {
        title: 'QPAN 2',
        to: '/qpan_2/exam',
        icon: <CircleWithText text='2' />,
        index: 22,
      }
    ]
  },
  {
    title: 'Tài liệu ôn tập',
    to: '/document',
    icon: <LocalLibraryOutlinedIcon />,
    index: 3,
    subMenu: []
  }
]
