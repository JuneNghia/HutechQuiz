import { Box, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import logo from "../../assets/hutech.png";

export const AuthLayout = (props) => {
  const { children } = props;

  return (
    <Box
      component="main"
      style={{ height: "100vh" }}
      sx={{
        display: "flex",
        flex: "1 1 auto",
      }}
    >
      <Grid container sx={{ flex: "1 1 auto" }}>
        <Grid
          xs={12}
          lg={6}
          sx={{
            alignItems: "center",
            background:
              "radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)",
            color: "white",
            display: "flex",
            justifyContent: "center",
            "& img": {
              maxWidth: "100%",
            },
          }}
        >
          <Box
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              align="center"
              color="inherit"
              sx={{
                fontSize: "24px",
                lineHeight: "32px",
                mb: 1,
              }}
              variant="h1"
            >
              Chào mừng bạn đến với{" "}
              <Box
                component="a"
                className="xs:"
                sx={{ color: "#15B79E" }}
                target="_blank"
              >
                Hutech Quiz
              </Box>
            </Typography>
            <Typography
              align="center"
              sx={{ mb: 3 }}
              className="xs:hidden md:block"
              variant="subtitle1"
            >
              Công cụ giúp ôn tập chứng chỉ M1, M3, B1 và hơn thế nữa
            </Typography>
            <img src={logo} alt="logo" className="xl:w-full lg:w-[80%] xs:w-[40%] md:w-[60%] " />
          </Box>
        </Grid>
        <Grid
          xs={12}
          lg={6}
          sx={{
            backgroundColor: "background.paper",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <Box
            component="header"
            sx={{
              left: 0,
              p: 3,
              position: "fixed",
              top: 0,
              width: "100%",
            }}
          >
            <Box
              href="/"
              sx={{
                display: "inline-flex",
                height: 32,
                width: 32,
              }}
            >
              {/* <Logo /> */}
            </Box>
          </Box>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};
