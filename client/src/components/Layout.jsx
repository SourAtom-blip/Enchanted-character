import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import DustMotes from './DustMotes.jsx';

export default function Layout() {
  return (
    <div className="relative min-h-screen">
      <DustMotes count={30} />
      <Navbar />
      <main className="relative z-10 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
