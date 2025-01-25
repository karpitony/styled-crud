import { Outlet } from 'react-router';

export default function _Layout() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}