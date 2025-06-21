import React from 'react';
// 移除 Layout 导入
// import Layout from '../components/Layout';

export default function TestFooterPage() {
  return (
    // 移除 Layout 组件包装
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">测试页脚</h1>
      <p className="mb-4 text-gray-700">这个页面用于测试页脚是否正确跟随页面内容流动，而不是固定在窗口底部。</p>
      
      {/* 生成大量内容，以确保页面需要滚动 */}
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">测试段落 {index + 1}</h2>
          <p className="mb-4 text-gray-700">
            这是一段测试文本，用于创建足够的内容，以便页面需要滚动。这样我们可以测试页脚是否正确跟随页面内容流动，而不是固定在窗口底部。
          </p>
          <p className="mb-4 text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, 
            nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt,
            nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.
          </p>
          <p className="text-gray-700">
            当页面滚动到底部时，页脚应该出现在内容的下方，而不是始终固定在窗口底部。这样可以确保用户能够看到所有内容，
            包括页脚中的重要信息和链接。
          </p>
        </div>
      ))}
    </div>
  );
} 