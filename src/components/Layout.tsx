import { Outlet } from 'react-router-dom';
import Header from './Header';

function Layout() {
  return (
    <>
      <Outlet />
      <Header />
    </>
  );
}

export default Layout;
