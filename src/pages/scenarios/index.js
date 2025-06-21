import React, { useState } from 'react';
import Link from 'next/link';
import { FaSearch, FaTags, FaChevronRight } from 'react-icons/fa';
import Layout from '../../components/Layout';

export default function ScenariosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');

  // 场景数据
  const scenarios = [
    {
      id: 'content-creation',
      title: 'AI辅助内容创作流程',
      description: '结合多种AI工具，高效完成从创意发想到内容生成、编辑和优化的全流程',
      category: '内容创作',
      tags: ['文案写作', '博客', '社交媒体', '内容营销'],
      tools: ['ChatGPT', 'Claude', 'Midjourney', 'Grammarly'],
      image: '/images/scenarios/content-creation.jpg',
      featured: true
    },
    {
      id: 'data-analysis',
      title: 'AI驱动的数据分析与可视化',
      description: '利用AI工具快速处理数据，生成洞察，并创建专业的数据可视化报告',
      category: '数据分析',
      tags: ['数据处理', '可视化', '报告生成', '洞察挖掘'],
      tools: ['ChatGPT', 'Excel GPT', 'Tableau', 'PowerBI'],
      image: '/images/scenarios/data-analysis.jpg',
      featured: true
    },
    {
      id: 'code-development',
      title: '智能编程助手工作流',
      description: '使用AI编程工具加速代码开发，提高代码质量，减少调试时间',
      category: '编程开发',
      tags: ['代码生成', '代码优化', '调试', '文档生成'],
      tools: ['GitHub Copilot', 'ChatGPT', 'Tabnine', 'Replit'],
      image: '/images/scenarios/code-development.jpg',
      featured: false
    },
    {
      id: 'design-workflow',
      title: 'AI辅助设计工作流',
      description: '将AI图像生成工具融入设计流程，提升创意效率和设计质量',
      category: '设计创意',
      tags: ['UI设计', '平面设计', '创意生成', '品牌设计'],
      tools: ['Midjourney', 'DALL-E', 'Figma', 'Canva'],
      image: '/images/scenarios/design-workflow.jpg',
      featured: false
    },
    {
      id: 'video-production',
      title: 'AI视频制作全流程',
      description: '利用AI工具简化视频制作流程，从脚本生成到视频渲染',
      category: '视频制作',
      tags: ['脚本生成', '视频编辑', '字幕生成', '配音'],
      tools: ['ChatGPT', 'Runway', 'Descript', 'Synthesia'],
      image: '/images/scenarios/video-production.jpg',
      featured: false
    },
    {
      id: 'marketing-automation',
      title: 'AI营销自动化解决方案',
      description: '构建AI驱动的营销自动化流程，提高转化率和客户参与度',
      category: '营销推广',
      tags: ['内容生成', '社交媒体', '邮件营销', '广告创意'],
      tools: ['ChatGPT', 'Copy.ai', 'Jasper', 'MarketMuse'],
      image: '/images/scenarios/marketing-automation.jpg',
      featured: false
    },
    {
      id: 'research-assistant',
      title: 'AI研究助手工作流',
      description: '使用AI工具加速研究过程，从文献综述到数据分析和论文写作',
      category: '学术研究',
      tags: ['文献检索', '数据分析', '论文写作', '参考文献管理'],
      tools: ['ChatGPT', 'Elicit', 'Scholarcy', 'Zotero'],
      image: '/images/scenarios/research-assistant.jpg',
      featured: false
    },
    {
      id: 'customer-service',
      title: 'AI客户服务解决方案',
      description: '整合AI聊天机器人和客户服务工具，提供24/7全天候客户支持',
      category: '客户服务',
      tags: ['聊天机器人', '客户支持', '工单管理', '知识库'],
      tools: ['ChatGPT', 'Intercom', 'Zendesk', 'Freshdesk'],
      image: '/images/scenarios/customer-service.jpg',
      featured: false
    }
  ];

  // 所有类别
  const categories = ['全部', ...new Set(scenarios.map(scenario => scenario.category))];

  // 所有标签
  const allTags = [...new Set(scenarios.flatMap(scenario => scenario.tags))];

  // 过滤场景
  const filteredScenarios = scenarios.filter(scenario => {
    const matchesSearch = 
      scenario.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      scenario.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scenario.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === '全部' || scenario.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // 获取特色场景
  const featuredScenarios = scenarios.filter(scenario => scenario.featured);

  return (
    <Layout pageType="scenario" title="场景解决方案 - AI工具实验室" description="探索AI工具的最佳组合和使用流程，解决各种工作场景的实际问题">
      <div className="container mx-auto px-4 py-8">
        {/* 标题部分 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">场景解决方案</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            探索AI工具的最佳组合和使用流程，解决各种工作场景的实际问题
          </p>
        </div>

        {/* 特色场景 */}
        {featuredScenarios.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">推荐场景</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredScenarios.map(scenario => (
                <Link href={`/scenarios/${scenario.id}`} key={scenario.id}>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full">
                    <div className="h-48 bg-gray-100 relative">
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        {/* 实际项目中应替换为真实图片 */}
                        <div className="text-center p-4">
                          <div className="text-xl font-bold">{scenario.title}</div>
                          <div className="text-sm">图片加载中</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {scenario.category}
                        </span>
                        {scenario.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                        {scenario.tags.length > 2 && (
                          <span className="text-xs text-gray-500">+{scenario.tags.length - 2}个标签</span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{scenario.title}</h3>
                      <p className="text-gray-600 mb-4">{scenario.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          推荐工具: {scenario.tools.slice(0, 2).join(', ')}
                          {scenario.tools.length > 2 ? ` 等${scenario.tools.length}个` : ''}
                        </div>
                        <span className="text-blue-600 flex items-center">
                          查看详情 <FaChevronRight className="ml-1 text-sm" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 搜索和过滤部分 */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* 搜索框 */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="搜索场景解决方案..."
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
              <FaTags className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          {/* 过滤结果统计 */}
          <p className="text-gray-600">
            显示 {filteredScenarios.length} 个场景解决方案 
            {selectedCategory !== '全部' ? ` 在 "${selectedCategory}" 类别中` : ''}
            {searchTerm ? ` 匹配 "${searchTerm}"` : ''}
          </p>
        </div>

        {/* 标签云 */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-3">热门标签:</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                onClick={() => setSearchTerm(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 场景列表 */}
        {filteredScenarios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScenarios.map(scenario => (
              <Link href={`/scenarios/${scenario.id}`} key={scenario.id}>
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <div className="h-40 bg-gray-100 relative">
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      {/* 实际项目中应替换为真实图片 */}
                      <div className="text-center p-4">
                        <div className="text-lg font-bold">{scenario.title}</div>
                        <div className="text-sm">图片加载中</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {scenario.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{scenario.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{scenario.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        {scenario.tools.slice(0, 3).join(', ')}
                        {scenario.tools.length > 3 ? ' 等' : ''}
                      </div>
                      <span className="text-blue-600 text-sm flex items-center">
                        查看详情 <FaChevronRight className="ml-1 text-xs" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-xl text-gray-600">没有找到匹配的场景解决方案</p>
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

        {/* 提交场景建议 */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">没有找到您需要的场景解决方案？</h2>
          <p className="text-gray-600 mb-6">
            提交您的场景需求，我们的专家团队将为您定制AI工具组合和使用流程建议。
          </p>
          <Link href="/submit-scenario" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block">
            提交场景需求
          </Link>
        </div>
      </div>
    </Layout>
  );
} 