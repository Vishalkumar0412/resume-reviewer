import React from 'react'

const Loading = () => {
  return (
     <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid" />
      <p className="mt-4 text-gray-600 text-lg font-medium">Loading...</p>
    </div>
  )
}

export default Loading