import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight, FaTools, FaLightbulb, FaChartLine, FaRocket } from 'react-icons/fa';
import Layout from '../../components/Layout';

// 自定义布局，可以完全控制页脚
const getCustomLayout = (page) => {
  return (
    <Layout 
      title="AI辅助内容创作全流程 - AI工具实验室" 
      description="从构思到成文，利用AI工具高效创作高质量内容，包括文章、博客和社交媒体帖子"
      pageType="scenario"
      simplifiedFooter={true} // 使用简化版页脚
    >
      {page}
    </Layout>
  );
};

export default function ContentCreationScenario() {
  // 定义工作流程步骤
  const workflowSteps = [
    {
      id: 1,
      title: '主题构思',
      icon: <FaLightbulb className="text-4xl text-yellow-400" />,
      description: '使用AI工具生成内容创意和大纲'
    },
    {
      id: 2,
      title: '内容撰写',
      icon: <FaTools className="text-4xl text-blue-400" />,
      description: '利用AI辅助写作和扩充内容'
    },
    {
      id: 3,
      title: '润色优化',
      icon: <FaChartLine className="text-4xl text-green-400" />,
      description: '使用AI工具改进文风、语法和结构'
    },
    {
      id: 4,
      title: '配图与发布',
      icon: <FaRocket className="text-4xl text-purple-400" />,
      description: '生成配图并准备发布到各平台'
    }
  ];

  // 推荐工具组合
  const recommendedTools = [
    {
      name: 'ChatGPT',
      description: '用于内容构思、大纲生成和初稿撰写',
      category: '文本生成',
      link: '/tools/chatgpt'
    },
    {
      name: 'Claude',
      description: '擅长长文本创作和内容优化',
      category: '文本生成',
      link: '/tools/claude'
    },
    {
      name: 'Midjourney',
      description: '生成高质量配图',
      category: '图像生成',
      link: '/tools/midjourney'
    },
    {
      name: 'Grammarly',
      description: '检查语法和拼写错误',
      category: '文本优化',
      link: '/tools/grammarly'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* 返回链接 */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/scenarios" className="flex items-center text-blue-400 hover:text-blue-300 mb-4">
          <FaArrowLeft className="mr-2" /> 所有场景
        </Link>
      </div>

      {/* 场景标题和描述 */}
      <div className="bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AI辅助内容创作全流程</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            从构思到成文，利用AI工具高效创作高质量内容，包括文章、博客和社交媒体帖子。
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">内容创作</span>
            <span className="bg-purple-600 px-3 py-1 rounded-full text-sm">写作</span>
            <span className="bg-green-600 px-3 py-1 rounded-full text-sm">博客</span>
          </div>
        </div>
      </div>

      {/* 工作流程 */}
      <div className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">工作流程</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step) => (
              <div key={step.id} className="bg-gray-800 p-6 rounded-xl text-center">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 推荐工具组合 */}
      <div className="py-16 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">推荐工具组合</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {recommendedTools.map((tool, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                <span className="inline-block bg-blue-900 px-2 py-1 rounded text-xs mb-3">{tool.category}</span>
                <p className="text-gray-400 mb-4">{tool.description}</p>
                <Link href={tool.link} className="text-blue-400 hover:text-blue-300 flex items-center">
                  了解更多 <FaArrowRight className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 使用指南 */}
      <div className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">内容创作指南</h2>
          <div className="bg-gray-800 p-8 rounded-xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">第一步：主题构思与大纲生成</h3>
            <p className="text-gray-300 mb-6">
              使用ChatGPT或Claude等AI工具帮助你进行头脑风暴，生成内容创意和大纲。提供你的目标受众、行业和主题，让AI帮你拓展思路。
            </p>
            
            <div className="bg-gray-700 p-4 rounded-lg mb-8">
              <p className="text-sm text-gray-400 mb-2">提示词示例：</p>
              <p className="text-gray-200">
                "我需要为[目标受众]创建关于[主题]的内容。请帮我生成5个有吸引力的标题和每个标题的详细大纲，包括引言、主要观点和结论。"
              </p>
            </div>

            <h3 className="text-2xl font-bold mb-4">第二步：内容撰写</h3>
            <p className="text-gray-300 mb-6">
              将大纲输入到AI工具中，让它帮助你扩展每个部分。你可以逐段生成内容，或者提供更详细的指导让AI一次性生成完整草稿。
            </p>
            
            <div className="bg-gray-700 p-4 rounded-lg mb-8">
              <p className="text-sm text-gray-400 mb-2">提示词示例：</p>
              <p className="text-gray-200">
                "基于以下大纲，请帮我撰写一篇详细的文章。使用专业但易懂的语言，包含具体例子和数据支持。大纲：[粘贴你的大纲]"
              </p>
            </div>

            <h3 className="text-2xl font-bold mb-4">第三步：润色与优化</h3>
            <p className="text-gray-300 mb-6">
              使用AI工具改进文章的流畅度、语法和结构。你可以要求AI以特定风格重写内容，或者优化SEO关键词。
            </p>
            
            <div className="bg-gray-700 p-4 rounded-lg mb-8">
              <p className="text-sm text-gray-400 mb-2">提示词示例：</p>
              <p className="text-gray-200">
                "请帮我优化以下内容，使其更加引人入胜。改进段落之间的过渡，确保逻辑流畅，并优化以下关键词的使用：[关键词列表]"
              </p>
            </div>

            <h3 className="text-2xl font-bold mb-4">第四步：配图生成与发布准备</h3>
            <p className="text-gray-300 mb-6">
              使用Midjourney等AI图像生成工具创建与内容相关的高质量配图。准备不同版本的内容，适应各个发布平台。
            </p>
            
            <div className="bg-gray-700 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-400 mb-2">提示词示例：</p>
              <p className="text-gray-200">
                "为一篇关于[主题]的文章创建一张引人注目的特色图片。图片应该包含[具体元素]，风格为[描述风格]，明亮清晰，适合作为博客封面。"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 相关场景 */}
      <div className="py-16 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">相关场景</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/scenarios/social-media-management" className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition">
              <h3 className="text-xl font-bold mb-2">社交媒体管理</h3>
              <p className="text-gray-400">使用AI工具管理多平台社交媒体内容，提高参与度和影响力</p>
            </Link>
            <Link href="/scenarios/seo-optimization" className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition">
              <h3 className="text-xl font-bold mb-2">SEO内容优化</h3>
              <p className="text-gray-400">利用AI工具创建对搜索引擎友好的内容，提升网站排名</p>
            </Link>
            <Link href="/scenarios/content-repurposing" className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition">
              <h3 className="text-xl font-bold mb-2">内容改编与复用</h3>
              <p className="text-gray-400">将现有内容转换为多种格式，最大化内容价值</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// 为页面添加自定义布局
ContentCreationScenario.getLayout = getCustomLayout; 