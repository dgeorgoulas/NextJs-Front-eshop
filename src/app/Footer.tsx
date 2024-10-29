// components/Footer.js
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-wrap justify-between">
          {/* Left section with Logo, Address, and Contact */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">Logo</h2>
            <p className="mb-2">
              <strong>Address:</strong><br />USA, California
            </p>
            <p className="mb-2">
              <strong>Contact:</strong><br />
              <a href="tel:18001234567" className="text-white hover:underline">1800 123 4567</a><br />
              <a href="mailto:javaria.y2b@gmail.com" className="text-white hover:underline">javaria.y2b@gmail.com</a>
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4 mt-4">
              <FaFacebook className="text-xl cursor-pointer hover:text-gray-400" />
              <FaInstagram className="text-xl cursor-pointer hover:text-gray-400" />
              <FaTwitter className="text-xl cursor-pointer hover:text-gray-400" />
              <FaLinkedin className="text-xl cursor-pointer hover:text-gray-400" />
              <FaYoutube className="text-xl cursor-pointer hover:text-gray-400" />
            </div>
          </div>

          {/* Link sections */}
          <div className="grid grid-cols-2 gap-8 md:flex md:space-x-16">
            {/* First set of links */}
            <div>
              <h3 className="font-semibold mb-3">Links</h3>
              <ul>
                <li><a href="#" className="hover:underline">Link One</a></li>
                <li><a href="#" className="hover:underline">Link Two</a></li>
                <li><a href="#" className="hover:underline">Link Three</a></li>
                <li><a href="#" className="hover:underline">Link Four</a></li>
                <li><a href="#" className="hover:underline">Link Five</a></li>
              </ul>
            </div>

            {/* Second set of links */}
            <div>
              <h3 className="font-semibold mb-3">More Links</h3>
              <ul>
                <li><a href="#" className="hover:underline">Link Six</a></li>
                <li><a href="#" className="hover:underline">Link Seven</a></li>
                <li><a href="#" className="hover:underline">Link Eight</a></li>
                <li><a href="#" className="hover:underline">Link Nine</a></li>
                <li><a href="#" className="hover:underline">Link Ten</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div className="border-t border-gray-600 mt-8 pt-4 text-center">
          <p>© 2023 Javaria. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;