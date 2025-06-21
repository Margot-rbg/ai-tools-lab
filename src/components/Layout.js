import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaHome, FaTools, FaLightbulb, FaNewspaper, FaBook, FaUser } from 'react-icons/fa';
import Footer from './Footer';

export default function Layout({ children, title = 'AI工具实验室', description = '探索AI工具的使用场景和最佳实践', pageType = 'default' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col bg-gray-50">
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
                <NavLink href="/" icon={<FaHome />} active={pageType === 'home'}>
                  首页
                </NavLink>
                <NavLink href="/tools" icon={<FaTools />} active={pageType === 'tool'}>
                  AI工具集
                </NavLink>
                <NavLink href="/scenarios" icon={<FaLightbulb />} active={pageType === 'scenario'}>
                  场景解决方案
                </NavLink>
                <NavLink href="/news" icon={<FaNewspaper />} active={pageType === 'news'}>
                  AI快讯
                </NavLink>
                <NavLink href="/prompts" icon={<FaBook />} active={pageType === 'prompt'}>
                  提示词库
                </NavLink>
              </nav>

              {/* 登录按钮 */}
              <div className="hidden md:block">
                <Link href="/login" className="flex items-center text-gray-600 hover:text-blue-600">
                  <FaUser className="mr-1" /> 登录
                </Link>
              </div>

              {/* 移动端菜单按钮 */}
              <div className="md:hidden">
                <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* 页面主体内容 */}
        <main className="flex-grow">
          {children}
        </main>

        {/* 页脚 - 使用Footer组件 */}
        <Footer />
      </div>
    </>
  );
}

// 导航链接组件
function NavLink({ href, children, icon, active }) {
  return (
    <Link href={href} className={`flex items-center ${active ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </Link>
  );
} 