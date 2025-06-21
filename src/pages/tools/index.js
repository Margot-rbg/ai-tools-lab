import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaSearch, FaArrowRight, FaStar, FaFilter, FaRegStar, FaSort } from 'react-icons/fa';
import Layout from '../../components/Layout';

// AI工具数据
const tools = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'OpenAI开发的对话式AI助手，可以回答问题、生成内容、辅助编程等',
    category: '文本生成',
    rating: 4.8,
    pricing: '免费版/Plus版($20/月)',
    image: '/images/chatgpt.png',
    link: '/tools/chatgpt'
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropic开发的AI助手，擅长长文本处理、内容创作和复杂任务',
    category: '文本生成',
    rating: 4.7,
    pricing: '免费版/Claude Pro($20/月)',
    image: '/images/claude.png',
    link: '/tools/claude'
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: '强大的AI图像生成工具，可以根据文本描述创建高质量艺术图像',
    category: '图像生成',
    rating: 4.9,
    pricing: '$10-$60/月',
    image: '/images/midjourney.png',
    link: '/tools/midjourney'
  },
  {
    id: 'dalle',
    name: 'DALL-E',
    description: 'OpenAI开发的AI图像生成系统，可以创建逼真和创意图像',
    category: '图像生成',
    rating: 4.6,
    pricing: '信用点数制',
    image: '/images/dalle.png',
    link: '/tools/dalle'
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    description: '基于AI的编程助手，可以提供代码建议和自动完成功能',
    category: '编程工具',
    rating: 4.7,
    pricing: '$10/月或$100/年',
    image: '/images/copilot.png',
    link: '/tools/copilot'
  },
  {
    id: 'jasper',
    name: 'Jasper',
    description: '专业AI写作助手，擅长营销内容和商业文案创作',
    category: '文本生成',
    rating: 4.5,
    pricing: '$39-$99/月',
    image: '/images/jasper.png',
    link: '/tools/jasper'
  },
  {
    id: 'runway',
    name: 'Runway',
    description: '创意视频编辑和生成平台，提供多种AI视觉效果工具',
    category: '视频编辑',
    rating: 4.6,
    pricing: '$15-$95/月',
    image: '/images/runway.png',
    link: '/tools/runway'
  },
  {
    id: 'synthesia',
    name: 'Synthesia',
    description: 'AI视频生成平台，可以创建逼真的AI人物视频',
    category: '视频生成',
    rating: 4.4,
    pricing: '$30/月起',
    image: '/images/synthesia.png',
    link: '/tools/synthesia'
  }
];

// 工具类别
const categories = [
  '全部',
  '文本生成',
  '图像生成',
  '编程工具',
  '视频编辑',
  '视频生成',
  '音频处理',
  '数据分析'
];

export default function ToolsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [sortBy, setSortBy] = useState('推荐');
  const [filteredTools, setFilteredTools] = useState([]);

  const sortOptions = ['推荐', '评分最高', '价格最低', '最新添加'];

  useEffect(() => {
    // 过滤和排序工具
    let results = [...tools];
    
    // 按类别过滤
    if (selectedCategory !== '全部') {
      results = results.filter(tool => tool.category === selectedCategory);
    }
    
    // 按搜索词过滤
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      results = results.filter(
        tool => 
          tool.name.toLowerCase().includes(lowercasedSearch) || 
          tool.description.toLowerCase().includes(lowercasedSearch)
      );
    }
    
    // 排序
    switch(sortBy) {
      case '评分最高':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case '价格最低':
        // 简化的价格排序逻辑，实际应用中可能需要更复杂的处理
        results.sort((a, b) => {
          const aPrice = a.pricing.includes('免费') ? 0 : 999;
          const bPrice = b.pricing.includes('免费') ? 0 : 999;
          return aPrice - bPrice;
        });
        break;
      case '最新添加':
        // 假设ID越大表示越新添加
        results.sort((a, b) => b.id - a.id);
        break;
      default: // 推荐排序，可以根据自定义逻辑实现
        break;
    }
    
    setFilteredTools(results);
  }, [searchTerm, selectedCategory, sortBy, tools]);

  // 渲染星级评分
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400 opacity-50" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    
    return <div className="flex items-center">{stars} <span className="ml-1 text-sm">({rating})</span></div>;
  };

  return (
    <Layout 
      title="AI工具目录 - AI工具实验室" 
      description="探索和比较各种AI工具，找到最适合你需求的解决方案。我们提供详细的功能介绍、使用指南和账号共享服务"
      pageType="tool"
    >
      <div className="container mx-auto px-4 py-8">
        {/* 标题部分 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">AI 工具库</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            探索我们精心挑选的AI工具集合，助力您的创意和工作流程。从文本生成到图像创作，从编程助手到视频制作，这里有适合各种需求的AI工具。
          </p>
        </div>
        
        {/* 搜索和过滤部分 */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* 搜索框 */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="搜索AI工具..."
                className="w-full p-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            {/* 类别过滤 */}
            <div className="relative min-w-[200px]">
              <select
                className="w-full p-3 pl-10 pr-4 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            {/* 排序选项 */}
            <div className="relative min-w-[200px]">
              <select
                className="w-full p-3 pl-10 pr-4 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          {/* 过滤结果统计 */}
          <p className="text-gray-600">
            显示 {filteredTools.length} 个工具 {selectedCategory !== '全部' ? `在 "${selectedCategory}" 类别中` : ''}
            {searchTerm ? ` 匹配 "${searchTerm}"` : ''}
          </p>
        </div>
        
        {/* 工具卡片网格 */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <Link href={tool.link} key={tool.id}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <div className="h-48 bg-gray-100 relative">
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      {/* 实际项目中应替换为真实图片 */}
                      <div className="text-center p-4">
                        <div className="text-3xl font-bold">{tool.name}</div>
                        <div className="text-sm">图片加载中</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{tool.name}</h3>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {tool.category}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 flex-grow">{tool.description}</p>
                    <div className="mt-auto">
                      {renderRating(tool.rating)}
                      <div className="mt-2 text-sm text-gray-500">{tool.pricing}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-xl text-gray-600">没有找到匹配的工具</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('全部');
              }}
            >
              清除过滤条件
            </button>
          </div>
        )}
        
        {/* 个性化推荐部分 */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">个性化AI工具推荐</h2>
          <p className="text-gray-600 mb-6">
            根据您的使用习惯和需求，我们可以为您提供更精准的AI工具推荐。告诉我们您的工作领域和目标，获取定制化建议。
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="输入您的邮箱" 
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              获取个性化推荐
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
} 