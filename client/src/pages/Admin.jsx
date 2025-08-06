import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Home, Settings, FileText, Users, Grid, LogOut, MessageSquare, Briefcase  } from 'lucide-react';
import { useAuth } from '../contexts/authContext';

// Admin components
import Dashboard from '../admin/Dashboard';
import Services from '../admin/Services';
import Testimonials from '../admin/Testimonials';
import SettingsComponent from '../admin/Settings';
import AboutPage from '../admin/aboutpage';
import AdminPortfolio from '../admin/AdminPortfolio';
import AdminSectors from '../admin/AdminSectors';
import AdminRegister from '../admin/AdminRegister/adminRegister';
import Story from '../admin/Story';
import Contact from '../admin/Admincontact';

const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  useEffect(() => {
    document.title = 'Admin Dashboard - HNV Building';

    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch unread message count
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const res = await fetch('https://hnv-project.onrender.com/api/messages/unread-count');
        if (res.ok) {
          const data = await res.json();
          setUnreadCount(data.count || 0);
        }
      } catch (err) {
        setUnreadCount(0);
      }
    };
    fetchUnreadCount();
  }, []);

  // Mark all unread messages as read when visiting /admin/contact
  useEffect(() => {
    if (location.pathname === 'https://hnv-project.onrender.com/admin/contact') {
      const markAllAsRead = async () => {
        try {
          // Get all unread messages
          const res = await fetch('https://hnv-project.onrender.com/api/messages');
          if (res.ok) {
            const messages = await res.json();
            const unread = messages.filter(m => !m.read);
            // Mark each unread message as read
            await Promise.all(
              unread.map(msg =>
                fetch(`https://hnv-project.onrender.com/api/messages/${msg._id}/read`, { method: 'PATCH' })
              )
            );
            // Refetch unread count
            const countRes = await fetch('https://hnv-project.onrender.com/api/messages/unread-count');
            if (countRes.ok) {
              const data = await countRes.json();
              setUnreadCount(data.count || 0);
            }
          }
        } catch (err) {
          // ignore
        }
      };
      markAllAsRead();
    }
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    if (typeof logout === 'function') logout();
    navigate('https://hnv-project.onrender.com/admin-login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-64`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <Link to="/admin" className="flex items-center">
            <span className="text-xl font-bold text-yellow-500">HNV</span>
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Admin</span>
          </Link>
          <button onClick={toggleSidebar} className="md:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            <X size={20} />
          </button>
        </div>

        <div className="py-4 px-3">
          <ul className="space-y-2">
            <li>
              <Link
                to="https://hnv-project.onrender.com/admin"
                className={`flex items-center px-4 py-2.5 rounded-lg ${
                  location.pathname === '/admin'
                    ? 'bg-yellow-500 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Grid className="h-5 w-5 mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="https://hnv-project.onrender.com/admin/services"
                className={`flex items-center px-4 py-2.5 rounded-lg ${
                  location.pathname === '/admin/services'
                    ? 'bg-yellow-500 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <FileText className="h-5 w-5 mr-3" />
                Services
              </Link>
            </li>
           <li>
  <Link
    to="https://hnv-project.onrender.com/admin/testimonials"
    className={`flex items-center px-4 py-2.5 rounded-lg ${
      location.pathname === '/admin/testimonials'
        ? 'bg-yellow-500 text-white'
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
    }`}
  >
    <MessageSquare className="h-5 w-5 mr-3" /> {/* Changed icon to MessageSquare */}
    Testimonials
  </Link>
</li>
            <li>
              <Link
                to="https://hnv-project.onrender.com/admin/AdminPortfolio"
                className={`flex items-center px-4 py-2.5 rounded-lg ${
                  location.pathname === '/admin/AdminPortfolio'
                    ? 'bg-yellow-500 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Users className="h-5 w-5 mr-3" />
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                to="https://hnv-project.onrender.com/admin/aboutpage"
                className={`flex items-center px-4 py-2.5 rounded-lg ${
                  location.pathname === '/admin/aboutpage'
                    ? 'bg-yellow-500 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <FileText className="h-5 w-5 mr-3" />
                About Page
              </Link>
            </li>
            <li>
              <Link
                to="https://hnv-project.onrender.com/admin/adminsectors"
                className={`flex items-center px-4 py-2.5 rounded-lg ${
                  location.pathname === '/admin/adminsectors'
                    ? 'bg-yellow-500 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Briefcase className="h-5 w-5 mr-3" />
                Market Sector
              </Link>
            </li>
            <li>
              <Link
                to="https://hnv-project.onrender.com/admin/story"
                className={`flex items-center px-4 py-2.5 rounded-lg ${
                  location.pathname === '/admin/story'
                    ? 'bg-yellow-500 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <FileText className="h-5 w-5 mr-3" />
                Story
              </Link>
            </li>
            <li>
              <Link
                to="https://hnv-project.onrender.com/admin/contact"
                className={`flex items-center px-4 py-2.5 rounded-lg ${
                  location.pathname === '/admin/contact'
                    ? 'bg-yellow-500 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <MessageSquare className="h-5 w-5 mr-3" />
                <span className="relative flex items-center">
                  Messages
                  {unreadCount > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="https://hnv-project.onrender.com/admin/settings"
                className={`flex items-center px-4 py-2.5 rounded-lg ${
                  location.pathname === '/admin/settings'
                    ? 'bg-yellow-500 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </Link>
            </li>
          </ul>

          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
            <ul className="space-y-2">
              <li>
                <Link
                  to="https://hnv-project.onrender.com/"
                  className="flex items-center px-4 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Home className="h-5 w-5 mr-3" />
                  Back to Website
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`md:ml-64 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Header */}
        <header className="bg-white shadow h-16 flex items-center justify-between px-4">
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-semibold">
                A
              </div>
              <span className="ml-2 text-gray-700 hidden md:inline-block">Admin</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 md:p-8">
          <Routes>
            <Route path="https://hnv-project.onrender.com/" element={<Dashboard />} />
            <Route path="https://hnv-project.onrender.com/services" element={<Services />} />
            <Route path="https://hnv-project.onrender.com/aboutpage" element={<AboutPage />} />
            <Route path="https://hnv-project.onrender.com/testimonials" element={<Testimonials />} />
            <Route path="https://hnv-project.onrender.com/settings" element={<SettingsComponent />} />
            <Route path="https://hnv-project.onrender.com/adminportfolio" element={<AdminPortfolio />} />
            <Route path="https://hnv-project.onrender.com/adminsectors" element={<AdminSectors />} />
            <Route path="https://hnv-project.onrender.com/185791920518" element={<AdminRegister />} />
            <Route path="https://hnv-project.onrender.com/story" element={<Story />} />
            <Route path="https://hnv-project.onrender.com/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Admin;
