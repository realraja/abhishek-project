"use client";
import { DialogContext } from '@/components/Dialog';
import Link from 'next/link';
import { useState } from 'react';
import { FiEdit, FiList, FiArrowRight, FiEye, FiEyeOff, FiLock } from 'react-icons/fi';

const HomePage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate a brief loading state for better UX
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        शिव गोरक्षनाथ समाज सेवा समिति
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Welcome to our community platform. Apply for membership or view your submitted applications.
                    </p>
                </div>

                {/* Two Boxes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Apply Form Box */}
                    <div
                        className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-blue-100"
                    >
                        <div className="flex flex-col items-center text-center h-full">
                            <div className="bg-blue-100 p-4 rounded-full mb-4">
                                <FiEdit className="text-blue-600 text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Apply Now</h3>
                            <p className="text-gray-600 mb-6 flex-grow">
                                Submit a new application for membership with your personal and family details.
                            </p>
                            <Link href={'/form/apply'} className="flex items-center justify-center w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                Start Application <FiArrowRight className="ml-2" />
                            </Link>
                        </div>
                    </div>

                    {/* Applied Forms Box */}
                    <div
                        className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-green-100"
                        onClick={() => setIsOpen(true)}
                    >
                        <div className="flex flex-col items-center text-center h-full">
                            <div className="bg-green-100 p-4 rounded-full mb-4">
                                <FiList className="text-green-600 text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">All Applications</h3>
                            <p className="text-gray-600 mb-6 flex-grow">
                                View all submitted applications and check their current status.
                            </p>
                            <button className="flex items-center justify-center w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                                View Applications <FiArrowRight className="ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <DialogContext
                showDialog={isOpen}
                onClose={() => setIsOpen(false)}
                title="Secure Access"
                className="max-w-md"
            >
                <div className="p-6">
                    <div className="flex justify-center mb-4">
                        <div className="bg-indigo-100 p-3 rounded-full">
                            <FiLock className="text-indigo-600 text-2xl" />
                        </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">Authentication Required</h3>
                    <p className="text-gray-600 text-center mb-6">Please enter your password to view all applications</p>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="relative mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex space-x-3">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            
                            <Link 
                                href={`/form/all?password=${password}`}
                                className="flex-1"
                                onClick={(e) => {
                                    if (!password) {
                                        e.preventDefault();
                                    }
                                }}
                            >
                                <button
                                    type="submit"
                                    disabled={!password || isLoading}
                                    className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Verifying...
                                        </>
                                    ) : (
                                        "Continue"
                                    )}
                                </button>
                            </Link>
                        </div>
                    </form>
                    
                    <p className="text-xs text-gray-500 text-center mt-4">
                        Your privacy is important to us. All data is encrypted and securely stored.
                    </p>
                </div>
            </DialogContext>
        </div>
    );
};

export default HomePage;