"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { FiLogOut, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { PulseLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { logoutUser } from '@/utils/authRequests';
import { logout } from '@/redux/slicer/auth';

const Header = () => {
    const { isUser, userData, loading } = useSelector((state) => state.auth);
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();

    if (!isUser) return router.push('/login');

    const handleLogout = async () => {
        const data = await logoutUser({});
        if (data.success) {
            await dispatch(logout());
            toast.success(data.message);
            router.push('/login')
        } else {
            toast.error(data.message);
        }
    }


    return (
        <nav className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    {/* Logo and Title */}
                    <div onClick={()=> router.push('/')} className="flex cursor-pointer items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <Image
                                src={'/IMG_2348.JPG'}
                                height={70}
                                width={70}
                                alt='logo'
                                className="rounded-full border-4 border-white shadow-md"
                            />
                            <span className="ml-3 text-xl font-bold text-white">
                                शिव गोरक्षनाथ (योगी) समाज सेवा समिति जैतारण
                            </span>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    {loading ? (
                        <div className="hidden md:flex items-center">
                            <PulseLoader color="#ffffff" size={8} />
                        </div>
                    ) : isUser && (
                        <div className="hidden md:flex items-center space-x-6">
                            <div className="flex items-center space-x-3 bg-blue-500/20 px-4 py-2 rounded-full">
                                <FiUser className="text-white text-lg" />
                                <p className="text-white font-medium">{userData?.name}</p>
                            </div>
                            <Image
                                src={userData?.image}
                                height={50}
                                width={50}
                                alt='User Image'
                                className='rounded-full border-2 border-white shadow-md'
                            />
                            <button
                                onClick={handleLogout}
                                className="flex cursor-pointer items-center space-x-2 bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                            >
                                <FiLogOut className="text-lg" />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        >
                            {isMenuOpen ? (
                                <FiX className="block h-6 w-6" />
                            ) : (
                                <FiMenu className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-blue-700 shadow-xl">
                    <div className="px-4 pt-2 pb-3 space-y-3">
                        {loading ? (
                            <div className="flex justify-center py-4">
                                <PulseLoader color="#ffffff" size={8} />
                            </div>
                        ) : isUser && (
                            <>
                                <div className="flex items-center space-x-3 p-2 bg-blue-600 rounded-lg">
                                    <Image
                                        src={userData?.image}
                                        height={40}
                                        width={40}
                                        alt='User Image'
                                        className='rounded-full border-2 border-white'
                                    />
                                    <p className="text-white font-medium">{userData?.name}</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex cursor-pointer items-center space-x-2 w-full text-left text-white hover:bg-blue-600 px-3 py-2 rounded-md text-base font-medium"
                                >
                                    <FiLogOut className="text-lg" />
                                    <span>Logout</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;