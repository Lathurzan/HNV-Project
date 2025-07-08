import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, HardHat } from 'lucide-react';

const Footer = () => {
  const [socialLinks, setSocialLinks] = useState({});
  const [contactInfo, setContactInfo] = useState({ address: '', phone: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setSocialLinks({
          facebook: data.facebookUrl,
          instagram: data.instagramUrl,
          twitter: data.twitterUrl,
        });
        setContactInfo({
          address: data.address || '',
          phone: data.phone || '',
          email: data.email || '',
        });
        setLoading(false);
      })
      .catch(() => {
        setSocialLinks({});
        setContactInfo({ address: '', phone: '', email: '' });
        setError('Unable to load contact info');
        setLoading(false);
      });
  }, []);

  // Helper to scroll to top on navigation
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#191919] text-white py-12 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-gray-700">
        {/* Company Info */}
        <div>
          <Link to="/" className="flex items-center mb-4" onClick={scrollToTop}>
            <HardHat className="h-6 w-6 text-yellow-500" />
            <span className="ml-2 text-lg font-bold text-white">HNV</span>
            <span className="ml-1 text-sm text-gray-400">Building</span>
          </Link>
          <p className="text-gray-400 leading-relaxed text-sm">
            Quality construction and building services for all your needs. Trusted, professional, and reliable.
          </p>
          <div className="flex space-x-4 mt-4">
            {socialLinks.facebook && (
              <a href={socialLinks.facebook} className="text-gray-400 hover:text-yellow-500 transition" target="_blank" rel="noopener noreferrer">
                <Facebook size={20} />
              </a>
            )}
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} className="text-gray-400 hover:text-yellow-500 transition" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </a>
            )}
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} className="text-gray-400 hover:text-yellow-500 transition" target="_blank" rel="noopener noreferrer">
                {/* You can use a Twitter icon from lucide-react or another icon library */}
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.7-.02-1.36-.21-1.94-.53v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 24 4.59a8.36 8.36 0 0 1-2.54.7z"/></svg>
              </a>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-yellow-500 font-semibold mb-3 border-b border-gray-700 pb-2">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-yellow-500 transition" onClick={scrollToTop}>Home</Link></li>
            <li><Link to="/services" className="hover:text-yellow-500 transition" onClick={scrollToTop}>Services</Link></li>
            <li><Link to="/about" className="hover:text-yellow-500 transition" onClick={scrollToTop}>About Us</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-500 transition" onClick={scrollToTop}>Contact</Link></li>
          </ul>
        </div>

        {/* Our Services */}
        <div>
          <h3 className="text-yellow-500 font-semibold mb-3 border-b border-gray-700 pb-2">Our Services</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/services" className="hover:text-yellow-500 transition" onClick={scrollToTop}>Painting & Decorating</Link></li>
            <li><Link to="/services" className="hover:text-yellow-500 transition" onClick={scrollToTop}>Bricklaying & Repointing</Link></li>
            <li><Link to="/services" className="hover:text-yellow-500 transition" onClick={scrollToTop}>Gardening & Landscaping</Link></li>
            <li><Link to="/services" className="hover:text-yellow-500 transition" onClick={scrollToTop}>Bathroom & Kitchen Fitting</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-yellow-500 font-semibold mb-3 border-b border-gray-700 pb-2">Contact Us</h3>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-start">
              <MapPin className="mr-2 mt-1 h-5 w-5 text-yellow-500" />
              {loading ? (
                <span className="text-gray-500">Loading...</span>
              ) : error ? (
                <span className="text-red-400">-</span>
              ) : contactInfo.address ? (
                <span>{contactInfo.address.split('\n').map((line, idx) => (
                  <React.Fragment key={idx}>{line}<br /></React.Fragment>
                ))}</span>
              ) : (
                <span>-</span>
              )}
            </li>
            <li className="flex items-center">
              <Phone className="mr-2 h-5 w-5 text-yellow-500" />
              {loading ? (
                <span className="text-gray-500">Loading...</span>
              ) : error ? (
                <span className="text-red-400">-</span>
              ) : contactInfo.phone ? (
                <a href={`tel:${contactInfo.phone}`} className="hover:text-yellow-500 transition">{contactInfo.phone}</a>
              ) : (
                <span>-</span>
              )}
            </li>
            <li className="flex items-center">
              <Mail className="mr-2 h-5 w-5 text-yellow-500" />
              {loading ? (
                <span className="text-gray-500">Loading...</span>
              ) : error ? (
                <span className="text-red-400">-</span>
              ) : contactInfo.email ? (
                <a href={`mailto:${contactInfo.email}`} className="hover:text-yellow-500 transition">{contactInfo.email}</a>
              ) : (
                <span>-</span>
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-gray-500 text-xs mt-8">
        &copy; {new Date().getFullYear()} HNV Building.
        <span> <Link to="/rights" className="hover:text-yellow-500 transition" onClick={scrollToTop}>All rights reserved.</Link></span>
      </div>
    </footer>
  );
};

export default Footer;
