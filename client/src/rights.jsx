import React from 'react';
import { Github, ExternalLink, MapPin, Building2 } from 'lucide-react';

const Rights = () => {
  return (
    <div className="w-full bg-gradient-to-r from-blue-100 via-white to-blue-200 py-6 px-4 flex flex-col items-center border-t border-blue-200">
      
      {/* HNV Building Section */}
      <div className="text-center">
        <p className="text-sm font-bold text-blue-900 flex items-center justify-center gap-1">
          <Building2 size={16} /> HNV Building
        </p>
        <p className="text-xs text-blue-700 mt-1">
          Expert Construction & Renovation Services in London
        </p>
        <p className="text-xs text-blue-700 mt-1 flex items-center justify-center gap-1">
          <MapPin size={12} /> London, United Kingdom
        </p>
        <a
          href="https://hnvbuilding.co.uk/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-700 underline hover:text-blue-900 transition mt-1 inline-block"
        >
          Visit Official Website
        </a>
      </div>

      <div className="border-t border-blue-300 my-4 w-1/2" />

      {/* Developer Section */}
      <div className="flex flex-col items-center gap-2">
        {/* Profile Image */}
        <img
          src="https://avatars.githubusercontent.com/u/00000000" // ← Replace with your image
          alt="Lathurzan Suban"
          className="w-14 h-14 rounded-full border border-blue-300 shadow"
        />

        {/* Name, Role & Description */}
        <div className="text-center">
          <p className="text-sm font-bold text-blue-900">Lathurzan Subatharan</p>
          <p className="text-xs text-blue-700">Freelance Full-Stack Developer</p>
          <p className="text-xs text-blue-600 max-w-xs mt-1">
            Developed this platform for HNV Building using React, Node.js, Express.js, and MongoDB.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-4 mt-2">
          <a
            href="https://github.com/Lathurzan/HNV-Project" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-900 text-xs flex items-center gap-1 transition"
          >
            <Github size={14} />
            GitHub
          </a>
          <a
            href="https://yourportfolio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-900 text-xs flex items-center gap-1 transition"
          >
            <ExternalLink size={14} />
            Portfolio
          </a>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-xs text-blue-900 text-center font-medium mt-4">
        © {new Date().getFullYear()} HNV Building. All rights reserved.
      </p>
    </div>
  );
};

export default Rights;
