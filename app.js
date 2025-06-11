document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 使用fetch API异步读取data.json文件
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('无法获取数据文件');
        }
        const tools = await response.json();
        
        // 获取工具容器
        const toolContainer = document.getElementById('tool-container');
        
        // 为每个工具创建卡片
        tools.forEach(tool => {
            // 创建卡片容器
            const card = document.createElement('div');
            card.className = 'bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-transform hover:shadow-lg hover:scale-105';
            
            // 创建图片区域
            const imageLink = document.createElement('a');
            imageLink.href = tool.url;
            imageLink.target = '_blank';
            imageLink.className = 'block p-4 flex justify-center';
            
            const image = document.createElement('img');
            image.src = tool.logo;
            image.alt = `${tool.name} 图标`;
            image.className = 'h-24 object-contain';
            
            imageLink.appendChild(image);
            
            // 创建卡片内容区域
            const cardContent = document.createElement('div');
            cardContent.className = 'p-4 pt-0';
            
            // 创建标题
            const titleLink = document.createElement('a');
            titleLink.href = tool.url;
            titleLink.target = '_blank';
            titleLink.className = 'hover:text-blue-600';
            
            const title = document.createElement('h3');
            title.textContent = tool.name;
            title.className = 'text-lg font-semibold mb-2 text-gray-800';
            
            titleLink.appendChild(title);
            
            // 创建描述
            const description = document.createElement('p');
            description.textContent = tool.description;
            description.className = 'text-gray-600 text-sm';
            
            // 组装卡片
            cardContent.appendChild(titleLink);
            cardContent.appendChild(description);
            
            card.appendChild(imageLink);
            card.appendChild(cardContent);
            
            // 将卡片添加到容器中
            toolContainer.appendChild(card);
        });
        
    } catch (error) {
        console.error('加载工具数据失败:', error);
        const toolContainer = document.getElementById('tool-container');
        toolContainer.innerHTML = `<div class="col-span-full text-center p-8 text-red-500">
            <p>加载数据时出错: ${error.message}</p>
        </div>`;
    }
});
