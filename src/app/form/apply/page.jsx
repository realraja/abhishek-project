'use client';
import { useState } from 'react';
import { FiEdit, FiFileText, FiEye, FiArrowLeft, FiUpload, FiX,FiCheckCircle, FiClock, FiXCircle, FiDownload } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/redux/slicer/auth';

const FormPage = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('apply');
    const [marksheetPreview, setMarksheetPreview] = useState(null);
    const [certificatePreview, setCertificatePreview] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        fatherName: '',
        motherName: '',
        location: '',
        pincode: '',
        educationLevel: '',
        stream: '',
        percentage: '',
        marksheet: null,
        extracurricular: '',
        certificate: null,
        hasJob: false,
        jobDetails: ''
    });

    const dispatch = useDispatch();
    const {userData} = useSelector((state) => state.auth);

    console.log(userData)

    if(userData?.form?.name){
        return <SubmittedFormsPage form={userData?.form} />
    }

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });

        // Reset stream if education level changes to 10th
        if (name === 'educationLevel' && value === '10th') {
            setFormData(prev => ({
                ...prev,
                stream: ''
            }));
        }
    };

    // Handle file upload for marksheet
    const handleMarksheetUpload = (e) => {
        const file = e.target.files[0];
        if (file) {


            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setMarksheetPreview(e.target.result);
                setFormData({
                    ...formData,
                    marksheet: e.target.result
                });
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle file upload for certificate
    const handleCertificateUpload = (e) => {
        const file = e.target.files[0];
        if (file) {

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setCertificatePreview(e.target.result);
                setFormData({
                    ...formData,
                    certificate: e.target.result
                });
            };
            reader.readAsDataURL(file);
        }
    };

    // Remove uploaded marksheet
    const removeMarksheet = () => {
        setFormData({
            ...formData,
            marksheet: null
        });
        setMarksheetPreview(null);
    };

    // Remove uploaded certificate
    const removeCertificate = () => {
        setFormData({
            ...formData,
            certificate: null
        });
        setCertificatePreview(null);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        try {
            const { data } = await axios.post('/api/form/apply', formData);
            if (data) {
                await dispatch(login(data?.data));
                toast.success('Form submitted successfully!');
            }
        } catch (error) {
            toast.error('Form submission failed. Please try again.');
        }


    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header with back button */}
                <div className="flex items-center mb-8">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                        <FiArrowLeft className="mr-2" /> Back
                    </button>
                </div>

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Member Registration Form</h1>
                    <p className="text-gray-600">Complete your registration with personal and educational details</p>
                </div>

                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200 mb-8">
                    <button
                        className={`py-3 px-6 font-medium flex items-center ${activeTab === 'apply' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('apply')}
                    >
                        <FiEdit className="mr-2" /> Apply New Form
                    </button>
                </div>

                {/* Apply Form Box */}
                {activeTab === 'apply' && (
                    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Registration Form</h2>

                        <form onSubmit={handleSubmit}>
                            {/* Personal Details */}
                            <div className="mb-8">
                                <h3 className="text-xl font-medium text-gray-800 mb-4 border-b pb-2">Personal Details</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700 mb-1">
                                            Father's Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="fatherName"
                                            name="fatherName"
                                            value={formData.fatherName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="motherName" className="block text-sm font-medium text-gray-700 mb-1">
                                            Mother's Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="motherName"
                                            name="motherName"
                                            value={formData.motherName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                                            Location *
                                        </label>
                                        <input
                                            type="text"
                                            id="location"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                                            Pincode *
                                        </label>
                                        <input
                                            type="text"
                                            id="pincode"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            required
                                            pattern="[0-9]{6}"
                                            title="Please enter a valid 6-digit pincode"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Educational Details */}
                            <div className="mb-8">
                                <h3 className="text-xl font-medium text-gray-800 mb-4 border-b pb-2">Educational Details</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="educationLevel" className="block text-sm font-medium text-gray-700 mb-1">
                                            Class *
                                        </label>
                                        <select
                                            id="educationLevel"
                                            name="educationLevel"
                                            value={formData.educationLevel}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        >
                                            <option value="">Select Class</option>
                                            <option value="10th">10th</option>
                                            <option value="12th">12th</option>
                                        </select>
                                    </div>

                                    {formData.educationLevel === '12th' && (
                                        <div>
                                            <label htmlFor="stream" className="block text-sm font-medium text-gray-700 mb-1">
                                                Stream *
                                            </label>
                                            <select
                                                id="stream"
                                                name="stream"
                                                value={formData.stream}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            >
                                                <option value="">Select Stream</option>
                                                <option value="Science">Science</option>
                                                <option value="Commerce">Commerce</option>
                                                <option value="Arts">Arts</option>
                                            </select>
                                        </div>
                                    )}

                                    <div>
                                        <label htmlFor="percentage" className="block text-sm font-medium text-gray-700 mb-1">
                                            Percentage/CGPA *
                                        </label>
                                        <input
                                            type="number"
                                            id="percentage"
                                            name="percentage"
                                            value={formData.percentage}
                                            onChange={handleInputChange}
                                            min="0"
                                            max="100"
                                            step="0.01"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="marksheet" className="block text-sm font-medium text-gray-700 mb-1">
                                            Upload Marksheet *
                                        </label>
                                        <div className="flex items-center">
                                            <label className="flex flex-col items-center px-4 py-2 bg-white text-blue-600 rounded-lg border border-blue-600 cursor-pointer hover:bg-blue-50">
                                                <FiUpload className="text-lg" />
                                                <span className="mt-1 text-sm">Choose File</span>
                                                <input
                                                    type="file"
                                                    id="marksheet"
                                                    name="marksheet"
                                                    onChange={handleMarksheetUpload}
                                                    className="hidden"
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                    required
                                                />
                                            </label>
                                            {formData.marksheet && (
                                                <span className="ml-3 text-sm text-gray-600">{formData.marksheet.name}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Marksheet Preview */}
                                {marksheetPreview && (
                                    <div className="mt-4">
                                        <p className="text-sm font-medium text-gray-700 mb-2">Marksheet Preview:</p>
                                        <div className="relative inline-block">
                                            <img
                                                src={marksheetPreview}
                                                alt="Marksheet preview"
                                                className="h-40 border rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeMarksheet}
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 -mt-2 -mr-2"
                                            >
                                                <FiX className="text-sm" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Extracurricular Activities */}
                            <div className="mb-8">
                                <h3 className="text-xl font-medium text-gray-800 mb-4 border-b pb-2">Extracurricular Activities</h3>

                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label htmlFor="extracurricular" className="block text-sm font-medium text-gray-700 mb-1">
                                            Extracurricular Activities
                                        </label>
                                        <textarea
                                            id="extracurricular"
                                            name="extracurricular"
                                            value={formData.extracurricular}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Describe your extracurricular activities (sports, arts, etc.)"
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label htmlFor="certificate" className="block text-sm font-medium text-gray-700 mb-1">
                                            Upload Certificate (if any)
                                        </label>
                                        <div className="flex items-center">
                                            <label className="flex flex-col items-center px-4 py-2 bg-white text-blue-600 rounded-lg border border-blue-600 cursor-pointer hover:bg-blue-50">
                                                <FiUpload className="text-lg" />
                                                <span className="mt-1 text-sm">Choose File</span>
                                                <input
                                                    type="file"
                                                    id="certificate"
                                                    name="certificate"
                                                    onChange={handleCertificateUpload}
                                                    className="hidden"
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                />
                                            </label>
                                            {formData.certificate && (
                                                <span className="ml-3 text-sm text-gray-600">{formData.certificate.name}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Certificate Preview */}
                                {certificatePreview && (
                                    <div className="mt-4">
                                        <p className="text-sm font-medium text-gray-700 mb-2">Certificate Preview:</p>
                                        <div className="relative inline-block">
                                            <img
                                                src={certificatePreview}
                                                alt="Certificate preview"
                                                className="h-40 border rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeCertificate}
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 -mt-2 -mr-2"
                                            >
                                                <FiX className="text-sm" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Job Details */}
                            <div className="mb-8">
                                <h3 className="text-xl font-medium text-gray-800 mb-4 border-b pb-2">Job Details</h3>

                                <div className="flex items-center mb-4">
                                    <input
                                        type="checkbox"
                                        id="hasJob"
                                        name="hasJob"
                                        checked={formData.hasJob}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="hasJob" className="ml-2 block text-sm text-gray-700">
                                        Currently employed
                                    </label>
                                </div>

                                {formData.hasJob && (
                                    <div>
                                        <label htmlFor="jobDetails" className="block text-sm font-medium text-gray-700 mb-1">
                                            Job Details
                                        </label>
                                        <textarea
                                            id="jobDetails"
                                            name="jobDetails"
                                            value={formData.jobDetails}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Please provide details about your job (company, position, etc.)"
                                        ></textarea>
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
                            >
                                Submit Registration
                            </button>
                        </form>
                    </div>
                )}


            </div>
        </div>
    );
};

export default FormPage;


const SubmittedFormsPage = ({form}) => {
  const router = useRouter();
  



  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <FiCheckCircle className="text-green-500 text-xl" />;
      case 'pending':
        return <FiClock className="text-yellow-500 text-xl" />;
      case 'rejected':
        return <FiXCircle className="text-red-500 text-xl" />;
      default:
        return <FiClock className="text-gray-500 text-xl" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'pending':
        return 'Pending Review';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown Status';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <FiArrowLeft className="mr-2" /> Back to Home
          </button>
          <h1 className="text-3xl font-bold text-gray-800 text-center">Submitted Forms</h1>
          <div className="w-24"></div> {/* For spacing */}
        </div>

        {/* Forms List */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Header with status */}
              <div className={`px-6 py-4 flex justify-between items-center ${getStatusColor(form.status)}`}>
                <div className="flex items-center">
                  {getStatusIcon(form.status)}
                  <span className="ml-2 font-medium">{getStatusText(form.status)}</span>
                </div>
                <span className="text-sm">Submitted on: {formatDate(form.submittedDate)}</span>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Personal Details</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-medium">{form.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Father's Name</p>
                        <p className="font-medium">{form.fatherName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Mother's Name</p>
                        <p className="font-medium">{form.motherName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-medium">{form.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Pincode</p>
                        <p className="font-medium">{form.pincode}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Educational Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Educational Details</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Class</p>
                        <p className="font-medium">{form.educationLevel}</p>
                      </div>
                      {form.stream && (
                        <div>
                          <p className="text-sm text-gray-600">Stream</p>
                          <p className="font-medium">{form.stream}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-gray-600">Percentage/CGPA</p>
                        <p className="font-medium">{form.percentage}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Extracurricular Activities</p>
                        <p className="font-medium">{form.extracurricular || "N/A"}</p>
                      </div>
                      {form.hasJob && (
                        <div>
                          <p className="text-sm text-gray-600">Job Details</p>
                          <p className="font-medium">{form.jobDetails}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Documents */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Documents</h3>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <FiEye className="text-blue-600 text-xl" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-600">Marksheet</p>
                        <a 
                          href={form.marksheet} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline font-medium flex items-center"
                        >
                          View Document <FiDownload className="ml-1" />
                        </a>
                      </div>
                    </div>
                    
                    {form.certificate && (
                      <div className="flex items-center">
                        <div className="bg-green-100 p-3 rounded-lg">
                          <FiEye className="text-green-600 text-xl" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-gray-600">Certificate</p>
                          <a 
                            href={form.certificate} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline font-medium flex items-center"
                          >
                            View Document <FiDownload className="ml-1" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Rejection Reason (if applicable) */}
                {form.status === 'rejected' && form.rejectionReason && (
                  <div className="mt-6 p-4 bg-red-50 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-2">Rejection Reason</h4>
                    <p className="text-red-700">{form.rejectionReason}</p>
                  </div>
                )}
              </div>
            </div>
        </div>
        
       
      </div>
    </div>
  );
};