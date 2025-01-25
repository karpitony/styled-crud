import { RouterProvider, createBrowserRouter } from 'react-router';
import _Layout from './pages/_Layout';
import NotFound from './pages/NotFound';
import MainPage from '@/pages/MainPage';


export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <_Layout />,
      children: [
        { path: '/', element: <MainPage /> },
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