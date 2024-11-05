'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("");

    const getUserDetails = async () => {
        const res = await axios.post('/api/users/me')
        console.log(res);
        
        setData(res.data.data._id)
    }

    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success("logout success")
            router.push('login')
        } catch (error: any) {
            console.log(error.message);
            
        }
    }
  return (
    <div className='flex flex-col items-center
    justify-center min-h-screen py-2'>
        <h1>Profile page</h1>
        <hr />
        <h2>{data == "" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <hr />
        <button
        onClick={logout}
        className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
            logout
        </button>
        <button
        onClick={logout}
        className='bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
        >
            User details
        </button>
    </div>
  )
}

