import '../src/styles/globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'AI工具实验室',
  description: '探索AI工具的使用场景和最佳实践',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col bg-gray-50">
        {/* 顶部导航栏 */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-blue-600">AI工具实验室</span>
              </Link>

              {/* 桌面端导航 */}
              <nav className="hidden md:flex space-x-8">
                <NavLink href="/">首页</NavLink>
                <NavLink href="/tools">AI工具集</NavLink>
                <NavLink href="/scenarios">场景解决方案</NavLink>
                <NavLink href="/news">AI快讯</NavLink>
                <NavLink href="/prompts">提示词库</NavLink>
              </nav>

              {/* 登录按钮 */}
              <div className="hidden md:block">
                <Link href="/login" className="flex items-center text-gray-600 hover:text-blue-600">
                  登录
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* 页面主体内容 */}
        <main className="flex-grow">
          {children}
        </main>

        {/* 页脚 - 使用相对定位 */}
        <footer className="bg-white border-t border-gray-200 py-12" style={{position: 'relative', width: '100%', bottom: 'auto', left: 'auto', zIndex: 10}}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* 关于我们 */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">关于我们</h3>
                <p className="text-gray-600">
                  AI工具实验室致力于帮助用户发现、学习和应用最佳AI工具组合，提高工作效率和创造力。
                </p>
              </div>
              
              {/* 导航 */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">导航</h3>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-gray-600 hover:text-blue-600">首页</Link></li>
                  <li><Link href="/scenarios" className="text-gray-600 hover:text-blue-600">场景解决方案</Link></li>
                  <li><Link href="/news" className="text-gray-600 hover:text-blue-600">AI快讯</Link></li>
                  <li><Link href="/prompts" className="text-gray-600 hover:text-blue-600">提示词库</Link></li>
                </ul>
              </div>
              
              {/* 资源 */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">资源</h3>
                <ul className="space-y-2">
                  <li><Link href="/tutorials" className="text-gray-600 hover:text-blue-600">AI工具使用教程</Link></li>
                  <li><Link href="/guides" className="text-gray-600 hover:text-blue-600">最佳实践指南</Link></li>
                  <li><Link href="/faq" className="text-gray-600 hover:text-blue-600">常见问题</Link></li>
                </ul>
              </div>
              
              {/* 联系我们 */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">联系我们</h3>
                <ul className="space-y-2">
                  <li><Link href="/feedback" className="text-gray-600 hover:text-blue-600">提交反馈</Link></li>
                  <li><Link href="/community" className="text-gray-600 hover:text-blue-600">加入社区</Link></li>
                  <li><Link href="/cooperation" className="text-gray-600 hover:text-blue-600">合作咨询</Link></li>
                </ul>
              </div>
            </div>
            
            {/* 版权信息 */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
              <p>&copy; {new Date().getFullYear()} AI工具实验室. 保留所有权利.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}

// 导航链接组件
function NavLink({ href, children }) {
  return (
    <Link href={href} className="text-gray-600 hover:text-blue-600">
      {children}
    </Link>
  );
}
