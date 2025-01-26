import { RouterProvider, createBrowserRouter } from 'react-router';
import PrivateRoute from '@/components/common/PrivateRoute';
import _Layout from './pages/_Layout';
import NotFound from './pages/NotFound';
import MainPage from '@/pages/MainPage';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import CreateBoardPage from '@/pages/CreateBoardPage';

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <_Layout />,
      children: [
        { path: '/', element: <MainPage /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/create-board', element: (<PrivateRoute><CreateBoardPage /></PrivateRoute>) },
      ],
    },
    {
      path: '*',
      element: (
        <NotFound />
      ),
    },
  ])
  return <RouterProvider router={router} />
}