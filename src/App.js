import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ImpactPage from './pages/ImpactPage';
import LearnMorePage from './pages/LearnMorePage';
import PersonProfilePage from './pages/PersonProfilePage';

function App() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = location.hash.replace('#', '');

    const scrollToHash = (retries = 40) => {
      const target = document.getElementById(id);

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      if (retries > 0) {
        window.setTimeout(() => scrollToHash(retries - 1), 80);
      }
    };

    window.setTimeout(() => scrollToHash(), 0);
  }, [location.hash, location.pathname]);

  return (
    <main className="homepage">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/about/people/:slug" element={<PersonProfilePage />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/learn-more" element={<LearnMorePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </main>
  );
}

export default App;