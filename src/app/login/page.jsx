"use client";
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import GoogleSignIn from '@/components/google/googleLogin';
import { useSelector } from 'react-redux';

export default function Login() {
  const router = useRouter();
  const {isUser} = useSelector(state => state.auth);

  useEffect(() => {
    if(isUser) return router.push('/');
  },[router,isUser])





  return (
    <div className="flex justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-6"
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-extrabold text-center"
        >
          Welcome Back
        </motion.h2>

      
        <GoogleSignIn />

      </motion.div>
    </div>
  );
}
