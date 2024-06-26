import React, { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import AuthGuard from './components/Auth/AuthGuard'
import MainLayout from './layouts/MainLayout'

const LoginPage = lazy(() => import('./views/auth/Login'))
const HomePage = lazy(() => import('./views/home'))
const RegisterPage = lazy(() => import('./views/auth/Register'))
const ErrorPage = lazy(() => import('./views/errors'))
const PracticeTestPage = lazy(() => import('./views/practicetest'))
const PaymentPage = lazy(() => import('./views/payment'))
const WalletPage = lazy(() => import('./views/wallet'))
const UserManagementPage = lazy(() => import('./views/admin/usermanagement'))
const UserDepositPage = lazy(() => import('./views/admin/userdeposit'))
const DocumentPage = lazy(() => import('./views/document'))
const AddQuestionPage = lazy(() => import('./views/admin/addquestion'))
const AddSubjectPage = lazy(() => import('./views/admin/addsubject'))
const QuestionManagePage = lazy(() => import('./views/admin/questionmanagement'))

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        exact: true,
        path: '/document',
        element: <DocumentPage />
      },
      {
        exact: true,
        path: '/payment',
        element: <PaymentPage />
      },
      {
        exact: true,
        path: '/wallet',
        element: <WalletPage />
      },
      {
        exact: true,
        path: '/user-management',
        element: <UserManagementPage />
      },
      {
        exact: true,
        path: '/user-deposit',
        element: <UserDepositPage />
      },
      {
        exact: true,
        path: '/add-question',
        element: <AddQuestionPage />
      },
      {
        exact: true,
        path: '/add-subject',
        element: <AddSubjectPage />
      },
      {
        exact: true,
        path: '/question-management',
        element: <QuestionManagePage />
      },
      {
        path: '/module_m1/exam',
        element: (
          <PracticeTestPage
            quantity={30}
            subTitle='Module M1'
            title='Module M1'
            id='37901f73-7c4f-4cad-8074-1c2b4e99191d'
            time={30 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/module_m3/exam',
        element: (
          <PracticeTestPage
            quantity={30}
            subTitle='Module M3'
            title='Module M3'
            id='5e340da3-96a7-4eb5-ab39-694c120d99b3'
            time={30 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/qpan_1/exam',
        element: (
          <PracticeTestPage
            quantity={60}
            title='Quốc Phòng An Ninh 1'
            subTitle='QPAN 1'
            id='15d57bbc-fb32-4c06-b0d8-1de3c4e8fd4b'
            time={60 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/qpan_2/exam',
        element: (
          <PracticeTestPage
            quantity={60}
            title='Quốc Phòng An Ninh 2'
            subTitle='QPAN 2'
            id='6f1894e2-8888-4358-b8cc-14a80ee8782b'
            time={60 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/qpan_3/exam',
        element: (
          <PracticeTestPage
            quantity={60}
            title='Quốc Phòng An Ninh 3'
            subTitle='QPAN 2'
            id='da9c5fae-1fe4-42fd-bfff-fad456ef4d08'
            time={60 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/ktct_mac/exam',
        element: (
          <PracticeTestPage
            quantity={45}
            title='Kinh Tế Chính Trị Mác - Lênin'
            subTitle='KTCT MAC'
            id='bf304142-23ef-4d62-9575-fecf97723e16'
            time={45 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/thanh_toan_quoc_te/exam',
        element: (
          <PracticeTestPage
            quantity={45}
            title='Thanh Toán Quốc Tế'
            subTitle='Thanh Toán Quốc Tế'
            id='5fdd563a-72ee-4be2-9f28-0ee01c57ea6d'
            time={45 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/giai_tich/exam',
        element: (
          <PracticeTestPage
            quantity={45}
            title='Giải Tích'
            subTitle='Giải Tích'
            id='55d35639-42a4-40d6-b28d-f82d1c4ef393'
            time={45 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/dai_so_tuyen_tinh/exam',
        element: (
          <PracticeTestPage
            quantity={60}
            title='Đại Số Tuyến Tính'
            subTitle='Đại Số Tuyến Tính'
            id='650eeeaf-bbc6-4ec0-8a7f-6cdb600da37f'
            time={60 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/thanh_toan_quoc_te/exam',
        element: (
          <PracticeTestPage
            quantity={45}
            title='Thanh Toán Quốc Tế'
            subTitle='Thanh Toán Quốc Tế'
            id='5fdd563a-72ee-4be2-9f28-0ee01c57ea6d'
            time={45 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/lsvmtg/exam',
        element: (
          <PracticeTestPage
            quantity={45}
            title='Lịch Sử Văn Minh Thế Giới'
            subTitle='LSVMTG'
            id='d7116012-04b5-47b8-9e6d-8f9d9d48eff0'
            time={45 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/quan_tri_hoc/exam',
        element: (
          <PracticeTestPage
            quantity={45}
            title='Quản Trị Học'
            subTitle='Quản Trị Học'
            id='69990dfd-aa32-4843-aced-ef181ba4917a'
            time={45 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/triet_hoc_mac/exam',
        element: (
          <PracticeTestPage
            quantity={45}
            title='Triết học Mac - Lênin'
            subTitle='Triết học Mac'
            id='7f373105-05a6-4fe2-934a-7c00d2f491c1'
            time={45 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/cnxhkh/exam',
        element: (
          <PracticeTestPage
            quantity={45}
            title='Chủ Nghĩa Xã Hội Khoa Học'
            subTitle='CNXHKH'
            id='2e80c4da-0392-4236-966c-f7c17903fcf7'
            time={45 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/lich_su_dang/exam',
        element: (
          <PracticeTestPage
            quantity={45}
            title='Lịch Sử Đảng Cộng Sản Việt Nam'
            subTitle='Lịch Sử Đảng'
            id='20a375f8-9c79-4183-b328-e77ae7b3b121'
            time={45 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/tthcm/exam',
        element: (
          <PracticeTestPage
            quantity={45}
            title='Tư Tưởng Hồ Chí Minh'
            subTitle='TTHCM'
            id='787d3fe7-292c-4e32-a5e0-c84f1d575772'
            time={45 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/nghiep_vu_ngoai_thuong/exam',
        element: (
          <PracticeTestPage
            quantity={45}
            title='Nghiệp Vụ Ngoại Thương'
            subTitle='Nghiệp Vụ Ngoại Thương'
            id='8ff808ca-eb1f-439e-8d9c-1b6d3dfe6feb'
            time={45 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/phap_luat_dai_cuong/exam',
        element: (
          <PracticeTestPage
            quantity={45}
            title='Pháp Luật Đại Cương'
            subTitle='Pháp Luật Đại Cương'
            id='13d49f2c-9ace-492a-b8a1-4eecc8f826ac'
            time={45 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/anh_ngu_1/exam',
        element: (
          <PracticeTestPage
            quantity={45}
            title='Anh Ngữ 1 ( Ngữ pháp - Đọc hiểu )'
            subTitle='Anh Ngữ 1'
            id='10ee56df-1a4b-49eb-b843-4f0211a14ce9'
            time={45 * 60}
          />
        ),
        exact: true
      },
      // {
      //   path: '/anh_ngu_2/exam',
      //   element: (
      //     <PracticeTestPage
      //       quantity={60}
      //       title='Anh Ngữ 2 ( Ngữ Pháp )'
      //       subTitle='AN2 - NGỮ PHÁP'
      //       id='38919d62-bc66-4e28-bbda-e1e1ecca6f6d'
      //       time={60 * 60}
      //     />
      //   ),
      //   exact: true
      // },
      {
        path: '/tieng_anh_1_sach_3a/exam',
        element: (
          <PracticeTestPage
            quantity={60}
            title='Tiếng Anh 1 - Sách 3A ( Ngữ Pháp )'
            subTitle='TA1 - 3A - NGỮ PHÁP'
            id='208addd4-2b66-4724-a40d-163b94e79c9a'
            time={60 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/tieng_anh_2_sach_3b/exam',
        element: (
          <PracticeTestPage
            quantity={60}
            title='Tiếng Anh 2 - Sách 3B ( Ngữ Pháp )'
            subTitle='TA2 - 3B - NGỮ PHÁP'
            id='ccafe41c-3802-4a7c-9a13-aa8f63e29382'
            time={60 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/tieng_anh_3_sach_3a/exam',
        element: (
          <PracticeTestPage
            quantity={60}
            title='Tiếng Anh 3 - Sách 3A ( Ngữ Pháp )'
            subTitle='TA3 - 3A - NGỮ PHÁP'
            id='208addd4-2b66-4724-a40d-163b94e79c9a'
            time={60 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/tieng_anh_4_sach_3b/exam',
        element: (
          <PracticeTestPage
            quantity={60}
            title='Tiếng Anh 4 - Sách 3B ( Ngữ Pháp )'
            subTitle='TA4 - 3B - NGỮ PHÁP'
            id='ccafe41c-3802-4a7c-9a13-aa8f63e29382'
            time={60 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/csvhvn/exam',
        element: (
          <PracticeTestPage
            quantity={45}
            title='Cơ Sở Văn Hoá Việt Nam'
            subTitle='CSVHVN'
            id='209d2bce-ddb8-49e1-b506-1214e9538b42'
            time={45 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/marketing_can_ban/exam',
        element: (
          <PracticeTestPage
            quantity={60}
            title='Marketing Căn Bản'
            subTitle='MCB'
            id='35d6819c-bf6e-4fef-ba6c-8af92a9af596'
            time={60 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/am_vi_hoc/exam',
        element: (
          <PracticeTestPage
            quantity={20}
            title='Âm Vị Học'
            subTitle='Âm Vị Học'
            id='e882633c-e429-4ff2-8aa2-89fdc3236881'
            time={40 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/kt_vi_mo/exam',
        element: (
          <PracticeTestPage
            quantity={40}
            title='Kinh tế vi mô'
            subTitle='KT Vi Mô'
            id='8801ec8a-0bfe-45c9-9b00-d8beeba43097'
            time={40 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/kt_vi~_mo/exam',
        element: (
          <PracticeTestPage
            quantity={45}
            title='Kinh tế vĩ mô'
            subTitle='KT Vĩ Mô'
            id='4cc47d99-c88b-48c4-8a9f-92e4c08ef9f9'
            time={45 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/quan_tri_chien_luoc/exam',
        element: (
          <PracticeTestPage
            quantity={45}
            title='Quản trị chiến lược'
            subTitle='Quản trị chiến lược'
            id='3ef2749f-cefd-4aa0-8a4c-9a31022e5e12'
            time={45 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/tieng_anh_6/exam',
        element: (
          <PracticeTestPage
            quantity={60}
            title='Tiếng Anh 6'
            subTitle='Tiếng Anh 6'
            id='cb6477bf-edc8-4602-9530-5759d9ffa5e8'
            time={60 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/qtkd_quoc_te/exam',
        element: (
          <PracticeTestPage
            quantity={45}
            title='Quản trị kinh doanh quốc tế'
            subTitle='QTKD Quốc Tế'
            id='17f7eea3-8e1d-45fa-84f0-c786178cf435'
            time={45 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/anh_ngu_2/exam',
        element: (
          <PracticeTestPage
            quantity={60}
            title='Anh Ngữ 2'
            subTitle='Anh Ngữ 2'
            id='38919d62-bc66-4e28-bbda-e1e1ecca6f6d'
            time={60 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/lap_trinh_huong_doi_tuong/exam',
        element: (
          <PracticeTestPage
            quantity={60}
            title='Lập Trình Hướng Đối Tượng'
            subTitle='LTHĐT'
            id='8b1db622-55eb-41fa-b19e-a2f40bdd1c6a'
            time={60 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/nguyen_ly_thong_ke_kinh_te/exam',
        element: (
          <PracticeTestPage
            quantity={60}
            title='Nguyên Lý Thống Kê Kinh Tế'
            subTitle='NLTK Kinh Tế'
            id='338ea2ec-1763-463e-9f71-6e302b08b5bf'
            time={60 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/nhap_mon_ngon_ngu_han/exam',
        element: (
          <PracticeTestPage
            quantity={20}
            title='Nhập Môn Ngôn Ngữ Hàn'
            subTitle='Nhập Môn Ngôn Ngữ Hàn'
            id='8bdcf63a-3a99-42fe-addb-8e0ebe7f6d17'
            time={40 * 60}
          />
        ),
        exact: true
      },
      {
        path: '/van_hoa_xa_hoi_han_quoc/exam',
        element: (
          <PracticeTestPage
            quantity={25}
            title='Văn Hoá - Xã Hội Hàn Quốc'
            subTitle='VH - XH Hàn Quốc'
            id='23a3aafd-fe1b-42a8-b296-b42ab4456525'
            time={50 * 60}
          />
        ),
        exact: true
      }
    ]
  },
  {
    exact: true,
    path: '/login',
    element: <LoginPage />
  },
  {
    exact: true,
    path: '/register',
    element: <RegisterPage />
  },
  {
    exact: true,
    path: '*',
    element: <ErrorPage minHeight='100vh' />
  }
])

export default router
