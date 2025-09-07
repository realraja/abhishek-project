import Link from 'next/link';
import React from 'react';
import { FiHeart, FiInstagram, FiMessageCircle, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Developer RAJA
            </h3>
            <p className="text-gray-300 mb-4">
              Creating beautiful and functional web experiences with modern technologies.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link
                href="https://github.com/realraja"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-cyan-600 transition-all duration-300 transform hover:-translate-y-1"
                aria-label="GitHub"
              >
                <FiGithub className="text-xl" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/rajesh-kumar-06908730b/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="text-xl" />
              </Link>
              <Link
                href="mailto:realllraja@gmail.com"
                className="bg-gray-800 p-2 rounded-full hover:bg-red-500 transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Email"
              >
                <FiMail className="text-xl" />
              </Link>
            </div>
          </div>

          {/* Services Section */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4 text-cyan-300">Services</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">
                  Web Development
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">
                  Mobile Apps
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">
                  UI/UX Design
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">
                  E-commerce Solutions
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4 text-cyan-300">Get In Touch</h4>
            <div className="space-y-3">
              <Link
                href="https://www.instagram.com/code.raja/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center md:justify-end space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300 w-full md:w-auto"
              >
                <FiInstagram className="text-lg" />
                <span>Follow on Instagram</span>
              </Link>
              <Link
                href="https://wa.me/918005760975"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center md:justify-end space-x-2 bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300 w-full md:w-auto"
              >
                <FiMessageCircle className="text-lg" />
                <span>Chat on WhatsApp</span>
              </Link>
              <Link
                href="https://realllraja.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center md:justify-end space-x-2 bg-gradient-to-r from-blue-500 to-cyan-600 px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300 w-full md:w-auto"
              >
                <span>View Portfolio</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Copyright Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm text-gray-400 flex items-center justify-center md:justify-start">
              Made with <FiHeart className="text-red-500 mx-1" /> by Developer RAJA 
              <span className="mx-2">•</span>
              © {currentYear} All rights reserved.
            </p>
          </div>
          
   
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/918005760975"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110 z-50"
        aria-label="Chat on WhatsApp"
      >
        <FiMessageCircle className="text-2xl" />
      </a>
    </footer>
  );
};

export default Footer;