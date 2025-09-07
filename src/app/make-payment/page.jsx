'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { FiCode, FiTool, FiClock, FiMail, FiHome } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const UnderDevelopment = () => {
  const router = useRouter();
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    const timer = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20">
        <div className="p-8 text-center">
          {/* Animated Icon */}
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto">
              <FiCode className="text-white text-4xl" />
            </div>
            <div className="absolute -top-2 -right-2">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                <FiTool className="text-indigo-900 text-xl" />
              </div>
            </div>
          </div>
          
          {/* Message */}
          <h1 className="text-xl font-bold text-white mb-4">Page Under Development{dots}</h1>
          <p className="text-white/80 text-lg mb-2">We're working hard to bring you an amazing experience.</p>
          <p className="text-white/70 mb-8">This page will be available soon!</p>
          
          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2.5 mb-8">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2.5 rounded-full animate-pulse" 
              style={{ width: '75%' }}
            ></div>
          </div>
          
          {/* Features List */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/10 p-4 rounded-lg">
              <FiClock className="text-cyan-400 text-2xl mx-auto mb-2" />
              <p className="text-white text-sm">Coming Soon</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <FiTool className="text-amber-400 text-2xl mx-auto mb-2" />
              <p className="text-white text-sm">In Development</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => router.push('/')}
              className="flex items-center justify-center gap-2 bg-white text-indigo-900 py-3 px-6 rounded-lg font-medium hover:bg-gray-100 transition-colors flex-1"
            >
              <FiHome /> Go Home
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-600 transition-colors flex-1"
            >
              Refresh Page
            </button>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-black/20 py-4 text-center">
          <p className="text-white/60 text-sm">© 2023 Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default UnderDevelopment;