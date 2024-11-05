'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import {toast} from 'react-hot-toast';

export default function Signup() {

  const [user, setUser] = useState({
    email: '',
    password: '',
    username: ''
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log('Signup success.', response.data);
      router.push('/login');
      
    } catch (error: any) {
      console.log('Signup fail.');
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 '>
      <h1>{loading ? "Processing" : "signup"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input 
      type='text'
      id='username'
      value={user.username}
      onChange={(e) => setUser({...user, username: e.target.value})}
      placeholder='username'
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      />
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
      onClick={onSignup} 
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>
        {buttonDisabled ? "No signup" : "Signup"}
      </button>
      <Link href='/login'>Visit login page</Link>
    </div>
  )
}