document.addEventListener('DOMContentLoaded', () => {

    // --- 1. 定义全局变量 ---
    const toolContainer = document.getElementById('tool-container');
    const sidebarNavContainer = document.getElementById('sidebar-nav');
    const searchInput = document.getElementById('search-input');
    const mainContentTitle = document.getElementById('main-content-title');
    const tabFiltersContainer = document.getElementById('tab-filters');

    let allTools = [];
    let activeCategory = '全部';
    let activeSubCategory = '常用'; // 新增：当前激活的子分类状态
    let searchTerm = '';

    // --- 图标数据 ---
    // --- 图标数据 (V2.0 丰富版) ---
    const categoryIcons = {
        '全部': `<svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>`,
        'AI办公': `<svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>`,
        'AI写作': `<svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>`,
        'AI视频': `<svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>`,
        'AI绘画': `<svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536l12.232-12.232z"></path></svg>`,
        'AI平台': `<svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m-9 9h18"></path></svg>`,
        'AI音频': `<svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.858 15.858a5 5 0 01-2.828-7.072m9.9 9.9l-2.828-2.828"></path></svg>`,
        'AI营销': `<svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.875 9.168-3.971l-1.832 9.42M12 12.583l4.25 4.25M12 12.583l-4.25 4.25"></path></svg>`,
        'AI硬件': `<svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 5V3m0 18v-2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M5.64 5.64L4.22 4.22M19.78 18.36l-1.42-1.42M9 12a3 3 0 116 0 3 3 0 01-6 0z"></path></svg>`,
        'AI设计': `<svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`,
        'AI编程': `<svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>`,
        'AI对话': `<svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>`,
        'AI搜索': `<svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>`,
        '默认': `<svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>`
    };
    const categoriesWithSubmenu = ['AI绘画', 'AI办公工具', 'AI音频工具'];

    // --- 渲染工具卡片的函数 ---
    const renderTools = (tools) => {
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

    // --- 核心！升级后的统一筛选和渲染函数 ---
    const filterAndRender = () => {
        let filteredTools = allTools;

        // 第一步：按侧边栏主分类筛选
        if (activeCategory !== '全部') {
            filteredTools = filteredTools.filter(tool => tool.category === activeCategory);
        }
        
        // 第二步：按顶部子分类标签筛选
        if (activeSubCategory !== '全部') { 
            filteredTools = filteredTools.filter(tool => tool.subCategory === activeSubCategory);
        }

        // 第三步：在以上结果上，按搜索词筛选
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            filteredTools = filteredTools.filter(tool =>
                tool.name.toLowerCase().includes(lowerCaseSearchTerm) ||
                tool.description.toLowerCase().includes(lowerCaseSearchTerm) ||
                tool.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm))
            );
        }

        // 更新大标题
        mainContentTitle.textContent = activeCategory === '全部' ? activeSubCategory : `${activeCategory} - ${activeSubCategory}`;
        renderTools(filteredTools);
    };

    // --- 设置侧边栏导航链接的函数 ---
    const setupSidebarNav = () => {
        const categories = ['全部', ...new Set(allTools.map(tool => tool.category))];
        sidebarNavContainer.innerHTML = '';
        categories.forEach(category => {
            const link = document.createElement('a');
            link.href = '#';
            link.dataset.category = category;
            link.className = 'sidebar-link flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200';
            
            const iconHTML = categoryIcons[category] || categoryIcons['默认'];
            let linkContent = `<div class="flex items-center">${iconHTML}<span>${category}</span></div>`;

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
                // 点击主分类时，自动重置子分类为“常用”
                activeSubCategory = '常用'; 
                setupTabFilters(); // 并且更新顶部标签的激活状态
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

    // --- 新增！设置顶部标签筛选的函数 ---
    const setupTabFilters = () => {
        const tabLinks = tabFiltersContainer.querySelectorAll('.tab-filter');
        tabLinks.forEach(link => {
            // 重置所有标签的样式
            link.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600', 'font-semibold');
            link.classList.add('text-gray-500', 'hover:text-blue-600');
            link.style.borderBottom = '2px solid transparent';

            // 为当前激活的子分类标签添加“激活”样式
            if (link.dataset.filter === activeSubCategory) {
                link.classList.add('text-blue-600', 'border-b-2', 'border-blue-600', 'font-semibold');
                link.classList.remove('text-gray-500');
            }

            // 为确保每个按钮只绑定一次点击事件，我们做一个标记
            if (!link.dataset.listenerAttached) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    activeSubCategory = link.dataset.filter; // 更新激活的子分类
                    filterAndRender(); // 重新筛选并渲染
                    
                    // 再次更新所有标签的样式，以反映最新的点击
                    tabLinks.forEach(l => {
                        l.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600', 'font-semibold');
                        l.classList.add('text-gray-500', 'hover:text-blue-600');
                    });
                    link.classList.add('text-blue-600', 'border-b-2', 'border-blue-600', 'font-semibold');
                    link.classList.remove('text-gray-500');
                });
                link.dataset.listenerAttached = 'true';
            }
        });
    };

    // --- 设置搜索框的事件监听 ---
    const setupSearch = () => {
        searchInput.addEventListener('input', (event) => {
            searchTerm = event.target.value.trim();
            filterAndRender();
        });
    };

    // --- 7. 初始加载数据 (从Airtable加载) ---

    // ！！！请将下面的占位符替换成你自己的信息！！！
    const AIRTABLE_API_KEY = 'patDnnNXsZc7hyN9O.88db80fb185f95d817ae168f6f4d27a3eb1b4b11cb05f63ec861c641870ade3f'; // 粘贴你自己的API Key
    const AIRTABLE_BASE_ID = 'appFgytRmxSpFbdJf'; // 粘贴你自己的Base ID
    const AIRTABLE_TABLE_NAME = '工具列表'; // 你的表名

    // 构建Airtable API的URL
    const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;

    // 使用fetch从Airtable获取数据
    // --- 7. 初始加载数据 (从Airtable加载 - 自动化Logo升级版) ---

fetch(airtableUrl, {
    headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`
    }
})
.then(response => response.json())
.then(data => {
    // 数据转换逻辑
    const transformedTools = data.records.map(record => {
        const fields = record.fields;

        // --- Logo自动化逻辑的核心 ---
        // 1. 优先获取你手动上传的Logo
        let finalLogo = (fields.logo && fields.logo[0]) ? fields.logo[0].url : null;

        // 2. 如果没有手动上传的Logo，并且有官网URL，则自动生成一个备用Favicon链接
        if (!finalLogo && fields.url) {
            try {
                // 使用Google的免费Favicon服务，sz=64表示获取64x64像素的图标
                finalLogo = `https://www.google.com/s2/favicons?sz=64&domain_url=${fields.url}`;
            } catch (e) {
                // 如果URL格式不正确，则留空
                finalLogo = '';
            }
        }
        // --- 自动化逻辑结束 ---

        return {
            id: record.id,
            name: fields.name || '',
            url: fields.url || '#',
            description: fields.description || '',
            logo: finalLogo || '', // 确保最终有一个值
            category: fields.category || '未分类',
            subCategory: fields.subCategory || '常用',
            tags: fields.tags || []
        };
    });

    // 后续逻辑和之前完全一样
    allTools = transformedTools;
    setupSidebarNav();
    setupTabFilters();
    setupSearch();
    filterAndRender();
})
.catch(error => {
    console.error('从Airtable加载数据时出错:', error);
    toolContainer.innerHTML = `<p class="text-red-500 text-center col-span-full">加载云端数据失败，请检查API设置或网络连接。</p>`;
});
});
