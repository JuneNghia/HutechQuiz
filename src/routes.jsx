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
      // {
      //   path: '/module-m1/word',
      //   element: <PracticeTestPage />,
      //   exact: true
      // },
      // {
      //   path: '/module-m1/excel',
      //   element: <PracticeTestPage />,
      //   exact: true
      // },
      // {
      //   path: '/module-m1/powerpoint',
      //   element: <PracticeTestPage />,
      //   exact: true
      // },
      {
        path: '/module-m1/exam',
        element: (
          <PracticeTestPage
            quantity={30}
            title='Kiểm tra Module M1'
            id='37901f73-7c4f-4cad-8074-1c2b4e99191d'
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
            title='Kiểm tra QPAN 1'
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
            title='Kiểm tra QPAN 2'
            id='6f1894e2-8888-4358-b8cc-14a80ee8782b'
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
            title='Kiểm tra KTCT MAC'
            id='bf304142-23ef-4d62-9575-fecf97723e16'
            time={45 * 60}
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
