import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {currentYear} शिव गोरक्षनाथ (योगी) समाज सेवा समिति जैतारण. All rights reserved.
            </p>
          </div>
          
        
        </div>
      </div>
    </footer>
  );
};

export default Footer;
