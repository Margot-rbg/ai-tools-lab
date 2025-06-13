
document.addEventListener('DOMContentLoaded', () => {
    console.log('app.js 脚本已开始运行！');
    // 1. 定义所有需要的HTML元素
    const toolContainer = document.getElementById('tool-container');
    const desktopSidebarContainer = document.getElementById('sidebar-nav-desktop');
    const mobileSidebarContainer = document.getElementById('sidebar-nav-mobile');
    const searchInput = document.getElementById('search-input'); // 这是搜索框，请确保HTML里有这个ID
    const mainContentTitle = document.getElementById('main-content-title');
    const tabFiltersContainer = document.getElementById('tab-filters');
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const sidebarBackdrop = document.getElementById('sidebar-backdrop');

    // 2. 定义全局状态变量
    let allTools = [];
    let activeCategory = '全部';
    let activeSubCategory = '常用';
    let searchTerm = '';

    // 3. 图标数据 (请确保这里的key和你的Airtable分类名一致)
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

    // 4. 核心渲染与筛选逻辑
    const renderTools = (tools) => {
        toolContainer.innerHTML = '';
        if (tools.length === 0) {
            toolContainer.innerHTML = `<p class="text-gray-500 text-center col-span-full py-10">在此分类下未找到相关的AI工具。</p>`;
            return;
        }
        tools.forEach(tool => {
            const tagsHTML = (tool.tags || []).map(tag => `<span class="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-1 rounded-full">${tag}</span>`).join('');
            const cardHTML = `<div class="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"><a href="${tool.url}" target="_blank" class="p-6 flex-grow"><div class="flex items-center mb-4"><div class="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0 border border-gray-100"><img src="${tool.logo}" alt="${tool.name} logo" class="w-full h-full object-cover"></div><h3 class="text-lg font-semibold tracking-tight text-gray-900">${tool.name}</h3></div><p class="text-sm text-gray-600 mb-4" style="min-height: 60px;">${tool.description}</p></a><div class="px-6 pt-2 pb-4 border-t border-gray-100"><div class="flex flex-wrap items-center">${tagsHTML}</div></div></div>`;
            toolContainer.innerHTML += cardHTML;
        });
    };

    const filterAndRender = () => {
        let filteredTools = allTools;
        if (activeCategory !== '全部') {
            filteredTools = filteredTools.filter(tool => tool.category === activeCategory);
        }
        if (activeSubCategory !== '全部') {
            filteredTools = filteredTools.filter(tool => tool.subCategory === activeSubCategory);
        }
        if (searchTerm) {
            filteredTools = filteredTools.filter(tool => tool.name.toLowerCase().includes(searchTerm) || tool.description.toLowerCase().includes(searchTerm));
        }
        mainContentTitle.textContent = `${activeCategory} - ${activeSubCategory}`;
        renderTools(filteredTools);
    };

    // 5. 设置导航和交互
    const setupNavigations = () => {
        const categories = ['全部', ...new Set(allTools.map(tool => tool.category).filter(Boolean))];
        const subCategories = ['常用', '探索', '专业']; // 你可以自定义这里的子分类

        desktopSidebarContainer.innerHTML = '';
        mobileSidebarContainer.innerHTML = '';
        categories.forEach(category => {
            const linkHTML = `<div class="flex items-center">${categoryIcons[category] || categoryIcons['默认']}<span>${category}</span></div>`;
            desktopSidebarContainer.appendChild(createSidebarLinkElement(category, linkHTML));
            mobileSidebarContainer.appendChild(createSidebarLinkElement(category, linkHTML, true));
        });
        
        tabFiltersContainer.innerHTML = '';
        subCategories.forEach(subCategory => {
            const tabLink = document.createElement('a');
            tabLink.href = '#';
            tabLink.className = 'tab-filter px-4 py-2 text-sm';
            tabLink.dataset.filter = subCategory;
            tabLink.textContent = subCategory;
            tabLink.addEventListener('click', (e) => {
                e.preventDefault();
                activeSubCategory = subCategory;
                updateTabActiveState();
                filterAndRender();
            });
            tabFiltersContainer.appendChild(tabLink);
        });

        updateSidebarActiveState();
        updateTabActiveState();
    };

    const createSidebarLinkElement = (category, innerHTML, isMobile = false) => {
        const link = document.createElement('a');
        link.href = '#';
        link.dataset.category = category;
        link.className = 'sidebar-link flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200';
        link.innerHTML = innerHTML;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            activeCategory = category;
            activeSubCategory = '常用';
            searchInput.value = '';
            searchTerm = '';
            updateSidebarActiveState();
            updateTabActiveState();
            filterAndRender();
            if (isMobile) toggleMenu();
        });
        return link;
    };
    
    const updateSidebarActiveState = () => {
        document.querySelectorAll('.sidebar-link').forEach(l => {
            l.classList.remove('bg-blue-100', 'text-blue-700', 'font-semibold');
            if (l.dataset.category === activeCategory) {
                l.classList.add('bg-blue-100', 'text-blue-700', 'font-semibold');
            }
        });
    };
    
    const updateTabActiveState = () => {
        tabFiltersContainer.querySelectorAll('.tab-filter').forEach(l => {
            l.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600', 'font-semibold');
            l.classList.add('text-gray-500');
            if (l.dataset.filter === activeSubCategory) {
                l.classList.add('text-blue-600', 'border-b-2', 'border-blue-600', 'font-semibold');
                l.classList.remove('text-gray-500');
            }
        });
    };
    
    const setupSearch = () => {
        // 增加一个检查，确保searchInput存在
        if (searchInput) {
            searchInput.addEventListener('input', (event) => {
                searchTerm = event.target.value.trim().toLowerCase();
                filterAndRender();
            });
        }
    };

    const toggleMenu = () => {
        mobileSidebar.classList.toggle('-translate-x-full');
        sidebarBackdrop.classList.toggle('hidden');
    };

    menuToggleBtn.addEventListener('click', toggleMenu);
    sidebarBackdrop.addEventListener('click', toggleMenu);

    // 6. 初始加载数据
    // !!! 再次确认这里的API信息是你自己的 !!!
    const AIRTABLE_API_KEY = 'patDnnNXsZc7hyN9O.88db80fb185f95d817ae168f6f4d27a3eb1b4b11cb05f63ec861c641870ade3f';
    const AIRTABLE_BASE_ID = 'appFgytRmxSpFbdJf';
    const AIRTABLE_TABLE_NAME = '工具列表';
    const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;
    
    fetch(airtableUrl, { headers: { 'Authorization': `Bearer ${AIRTABLE_API_KEY}` } })
        .then(response => {
            if (!response.ok) { throw new Error(`网络响应错误: ${response.statusText}`) }
            return response.json();
        })
        .then(data => {
            console.log('成功从Airtable获取到数据！', data);
            if (!data.records) { throw new Error("Airtable返回的数据格式不正确") }
            allTools = data.records.map(record => {
                const fields = record.fields;
                return {
                    id: record.id, name: fields.name, url: fields.url, description: fields.description,
                    logo: (fields.logo && fields.logo[0]) ? fields.logo[0].url : `https://www.google.com/s2/favicons?sz=64&domain_url=${fields.url}`,
                    category: fields.category, subCategory: fields.subCategory, tags: fields.tags
                };
            });
            setupNavigations(); 
            setupSearch();
            filterAndRender();
        })
        .catch(error => {
            console.error('加载或处理数据时出错:', error);
            toolContainer.innerHTML = `<p class="text-red-500 text-center col-span-full">加载云端数据失败，请检查API设置或网络连接，并查看Console中的详细错误。</p>`;
        });
});