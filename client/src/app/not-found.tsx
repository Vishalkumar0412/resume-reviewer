// pages/404.tsx
import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl mt-4 mb-6 text-gray-700">Oops! Page not found.</p>
      <Link href="/">
        <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Go back home
        </button>
      </Link>
    </div>
  )
}
