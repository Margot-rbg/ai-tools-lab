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
    let activeCategory = 'AI Tools';
    let activeSubCategory = '全部'; // 修改默认子分类为"全部"，而不是"常用"
    let searchTerm = '';

    // 3. 图标数据 (请确保这里的key和你的Airtable分类名一致)
    const categoryIcons = {
        'AI Tools': `<svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>`,
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
        
        // 添加工具总数显示
        const countInfo = document.createElement('div');
        countInfo.className = 'col-span-full mb-4 text-sm text-gray-500';
        countInfo.textContent = `显示 ${tools.length} 个工具`;
        toolContainer.appendChild(countInfo);
        
        tools.forEach(tool => {
            // 截断描述文本，只显示前30个字符
            const shortDescription = tool.description && tool.description.length > 30 
                ? tool.description.substring(0, 30) + '...' 
                : tool.description || '';
            
            // 确保图片URL有效，如果没有有效的logo，使用默认图标
            const logoUrl = tool.logo || `https://www.google.com/s2/favicons?sz=64&domain_url=${tool.url || 'google.com'}`;
            
            const cardHTML = `
            <a href="${tool.url}" target="_blank" class="bg-white border border-gray-200 rounded-lg p-3 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-300 group relative">
                <div class="w-12 h-12 rounded-full overflow-hidden mb-2 border border-gray-100">
                    <img src="${logoUrl}" alt="${tool.name} logo" class="w-full h-full object-cover" onerror="this.src='https://www.google.com/s2/favicons?sz=64&domain_url=${tool.url}'">
                </div>
                <h3 class="text-sm font-semibold text-gray-900 mb-1">${tool.name}</h3>
                <p class="text-xs text-gray-500 line-clamp-2">${shortDescription}</p>
                
                <!-- 悬浮时显示的完整描述 -->
                <div class="absolute inset-0 bg-white p-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col items-start text-left">
                    <div class="flex items-center w-full mb-2">
                        <div class="w-10 h-10 rounded-full overflow-hidden mr-2 flex-shrink-0 border border-gray-100">
                            <img src="${logoUrl}" alt="${tool.name} logo" class="w-full h-full object-cover" onerror="this.src='https://www.google.com/s2/favicons?sz=64&domain_url=${tool.url}'">
                        </div>
                        <h3 class="text-sm font-semibold text-gray-900">${tool.name}</h3>
                    </div>
                    <p class="text-xs text-gray-600 mb-2 flex-grow overflow-y-auto">${tool.description}</p>
                    <div class="text-xs text-blue-600 mt-auto">点击访问 →</div>
                </div>
            </a>`;
            
            toolContainer.innerHTML += cardHTML;
        });
    };

    const filterAndRender = () => {
        let filteredTools = allTools;
        
        // 修改过滤逻辑，修复子分类过滤
        if (activeCategory !== 'AI Tools') {
            filteredTools = filteredTools.filter(tool => tool.category === activeCategory);
        }
        
        if (activeSubCategory !== '全部') {
            filteredTools = filteredTools.filter(tool => tool.subCategory === activeSubCategory);
        }
        
        if (searchTerm) {
            filteredTools = filteredTools.filter(tool => 
                tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                (tool.description && tool.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
            );
        }
        
        console.log(`筛选后的工具数量: ${filteredTools.length}, 分类: ${activeCategory}, 子分类: ${activeSubCategory}`);
        mainContentTitle.textContent = `${activeCategory} - ${activeSubCategory}`;
        renderTools(filteredTools);
    };

    // 5. 设置导航和交互
    const setupNavigations = () => {
        // 确保有数据后再设置导航
        if (!allTools || allTools.length === 0) {
            console.error("没有工具数据，无法设置导航");
            return;
        }
        
        // 从工具数据中提取所有分类
        const categories = ['AI Tools'];
        const categorySet = new Set();
        
        allTools.forEach(tool => {
            if (tool.category) {
                categorySet.add(tool.category);
            }
        });
        
        // 将Set转换为数组并添加到categories
        categories.push(...Array.from(categorySet));
        
        console.log("可用分类:", categories);
        
        // 修改子分类，添加"全部"选项
        const subCategories = ['全部', '常用', '探索', '专业']; 

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
            console.log(`点击了分类: ${category}`);
            activeCategory = category;
            activeSubCategory = '全部'; // 修改为默认显示全部
            if (searchInput) searchInput.value = '';
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

    // --- 6. 初始加载数据 ---
    // !!! 确保这里的API信息是你自己的 !!!
    const AIRTABLE_API_KEY = 'patDnnNXsZc7hyN9O.88db80fb185f95d817ae168f6f4d27a3eb1b4b11cb05f63ec861c641870ade3f';
    const AIRTABLE_BASE_ID = 'appFgytRmxSpFbdJf';
    const AIRTABLE_TABLE_NAME = '工具列表';
    
    // 修改：添加一个函数来递归加载所有Airtable数据（处理分页）
    const loadAllAirtableData = async (offset = null) => {
        try {
            // 显示加载状态
            if (offset === null) {
                toolContainer.innerHTML = '<p class="text-center col-span-full py-10">正在加载AI工具数据，请稍候...</p>';
            }
            
            // 构建API URL，如果有offset则添加
            let airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;
            if (offset) {
                airtableUrl += `?offset=${offset}`;
            }
            
            // 发起请求
            console.log(`加载Airtable数据，偏移量: ${offset || '无'}`);
            const response = await fetch(airtableUrl, { 
                headers: { 'Authorization': `Bearer ${AIRTABLE_API_KEY}` } 
            });
            
            if (!response.ok) {
                throw new Error(`网络请求失败，状态码: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            if (!data.records) {
                throw new Error("Airtable返回的数据格式不正确，缺少 'records' 数组。");
            }
            
            // 转换本页数据
            const pageTools = data.records.map(record => {
                const fields = record.fields;
                return {
                    id: record.id, 
                    name: fields.name || '（无名称）', 
                    url: fields.url || '#',
                    description: fields.description || '',
                    logo: (fields.logo && fields.logo[0]) ? fields.logo[0].url : `https://www.google.com/s2/favicons?sz=64&domain_url=${fields.url || 'google.com'}`,
                    category: fields.category, 
                    subCategory: fields.subCategory, 
                    tags: fields.tags
                };
            });
            
            // 添加到全局工具数组
            allTools = [...allTools, ...pageTools];
            console.log(`已加载 ${allTools.length} 个工具`);
            
            // 如果有更多页，继续加载
            if (data.offset) {
                return await loadAllAirtableData(data.offset); // 添加await确保递归调用正确完成
            } else {
                // 全部加载完成，保存到本地存储以加快下次加载
                try {
                    localStorage.setItem('aiToolsData', JSON.stringify(allTools));
                    localStorage.setItem('aiToolsDataTimestamp', Date.now());
                    console.log('工具数据已保存到本地存储');
                } catch (e) {
                    console.warn('无法保存到本地存储:', e);
                }
                
                // 设置导航和渲染页面
                setupNavigations();
                setupSearch();
                filterAndRender();
                return allTools;
            }
        } catch (error) {
            console.error('加载Airtable数据出错:', error);
            // 尝试从本地存储加载
            const cachedData = localStorage.getItem('aiToolsData');
            if (cachedData) {
                console.log('从本地存储加载数据');
                allTools = JSON.parse(cachedData);
                setupNavigations();
                setupSearch();
                filterAndRender();
                return allTools;
            } else {
                // 如果本地存储也没有，则加载本地JSON文件
                loadLocalData();
            }
        }
    };

    // 添加一个函数来检查本地存储的数据是否新鲜
    const checkAndLoadData = () => {
        const cachedData = localStorage.getItem('aiToolsData');
        const timestamp = localStorage.getItem('aiToolsDataTimestamp');
        const now = Date.now();
        const ONE_DAY = 24 * 60 * 60 * 1000; // 24小时的毫秒数
        
        // 如果有缓存数据且不超过1天
        if (cachedData && timestamp && (now - timestamp) < ONE_DAY) {
            console.log('使用本地缓存的数据');
            try {
                allTools = JSON.parse(cachedData);
                console.log(`从本地存储加载了 ${allTools.length} 个工具`);
                setupNavigations();
                setupSearch();
                filterAndRender();
            } catch (e) {
                console.error('解析本地存储数据出错:', e);
                loadAllAirtableData();
            }
        } else {
            // 否则重新加载
            loadAllAirtableData();
        }
    };

    // 修改本地数据加载函数，确保它能正确处理错误
    const loadLocalData = () => {
        console.log("开始加载本地数据...");
        toolContainer.innerHTML = '<p class="text-center col-span-full py-10">正在加载本地数据...</p>';
        
        fetch('data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`本地数据加载失败: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("成功加载本地数据:", data);
                allTools = data;
                setupNavigations();
                setupSearch();
                filterAndRender();
            })
            .catch(error => {
                console.error("加载本地数据出错:", error);
                toolContainer.innerHTML = `<p class="text-red-500 text-center col-span-full py-10">加载数据失败: ${error.message}</p>`;
            });
    };

    // 启动应用 - 使用优化的数据加载策略
    checkAndLoadData();
});
      