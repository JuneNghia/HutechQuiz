import { Box, Button, Container, Typography } from "@mui/material";
import img404 from "../../assets/errors/error-404.png";
import { HiArrowSmLeft } from "react-icons/hi";

const Error = () => (
  <>
    <Box
      className=""
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              mb: 3,
              textAlign: "center",
            }}
          >
            <img
              alt="Under development"
              src={img404}
              style={{
                display: "inline-block",
                maxWidth: "100%",
                width: 400,
              }}
            />
          </Box>
          <Typography align="center" sx={{ mb: 3 }} variant="h3">
            404: KHÔNG TÌM THẤY TRANG
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary">
            Trang bạn đang cố gắng truy cập không tồn tại hoặc đã được chuyển
            sang trang mới vĩnh viễn
          </Typography>
          <Button
            href="/"
            startIcon={<HiArrowSmLeft />}
            sx={{ mt: 3 }}
            variant="contained"
          >
            Trở về trang chủ
          </Button>
        </Box>
      </Container>
    </Box>
  </>
);

export default Error;
