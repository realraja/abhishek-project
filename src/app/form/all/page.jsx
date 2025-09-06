'use client';

import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiCheckCircle, FiXCircle, FiChevronDown, FiChevronUp, FiUser, FiMail, FiCalendar, FiEye } from 'react-icons/fi';



function LoginContent() {
  const searchParams = useSearchParams();
  const password = searchParams.get("password");

  if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
    return <AdminDashboard />;
  }

  return (
    <div className="m-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Login Page</h1>
          <p className="text-gray-600">Please provide a valid URL parameter to login</p>
        </div>
      </div>
    </div> 
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={'loading...'}>
      <LoginContent />
    </Suspense>
  );
}






const AdminDashboard = () => {
    const [expandedUserId, setExpandedUserId] = useState(null);
    const [activeTab, setActiveTab] = useState('all'); // 'all', 'pending', 'approved', 'rejected'

    const [users, setUsers] = useState([]);

    useEffect(() => {
    const fetchForm = async () =>{
        const {data} = await axios.get('/api/form/all');
        if(data?.data) setUsers(data.data);
        console.log(data);
    }
    fetchForm();
    }, [])

    // Filter users based on active tab
    const filteredUsers = users.filter(user => {
        if (activeTab === 'all') return true;
        return user.form?.status === activeTab;
    });

    const toggleExpand = (userId) => {
        if (expandedUserId === userId) {
            setExpandedUserId(null);
        } else {
            setExpandedUserId(userId);
        }
    };

    const handleApprove = async(userId) => {
        setUsers(users.map(user =>
            user._id === userId
                ? { ...user, form: { ...user.form, status: 'approved' } }
                : user
        ));
        // In a real app, you would make an API call here
        const {data} = await axios.put('/api/form/all',{id:userId,status:'approved'});
        if(data?.message) toast.success(data.message);
    };

    const handleReject = async (userId) => {
        setUsers(users.map(user =>
            user._id === userId
                ? { ...user, form: { ...user.form, status: 'rejected' } }
                : user
        ));
        // In a real app, you would make an API call here
        // In a real app, you would make an API call here
        const {data} = await axios.put('/api/form/all',{id:userId,status:'rejected'});
        if(data?.message) toast.success(data.message);
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
            approved: { color: 'bg-green-100 text-green-800', text: 'Approved' },
            rejected: { color: 'bg-red-100 text-red-800', text: 'Rejected' }
        };

        const config = statusConfig[status] || statusConfig.pending;

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
                {config.text}
            </span>
        );
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    // Tab component
    const TabButton = ({ name, count, isActive, onClick }) => {
        return (
            <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                onClick={onClick}
            >
                {name} {count > 0 && `(${count})`}
            </button>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
                    <p className="text-gray-600">Manage user registration forms and approvals</p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div
                        className="bg-white rounded-xl shadow p-6 cursor-pointer transition-all hover:shadow-md"
                        onClick={() => setActiveTab('all')}
                    >
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Submissions</h3>
                        <p className="text-3xl font-bold text-blue-600">{users.length}</p>
                    </div>
                    <div
                        className="bg-white rounded-xl shadow p-6 cursor-pointer transition-all hover:shadow-md"
                        onClick={() => setActiveTab('pending')}
                    >
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Pending Review</h3>
                        <p className="text-3xl font-bold text-yellow-600">
                            {users.filter(user => user.form?.status === 'pending').length}
                        </p>
                    </div>
                    <div
                        className="bg-white rounded-xl shadow p-6 cursor-pointer transition-all hover:shadow-md"
                        onClick={() => setActiveTab('approved')}
                    >
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Approved</h3>
                        <p className="text-3xl font-bold text-green-600">
                            {users.filter(user => user.form?.status === 'approved').length}
                        </p>
                    </div>
                    <div
                        className="bg-white rounded-xl shadow p-6 cursor-pointer transition-all hover:shadow-md"
                        onClick={() => setActiveTab('rejected')}
                    >
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Rejected</h3>
                        <p className="text-3xl font-bold text-red-600">
                            {users.filter(user => user.form?.status === 'rejected').length}
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow overflow-hidden mb-8">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-800">Form Submissions</h2>

                        <div className="flex space-x-2">
                            <TabButton
                                name="All"
                                count={users.length}
                                isActive={activeTab === 'all'}
                                onClick={() => setActiveTab('all')}
                            />
                            <TabButton
                                name="Pending"
                                count={users.filter(user => user.form?.status === 'pending').length}
                                isActive={activeTab === 'pending'}
                                onClick={() => setActiveTab('pending')}
                            />
                            <TabButton
                                name="Approved"
                                count={users.filter(user => user.form?.status === 'approved').length}
                                isActive={activeTab === 'approved'}
                                onClick={() => setActiveTab('approved')}
                            />
                            <TabButton
                                name="Rejected"
                                count={users.filter(user => user.form?.status === 'rejected').length}
                                isActive={activeTab === 'rejected'}
                                onClick={() => setActiveTab('rejected')}
                            />
                        </div>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {filteredUsers.map((user) => (
                            <div key={user._id} className="transition-colors duration-200 hover:bg-gray-50">
                                {/* User Summary */}
                                <div
                                    className="px-6 py-4 flex justify-between items-center cursor-pointer"
                                    onClick={() => toggleExpand(user._id)}
                                >
                                    <div className="flex items-center">
                                        <img
                                            src={user.image}
                                            alt={user.name}
                                            className="h-10 w-10 rounded-full object-cover mr-4"
                                        />
                                        <div>
                                            <h3 className="font-medium text-gray-800">{user.name}</h3>
                                            <p className="text-sm text-gray-600 flex items-center">
                                                <FiMail className="mr-1" size={14} /> {user.email}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        {getStatusBadge(user.form?.status)}
                                        <span className="text-sm text-gray-500 flex items-center">
                                            <FiCalendar className="mr-1" size={14} />
                                            {formatDate(user.form?.submittedDate)}
                                        </span>
                                        {expandedUserId === user._id ? (
                                            <FiChevronUp className="text-gray-500" />
                                        ) : (
                                            <FiChevronDown className="text-gray-500" />
                                        )}
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                {expandedUserId === user._id && (
                                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Personal Details */}
                                            <div>
                                                <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                                                    <FiUser className="mr-2" /> Personal Details
                                                </h4>
                                                <div className="space-y-2">
                                                    <div className="flex">
                                                        <span className="text-gray-600 w-32">Name:</span>
                                                        <span className="font-medium">{user.form?.name}</span>
                                                    </div>
                                                    <div className="flex">
                                                        <span className="text-gray-600 w-32">Father's Name:</span>
                                                        <span className="font-medium">{user.form?.fatherName}</span>
                                                    </div>
                                                    <div className="flex">
                                                        <span className="text-gray-600 w-32">Mother's Name:</span>
                                                        <span className="font-medium">{user.form?.motherName}</span>
                                                    </div>
                                                    <div className="flex">
                                                        <span className="text-gray-600 w-32">Location:</span>
                                                        <span className="font-medium">{user.form?.location}</span>
                                                    </div>
                                                    <div className="flex">
                                                        <span className="text-gray-600 w-32">Pincode:</span>
                                                        <span className="font-medium">{user.form?.pincode}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Educational Details */}
                                            <div>
                                                <h4 className="font-medium text-gray-700 mb-3">Educational Details</h4>
                                                <div className="space-y-2">
                                                    <div className="flex">
                                                        <span className="text-gray-600 w-32">Class:</span>
                                                        <span className="font-medium">{user.form?.educationLevel}</span>
                                                    </div>
                                                    {user.form?.stream && (
                                                        <div className="flex">
                                                            <span className="text-gray-600 w-32">Stream:</span>
                                                            <span className="font-medium">{user.form?.stream}</span>
                                                        </div>
                                                    )}
                                                    <div className="flex">
                                                        <span className="text-gray-600 w-32">Percentage:</span>
                                                        <span className="font-medium">{user.form?.percentage}%</span>
                                                    </div>
                                                    <div className="flex">
                                                        <span className="text-gray-600 w-32">Extracurricular:</span>
                                                        <span className="font-medium">{user.form?.extracurricular}</span>
                                                    </div>
                                                    {user.form?.hasJob && (
                                                        <div className="flex">
                                                            <span className="text-gray-600 w-32">Job Details:</span>
                                                            <span className="font-medium">{user.form?.jobDetails}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Documents */}
                                        <div className="mt-6">
                                            <h4 className="font-medium text-gray-700 mb-3">Documents</h4>
                                            <div className="flex space-x-4">
                                                <a
                                                    href={user.form?.marksheet}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                                                >
                                                    <FiEye className="mr-2" /> View Marksheet
                                                </a>
                                                {user.form?.certificate && (
                                                    <a
                                                        href={user.form?.certificate}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                                                    >
                                                        <FiEye className="mr-2" /> View Certificate
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        {user.form?.status === 'pending' && (
                                            <div className="mt-6 pt-4 border-t border-gray-200 flex space-x-4">
                                                <button
                                                    onClick={() => handleApprove(user._id)}
                                                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                                >
                                                    <FiCheckCircle className="mr-2" /> Approve
                                                </button>
                                                <button
                                                    onClick={() => handleReject(user._id)}
                                                    className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                                >
                                                    <FiXCircle className="mr-2" /> Reject
                                                </button>
                                            </div>
                                        )}

                                        {/* Status Message */}
                                        {user.form?.status !== 'pending' && (
                                            <div className={`mt-4 p-3 rounded-lg ${user.form?.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                This form has been <span className="font-medium">{user.form?.status}</span>.
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Empty State */}
                {filteredUsers.length === 0 && (
                    <div className="bg-white rounded-xl shadow p-8 text-center mt-8">
                        <div className="bg-gray-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                            <FiUser className="text-gray-500 text-2xl" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {activeTab === 'all'
                                ? 'No Form Submissions Yet'
                                : `No ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Forms`
                            }
                        </h3>
                        <p className="text-gray-600">
                            {activeTab === 'all'
                                ? 'There are no form submissions to review at this time.'
                                : `There are no ${activeTab} form submissions at this time.`
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

