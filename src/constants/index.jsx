import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ReadMoreOutlinedIcon from "@mui/icons-material/ReadMoreOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CircleWithText from "../components/Icon/CircleWithText";

export const BASE_URL = "/dashboard";
export const BASE_URL_SERVICE = "https://bsc-system.bytesinsights.dev/v1/";

export const MenuSideBar = [
  {
    title: "Module M1",
    to: "/module-m1",
    icon: <CircleWithText text="M1" />,
    subMenu: [
      {
        title: "Word",
        to: "/module-m1/word",
        index: 11,
        icon: <HomeOutlinedIcon />,
      },
      {
        title: "Powerpoint",
        to: "/module-m1/powerpoint",
        index: 12,
        icon: <HomeOutlinedIcon />,
      },
      {
        title: "Excel",
        to: "/module-m1/excel",
        index: 13,
        icon: <HomeOutlinedIcon />,
      },
    ],
    index: 1,
  },
  {
    title: "Module M3",
    to: "/module-m3",
    icon: <CircleWithText text="M3" />,
    subMenu: [
      {
        title: "Word",
        to: "/module-m3/word",
        index: 21,
        icon: <HomeOutlinedIcon />,
      },
      {
        title: "Powerpoint",
        to: "/module-m3/powerpoint",
        index: 22,
        icon: <HomeOutlinedIcon />,
      },
      {
        title: "Excel",
        to: "/module-m3/excel",
        index: 23,
        icon: <HomeOutlinedIcon />,
      },
    ],
    index: 2,
  },
  {
    title: "B1 Tiếng Anh",
    to: "/b1/english",
    icon: <CircleWithText text="B1" />,
    subMenu: [
        {
          title: "200 câu trắc nghiệm",
          to: "/module-m3/word",
          index: 31,
          icon: <HomeOutlinedIcon />,
        },
        {
          title: "40 câu hình",
          to: "/module-m3/powerpoint",
          index: 32,
          icon: <HomeOutlinedIcon />,
        },
        {
          title: "Đọc - Hiểu",
          to: "/module-m3/excel",
          index: 33,
          icon: <HomeOutlinedIcon />,
        },
        {
          title: "Nghe",
          to: "/module-m3/excel",
          index: 34,
          icon: <HomeOutlinedIcon />,
        },
      ],
    index: 3,
  },
  {
    title: "B1 Tiếng Hàn",
    to: "/b1/korea",
    icon: <CircleWithText text="B1" />,
    index: 4,
  },
  
];
