// import { Suspense } from "react";
// import { Outlet } from "react-router-dom";
// import { CssBaseline, ThemeProvider } from "@mui/material";

// import Topbar from "../../components/Layout/TopBar";
// import { ColorModeContext, useMode } from "../../components/Layout/theme";
// import Sidebar from "../../components/Layout/SideBar";
// import RouteLoader from "../../components/Loader/RouteLoader";
// import BG from "../../assets/images/backgroundavif.avif";

// const MainLayout = () => {
//   const [theme, colorMode] = useMode();
//   return (
//     <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <div className="flex relative w-screen">
//           <div
//             className="fixed inset-0 z-0"
//             style={{
//               backgroundImage: `url(${BG})`,
//               backgroundRepeat: "no-repeat",
//               backgroundSize: "cover",
//             }}
//           ></div>
//           <Sidebar />
//           <main className="h-full w-full z-10 pt-16 flex-1 min-w-0">
//             <Topbar />
//             <Suspense fallback={<RouteLoader height="80vh" />}>
//               <Outlet />
//             </Suspense>
//           </main>
//         </div>
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// };

// export default MainLayout;
