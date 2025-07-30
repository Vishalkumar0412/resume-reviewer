"use client"

import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
     const {user}=useSelector((store:any) => store.auth)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
            src={user?.avatar || '/default-avatar.png'}
            alt="Profile Avatar"
            className="w-24 h-24 rounded-full shadow mb-4"
          />
          <h2 className="text-2xl font-bold mb-1">{user?.name || 'Your Name'}</h2>
          <p className="text-gray-500 mb-4">{user?.email || 'your.email@example.com'}</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Edit Profile
          </button>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-gray-700">
            {user?.bio || 'Add a short bio to let others know more about you.'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile