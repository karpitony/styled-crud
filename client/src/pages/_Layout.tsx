import { Outlet } from 'react-router';
import Header from '@/components/Header/Header';

export default function _Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}