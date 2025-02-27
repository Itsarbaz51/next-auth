'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import {toast} from 'react-hot-toast';

export default function LoginPage() {

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log('Signup success.', response.data);
      router.push('/profile');
      
    } catch (error: any) {
      console.log('Signup fail.');
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 '>
      <h1>{loading ? "Processing" : "signup"}</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
      type='text'
      id='email'
      value={user.email}
      onChange={(e) => setUser({...user, email: e.target.value})}
      placeholder='email'
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      />
      <label htmlFor="password">password</label>
      <input
      type='password'
      id='password'
      value={user.password}
      onChange={(e) => setUser({...user, password: e.target.value})}
      placeholder='password'
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      />
      <button 
      onClick={onLogin} 
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>
        {buttonDisabled ? "No login" : "login"}
      </button>
      <Link href='/signup'>Visit signup page</Link>
    </div>
  )
}