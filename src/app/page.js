"use client";
import Link from 'next/link';
import { useState } from 'react';
import { FiEdit, FiCreditCard, FiSettings, FiArrowRight } from 'react-icons/fi';

const HomePage = () => {
  const [activeBox, setActiveBox] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            शिव गोरक्षनाथ समाज सेवा समिति
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to our community platform. Manage your account, make payments, and update your preferences.
          </p>
        </div>

        {/* Three Boxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Fill Form Box */}
          <div 
            className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer ${activeBox === 'form' ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setActiveBox('form')}
          >
            <div className="flex flex-col items-center text-center h-full">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <FiEdit className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Fill Form</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Complete your registration form with personal and family details.
              </p>
              <Link href={'/form'} className="flex items-center justify-center w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Proceed <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </div>

          {/* Make Payment Box */}
          <div 
            className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer ${activeBox === 'payment' ? 'ring-2 ring-green-500' : ''}`}
            onClick={() => setActiveBox('payment')}
          >
            <div className="flex flex-col items-center text-center h-full">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <FiCreditCard className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Make Payment</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Pay your membership fees, donations, or event registration payments.
              </p>
              <button className="flex items-center justify-center w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                Proceed <FiArrowRight className="ml-2" />
              </button>
            </div>
          </div>

          {/* Settings Box */}
          <div 
            className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer ${activeBox === 'settings' ? 'ring-2 ring-purple-500' : ''}`}
            onClick={() => setActiveBox('settings')}
          >
            <div className="flex flex-col items-center text-center h-full">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <FiSettings className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Settings</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Update your profile, change password, and manage notification preferences.
              </p>
              <button className="flex items-center justify-center w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                Proceed <FiArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Need Help?</h2>
          <p className="text-gray-600 text-center">
            Contact our support team at support@example.com or call us at +91 XXXXX XXXXX
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;