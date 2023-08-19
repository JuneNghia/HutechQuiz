import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import AccountMenu from "../../AccountMenu";

const Topbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Box
      sx={{
        boxShadow: `${
          scrolled
            ? "rgba(80, 80, 80, 0.2) 0px 1px 8px 0px, rgba(80, 80, 80, 0.14) 0px 3px 4px 0px, rgba(80, 80, 80, 0.12) 0px 3px 3px -2px"
            : ""
        }`,
        backgroundColor: 'mediumblue',
        backgroundImage: `${scrolled ? `url(${BG})` : ""}`,
        position: "fixed",
        zIndex: "99",
        top: 0,
        height: "75px",
        transitionDuration: "300ms",
        width: "-webkit-fill-available",
      }}
      display="flex"
      justifyContent="end"
      alignItems="center"
      p={2}
    >
      {/* ICONS */}
      <Box>
        {/* <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton> */}
        <AccountMenu />
      </Box>
    </Box>
  );
};

export default Topbar;
