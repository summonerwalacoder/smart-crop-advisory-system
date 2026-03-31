import { Outlet, useLocation } from 'react-router';
import Navigation from './Navigation';

export default function Root() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {!isLoginPage && <Navigation />}
      <main className={!isLoginPage ? "container mx-auto px-4 py-6" : ""}>
        <Outlet />
      </main>
    </div>
  );
}
