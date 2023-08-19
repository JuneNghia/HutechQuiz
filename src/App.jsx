import { Suspense } from "react";
import { JWTProvider } from "./contexts/JWTContext";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import RouteLoader from "./components/Loader/RouteLoader";

function App() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <JWTProvider>
        <RouterProvider router={router} />
      </JWTProvider>
    </Suspense>
  );
}

export default App;
