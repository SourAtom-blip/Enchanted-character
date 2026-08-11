import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Characters from './pages/Characters.jsx';
import Gallery from './pages/Gallery.jsx';
import ArtShowcase from './pages/ArtShowcase.jsx';
import ArtPieceDetail from './pages/ArtPieceDetail.jsx';
import Events from './pages/Events.jsx';
import EventDetail from './pages/EventDetail.jsx';
import TopPerformers from './pages/TopPerformers.jsx';
import SantaCatalog from './pages/SantaCatalog.jsx';
import Contact from './pages/Contact.jsx';
import GenericPage from './pages/GenericPage.jsx';
import AdminLogin from './admin/AdminLogin.jsx';
import RequireAdminAuth from './admin/RequireAdminAuth.jsx';
import AdminLayout from './admin/AdminLayout.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';
import AdminCharacters from './admin/AdminCharacters.jsx';
import AdminGallery from './admin/AdminGallery.jsx';
import AdminEvents from './admin/AdminEvents.jsx';
import AdminPages from './admin/AdminPages.jsx';
import AdminInquiries from './admin/AdminInquiries.jsx';
import AdminNewsletter from './admin/AdminNewsletter.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<RequireAdminAuth />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="characters" element={<AdminCharacters />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="pages" element={<AdminPages />} />
          <Route path="inquiries" element={<AdminInquiries />} />
          <Route path="newsletter" element={<AdminNewsletter />} />
        </Route>
      </Route>

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/art-showcase" element={<ArtShowcase />} />
        <Route path="/art-showcase/:id" element={<ArtPieceDetail />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/top-performers" element={<TopPerformers />} />
        <Route path="/characters/santas/:slug" element={<SantaCatalog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/:slug" element={<GenericPage />} />
      </Route>
    </Routes>
  );
}
