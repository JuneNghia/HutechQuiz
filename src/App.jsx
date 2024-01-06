import { Suspense } from 'react'
import { JWTProvider } from './contexts/JWTContext'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import RouteLoader from './components/Loader/RouteLoader'

function App() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <JWTProvider>
        <div className='m-3'>
          Do số lượng người dùng sử dụng hệ thống quá nhiều nên hệ thống sẽ bảo trì nâng cấp hệ thống sang máy chủ tốt
          hơn để phục vụ nhu cầu của các bạn trong mùa thi. <br />
          Thời gian dự kiến: 20:00 06/1/2024 đến 02:00 07/1/2024, có thể sớm hơn dự kiến
          <br/>
          Sau khi hoàn tất bảo trì, HutechQuiz sẽ thông báo trên nhóm <a className='text-blue-700 underline' href='https://www.facebook.com/groups/679595774098227'>tại đây</a>
          <br />
          HutechQuiz rất xin lỗi về sự cố này, mong các bạn thông cảm :(
        </div>
        {/* <RouterProvider router={router} /> */}
      </JWTProvider>
    </Suspense>
  )
}

export default App
