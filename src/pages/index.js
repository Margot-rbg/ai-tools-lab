import React from 'react';
import Link from 'next/link';
import { FaTools, FaLightbulb, FaNewspaper, FaBook } from 'react-icons/fa';
import Layout from '../components/Layout';

export default function HomePage() {
  return (
    <Layout pageType="home">
      {/* 英雄区域 */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            发现AI工具的无限可能
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            探索、学习和分享最前沿的AI工具，提升工作效率，激发创意灵感
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/tools" className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium text-lg">
              浏览AI工具
            </Link>
            <Link href="/scenarios" className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-700 px-8 py-3 rounded-lg font-medium text-lg transition-colors">
              场景解决方案
            </Link>
          </div>
        </div>
      </section>

      {/* 主要功能区 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">探索AI工具实验室</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<FaTools className="text-blue-500" />}
              title="AI工具集"
              description="精选各类AI工具，包含详细介绍、使用指南和账号共享服务"
              link="/tools"
            />
            <FeatureCard 
              icon={<FaLightbulb className="text-yellow-500" />}
              title="场景解决方案"
              description="针对不同工作场景的AI工具组合推荐和使用流程"
              link="/scenarios"
            />
            <FeatureCard 
              icon={<FaNewspaper className="text-green-500" />}
              title="AI快讯"
              description="最新AI工具动态、更新和行业趋势分析"
              link="/news"
            />
            <FeatureCard 
              icon={<FaBook className="text-purple-500" />}
              title="提示词库"
              description="精选高效提示词模板，帮助获得更好的AI生成内容"
              link="/prompts"
            />
          </div>
        </div>
      </section>

      {/* 热门工具 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">热门AI工具</h2>
            <Link href="/tools" className="text-blue-600 hover:text-blue-800">
              查看全部 →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 这里可以放置热门工具卡片 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-2">ChatGPT</h3>
              <p className="text-gray-600 mb-4">强大的对话式AI助手，可用于文本生成、问答和创意写作</p>
              <Link href="/tools/chatgpt" className="text-blue-600 hover:underline">了解更多</Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-2">Midjourney</h3>
              <p className="text-gray-600 mb-4">AI图像生成工具，通过文本提示创建高质量艺术作品</p>
              <Link href="/tools/midjourney" className="text-blue-600 hover:underline">了解更多</Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-2">GitHub Copilot</h3>
              <p className="text-gray-600 mb-4">AI编程助手，提供代码补全和建议，提高开发效率</p>
              <Link href="/tools/github-copilot" className="text-blue-600 hover:underline">了解更多</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 热门场景 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">热门场景解决方案</h2>
            <Link href="/scenarios" className="text-blue-600 hover:text-blue-800">
              查看全部 →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mb-4">
                内容创作
              </span>
              <h3 className="text-xl font-bold mb-2">AI辅助内容创作流程</h3>
              <p className="text-gray-600 mb-4">
                结合多种AI工具，高效完成从创意发想到内容生成、编辑和优化的全流程
              </p>
              <Link href="/scenarios/content-creation" className="text-blue-600 hover:underline">查看详情</Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm mb-4">
                数据分析
              </span>
              <h3 className="text-xl font-bold mb-2">AI驱动的数据分析与可视化</h3>
              <p className="text-gray-600 mb-4">
                利用AI工具快速处理数据，生成洞察，并创建专业的数据可视化报告
              </p>
              <Link href="/scenarios/data-analysis" className="text-blue-600 hover:underline">查看详情</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 订阅区域 */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">获取最新AI工具资讯</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            订阅我们的通讯，获取最新AI工具更新、使用技巧和独家优惠
          </p>
          
          <div className="max-w-md mx-auto flex">
            <input 
              type="email" 
              placeholder="输入您的邮箱地址" 
              className="flex-grow px-4 py-3 rounded-l-lg border border-r-0 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-colors">
              订阅
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// 特性卡片组件
function FeatureCard({ icon, title, description, link }) {
  return (
    <Link href={link}>
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
        <div className="text-3xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        <span className="text-blue-600 mt-2">了解更多 →</span>
      </div>
    </Link>
  );
} 