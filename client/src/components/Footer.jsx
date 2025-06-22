import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, HardHat } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#191919] text-white py-12 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-gray-700">
        {/* Company Info */}
        <div>
          <Link to="/" className="flex items-center mb-4">
            <HardHat className="h-6 w-6 text-yellow-500" />
            <span className="ml-2 text-lg font-bold text-white">HNV</span>
            <span className="ml-1 text-sm text-gray-400">Building</span>
          </Link>
          <p className="text-gray-400 leading-relaxed text-sm">
            Quality construction and building services for all your needs. Trusted, professional, and reliable.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-yellow-500 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-500 transition">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-yellow-500 font-semibold mb-3 border-b border-gray-700 pb-2">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-yellow-500 transition">Home</Link></li>
            <li><Link to="/services" className="hover:text-yellow-500 transition">Services</Link></li>
            <li><Link to="/about" className="hover:text-yellow-500 transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-500 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Our Services */}
        <div>
          <h3 className="text-yellow-500 font-semibold mb-3 border-b border-gray-700 pb-2">Our Services</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/services" className="hover:text-yellow-500 transition">Painting & Decorating</Link></li>
            <li><Link to="/services" className="hover:text-yellow-500 transition">Bricklaying & Repointing</Link></li>
            <li><Link to="/services" className="hover:text-yellow-500 transition">Gardening & Landscaping</Link></li>
            <li><Link to="/services" className="hover:text-yellow-500 transition">Bathroom & Kitchen Fitting</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-yellow-500 font-semibold mb-3 border-b border-gray-700 pb-2">Contact Us</h3>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-start">
              <MapPin className="mr-2 mt-1 h-5 w-5 text-yellow-500" />
              <span>123 Construction Road, Building City, BC12 3DE</span>
            </li>
            <li className="flex items-center">
              <Phone className="mr-2 h-5 w-5 text-yellow-500" />
              <a href="tel:+441234567890" className="hover:text-yellow-500 transition">+44 (0) 1234 567890</a>
            </li>
            <li className="flex items-center">
              <Mail className="mr-2 h-5 w-5 text-yellow-500" />
              <a href="mailto:info@hnvbuilding.com" className="hover:text-yellow-500 transition">info@hnvbuilding.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-gray-500 text-xs mt-8">
        &copy; {new Date().getFullYear()} HNV Building. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
