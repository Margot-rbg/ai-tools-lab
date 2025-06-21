import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-6xl font-extrabold text-gray-900">404</h1>
        <h2 className="mt-6 text-3xl font-bold text-gray-900">页面未找到</h2>
        <p className="mt-2 text-sm text-gray-600">
          您请求的页面不存在或已被移除
        </p>
        <div className="mt-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            返回首页
          </Link>
        </div>
      </div>
    </div>
  )
} 