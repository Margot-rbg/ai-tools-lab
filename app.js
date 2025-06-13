document.addEventListener('DOMContentLoaded', () => {

    // 1. 定义所有需要的HTML元素
    const toolContainer = document.getElementById('tool-container');
    const desktopSidebarContainer = document.getElementById('sidebar-nav-desktop');
    const mobileSidebarContainer = document.getElementById('sidebar-nav-mobile');
    const searchInput = document.getElementById('search-input');
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
        'AI写作': `<svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>`,
        'AI绘画': `<svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536l12.232-12.232z"></path></svg>`,
        'AI视频': `<svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>`,
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
        const subCategories = ['常用', '探索', '专业', '社区', '图片', '生活']; // 你可以自定义这里的子分类

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
        searchInput.addEventListener('input', (event) => {
            searchTerm = event.target.value.trim().toLowerCase();
            filterAndRender();
        });
    };

    const toggleMenu = () => {
        mobileSidebar.classList.toggle('-translate-x-full');
        sidebarBackdrop.classList.toggle('hidden');
    };

    menuToggleBtn.addEventListener('click', toggleMenu);
    sidebarBackdrop.addEventListener('click', toggleMenu);

    // 6. 初始加载数据
    // !!! 确保这里的API信息是你自己的 !!!
    const AIRTABLE_API_KEY = 'patDnnNXsZc7hyN9O.88db80fb185f95d817ae168f6f4d27a3eb1b4b11cb05f63ec861c641870ade3f';
    const AIRTABLE_BASE_ID = 'appFgytRmxSpFbdJf';
    const AIRTABLE_TABLE_NAME = '工具列表';
    const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;
    
    fetch(airtableUrl, { headers: { 'Authorization': `Bearer ${AIRTABLE_API_KEY}` } })
        .then(response => response.json())
        .then(data => {
            allTools = data.records.map(record => {
                const fields = record.fields;
                return {
                    id: record.id, name: fields.name, url: fields.url, description: fields.description,
                    logo: (fields.logo && fields.logo[0]) ? fields.logo[0].url : `https://www.google.com/s2/favicons?sz=64&domain_url=${fields.url}`,
                    category: fields.category, subCategory: fields.subCategory, tags: fields.tags
                };
            });
            setupNavigations(); // 一个函数统一创建所有导航
            setupSearch();
            filterAndRender();
        })
        .catch(error => {
            console.error('加载数据时出错:', error);
            toolContainer.innerHTML = `<p class="text-red-500 text-center col-span-full">加载云端数据失败，请检查API设置或网络连接。</p>`;
        });
});