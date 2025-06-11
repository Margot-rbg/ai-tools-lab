document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. 定义全局变量 (部分选择器已更新) ---
    const toolContainer = document.getElementById('tool-container');
    const sidebarNavContainer = document.getElementById('sidebar-nav');
    const searchInput = document.getElementById('search-input');
    const mainContentTitle = document.getElementById('main-content-title');

    let allTools = []; 
    let activeCategory = '全部';
    let searchTerm = ''; 

    // --- 图标数据 ---
    const categoryIcons = {
        'AI写作': `<svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>`,
        'AI绘画': `<svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`,
        'AI视频': `<svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>`,
        'AI编程': `<svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>`,
        '全部': `<svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>`,
        '默认': `<svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>`
    };
    
    // 新增！定义哪些分类需要显示'>'箭头
    const categoriesWithSubmenu = ['AI绘画', 'AI办公工具', 'AI音频工具']; // 你可以根据你的分类自行增删

    // --- 渲染工具卡片的函数 (不变) ---
    const renderTools = (tools) => {
        // ... 这部分函数内容和之前完全一样，无需改动 ...
        toolContainer.innerHTML = '';
        if (tools.length === 0) {
            toolContainer.innerHTML = `<p class="text-gray-500 text-center col-span-full">未找到相关的AI工具。</p>`;
            return;
        }
        tools.forEach(tool => {
            const tagsHTML = tool.tags.map(tag => `<span class="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-1 rounded-full">${tag}</span>`).join('');
            const cardHTML = `<div class="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"><a href="${tool.url}" target="_blank" class="p-6 flex-grow"><div class="flex items-center mb-4"><div class="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0 border border-gray-100"><img src="${tool.logo}" alt="${tool.name} logo" class="w-full h-full object-cover"></div><h3 class="text-lg font-semibold tracking-tight text-gray-900">${tool.name}</h3></div><p class="text-sm text-gray-600 mb-4" style="min-height: 60px;">${tool.description}</p></a><div class="px-6 pt-2 pb-4 border-t border-gray-100"><div class="flex flex-wrap items-center">${tagsHTML}</div></div></div>`;
            toolContainer.innerHTML += cardHTML;
        });
    };

    // --- 统一的筛选和渲染函数 (不变) ---
    const filterAndRender = () => {
        // ... 这部分函数内容和之前完全一样，无需改动 ...
        let filteredTools = allTools;
        if (activeCategory !== '全部') {
            filteredTools = filteredTools.filter(tool => tool.category === activeCategory);
        }
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            filteredTools = filteredTools.filter(tool => tool.name.toLowerCase().includes(lowerCaseSearchTerm) || tool.description.toLowerCase().includes(lowerCaseSearchTerm) || tool.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm)));
        }
        mainContentTitle.textContent = activeCategory; 
        renderTools(filteredTools);
    };

    // --- 设置侧边栏导航链接的函数 (重大修改) ---
    const setupSidebarNav = () => {
        const categories = ['全部', ...new Set(allTools.map(tool => tool.category))];
        
        sidebarNavContainer.innerHTML = '';
        categories.forEach(category => {
            const link = document.createElement('a');
            link.href = '#';
            link.dataset.category = category; 
            
            // 新的侧边栏链接样式
            link.className = 'sidebar-link flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200';
            
            const iconHTML = categoryIcons[category] || categoryIcons['默认'];
            let linkContent = `<div class="flex items-center">${iconHTML}<span>${category}</span></div>`;

            // 如果当前分类需要显示箭头，则添加箭头图标
            if (categoriesWithSubmenu.includes(category)) {
                linkContent += `<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>`;
            }

            link.innerHTML = linkContent;
            
            if (category === activeCategory) {
                link.classList.add('bg-blue-100', 'text-blue-700', 'font-semibold');
            }

            link.addEventListener('click', (e) => {
                e.preventDefault(); 
                activeCategory = category;
                searchInput.value = '';
                searchTerm = '';

                document.querySelectorAll('.sidebar-link').forEach(l => {
                    l.classList.remove('bg-blue-100', 'text-blue-700', 'font-semibold');
                });
                link.classList.add('bg-blue-100', 'text-blue-700', 'font-semibold');

                filterAndRender();
            });

            sidebarNavContainer.appendChild(link);
        });
    };
    
    // --- 设置搜索框的事件监听 (不变) ---
    const setupSearch = () => {
        // ... 这部分函数内容和之前完全一样，无需改动 ...
        searchInput.addEventListener('input', (event) => {
            searchTerm = event.target.value.trim();
            filterAndRender();
        });
    };

    // --- 初始加载数据 ---
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            allTools = data;
            setupSidebarNav(); 
            setupSearch();
            filterAndRender();
        })
        .catch(error => {
            console.error('加载数据时出错:', error);
            toolContainer.innerHTML = `<p class="text-red-500 text-center col-span-full">${error.message}</p>`;
        });
});