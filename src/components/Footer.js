import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
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
          <p>&copy; 2025 AI工具实验室. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 