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
    const categoryIcons = {
        'AI写作': `<svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>`,
        'AI绘画': `<svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`,
        'AI视频': `<svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>`,
        'AI编程': `<svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>`,
        '全部': `<svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>`,
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
    const AIRTABLE_API_KEY = 'patcjApmsHOknSs3e.3c7cefca28e6b8f31b73b0c07b02d59718a0ef577085ae6f61a365cf9670e199'; // 粘贴你自己的API Key
    const AIRTABLE_BASE_ID = 'appFgytRmxSpFbdJf'; // 粘贴你自己的Base ID
    const AIRTABLE_TABLE_NAME = 'AI工具集'; // 你的表名

    // 构建Airtable API的URL
    const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;

    // 使用fetch从Airtable获取数据
    fetch(airtableUrl, {
        headers: {
            // 在请求头中加入身份认证信息
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`
        }
    })
    .then(response => response.json())
    .then(data => {
        // Airtable返回的数据结构和我们之前的不一样，需要转换一下
        const transformedTools = data.records.map(record => {
            // 确保字段存在，避免出错
            const fields = record.fields;
            return {
                id: record.id, // Airtable为每条记录生成的唯一ID
                name: fields.name || '',
                url: fields.url || '#',
                description: fields.description || '',
                // Airtable的附件字段是一个数组，我们只取第一个图片的URL
                logo: (fields.logo && fields.logo[0]) ? fields.logo[0].url : '',
                category: fields.category || '未分类',
                subCategory: fields.subCategory || '常用',
                tags: fields.tags || [] // 确保tags是一个数组
            };
        });

        // 后续逻辑和之前完全一样，无缝衔接
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
