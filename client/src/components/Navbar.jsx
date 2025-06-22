import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black bg-opacity-90 fixed w-full z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/">
              <img
                src="/assest/HNV2.png"
                alt="HNV Logo"
                className="h-14 w-auto"
              />
            </Link>
          </div>

          {/* Hamburger for mobile */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {[
              { label: "Home", path: "/" },
              { label: "Service", path: "/services" },
              { label: "Portfolio", path: "/portfolio" },
              { label: "About", path: "/about" },
              { label: "Contact", path: "/contact" },
            ].map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className="text-white font-bold uppercase text-sm hover:text-yellow-400 transition"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 bg-black bg-opacity-95 rounded shadow-lg">
            <div className="flex flex-col space-y-2 py-4 px-6">
              {[
                { label: "Home", path: "/" },
                { label: "Service", path: "/services" },
                { label: "Portfolio", path: "/portfolio" },
                { label: "About", path: "/about" },
                { label: "Contact", path: "/contact" },
              ].map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  className="text-white font-bold uppercase text-base hover:text-yellow-400 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
