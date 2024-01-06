import { Suspense } from 'react'
import { JWTProvider } from './contexts/JWTContext'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import RouteLoader from './components/Loader/RouteLoader'

function App() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <JWTProvider>
        {/* <div>
          Do số lượng người dùng sử dụng hệ thống quá nhiều nên hệ thống sẽ bảo trì nâng cấp hệ thống sang máy chủ tốt
          hơn để phục vụ nhu cầu của các bạn trong mùa thi. <br />
          Thời gian dự kiến: 15:24 06/1/2024 đến 18:30 06/1/2024
          <br />
          HutechQuiz rất xin lỗi về sự cố này, mong các bạn thông cảm :(
        </div> */}
        <RouterProvider router={router} />
      </JWTProvider>
    </Suspense>
  )
}

export default App
