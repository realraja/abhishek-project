'use client'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { GoogleLoginUser } from '@/utils/authRequests';
import toast from 'react-hot-toast';
import { login } from '@/redux/slicer/auth';
import { useDispatch } from 'react-redux';

export default function GoogleSignIn() {
    const router = useRouter();

    const dispatch = useDispatch();

    const handleSuccess = async (credentialResponse) => {
        try {
            // Decode the JWT token to get user info
            const decoded = jwtDecode(credentialResponse.credential);

            console.log(decoded, credentialResponse)

            // Send the credential to your backend

            // setButtonLoading(true);
            const data = await GoogleLoginUser({ googleToken: credentialResponse.credential });
            // console.log(data);
            if (data.success) {
                toast.success(data.message);

                await dispatch(login(data?.data));
                router.push('/')
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed: ' + error.message);
        }
    };

    const handleError = () => {
        console.log('Login Failed');
        alert('Google login failed. Please try again.');
    };




    return (
        <div className='w-full'>
            {/* Google OAuth Provider */}
            <div className="w-full flex items-center justify-center">
                <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={handleError}
                        useOneTap
                        auto_select
                        theme="filled_blue"
                        size="large"
                        text="continue_with"
                        shape="rectangular"
                    />
                </GoogleOAuthProvider>
            </div>


        </div>
    );
}