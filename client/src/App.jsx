import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public layout and pages
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import NotFound from './pages/NotFound';

// Admin pages
import Admin from './pages/Admin';
import AdminLogin from './admin/AdminLogin';
import AdminRoute from './admin/AdminRoute';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-yellow-500">HNV</h1>
          <p className="text-gray-600 dark:text-gray-400">Building Excellence</p>
          <div className="mt-4 w-16 h-1 bg-gray-300 dark:bg-gray-700 mx-auto relative overflow-hidden">
            <div className="absolute h-full bg-yellow-500 animate-loading-bar"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Admin login route using env variable, now URL-safe */}
        <Route path={import.meta.env.VITE_ADMIN_PATH} element={<AdminLogin />} />

        {/* Protected admin routes */}
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />

        {/* Public routes under layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* Catch-all NotFound for any other unmatched route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
