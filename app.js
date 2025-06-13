document.addEventListener('DOMContentLoaded', () => {

    // --- 1. 定义元素和全局变量 ---
    const mainNavContainer = document.getElementById('main-nav');
    const subSearchLinksContainer = document.getElementById('sub-search-links');
    const contentGridContainer = document.getElementById('content-grid');
    const searchInput = document.getElementById('main-search-input');

    let allTools = []; // 存储所有AI工具
    let allSubLinks = []; // 存储所有辅助链接
    let activeCategory = '常用'; // 默认激活的分类

    // --- 2. 初始加载数据 (从Airtable加载) ---
    // !!! 请确保这里的API信息是你自己的 !!!
    const AIRTABLE_API_KEY = 'patDnnNXsZc7hyN9O.88db80fb185f95d817ae168f6f4d27a3eb1b4b11cb05f63ec861c641870ade3f';
    const AIRTABLE_BASE_ID = 'appFgytRmxSpFbdJf';

    // 定义两个表的名称
    const TOOLS_TABLE_NAME = '工具列表';
    const SUBLINKS_TABLE_NAME = '辅助链接';

    // 构建两个API的URL
    const toolsUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(TOOLS_TABLE_NAME)}`;
    const sublinksUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(SUBLINKS_TABLE_NAME)}`;
    const fetchOptions = { headers: { 'Authorization': `Bearer ${AIRTABLE_API_KEY}` } };

    // 使用Promise.all同时请求两个表的数据
    Promise.all([
        fetch(toolsUrl, fetchOptions).then(res => res.json()),
        fetch(sublinksUrl, fetchOptions).then(res => res.json())
    ])
    .then(([toolsData, sublinksData]) => {
        // 转换AI工具数据
        allTools = toolsData.records.map(record => ({
            id: record.id,
            name: record.fields.name || '',
            url: record.fields.url || '#',
            description: record.fields.description || '',
            logo: (record.fields.logo && record.fields.logo[0]) ? record.fields.logo[0].url : `https://www.google.com/s2/favicons?sz=64&domain_url=${record.fields.url}`,
            category: record.fields.category, // 主分类，如AI写作
            subCategory: record.fields.subCategory, // 子分类，如常用、探索
            tags: record.fields.tags || []
        }));

        // 转换辅助链接数据
        allSubLinks = sublinksData.records.map(record => ({
            id: record.id,
            name: record.fields.name || '',
            url: record.fields.url || '#',
            category: record.fields.category || '常用' // 这里的category对应顶部分类
        }));
        
        // 初始化页面
        setupMainNavigation();
        filterAndRender();
    })
    .catch(error => {
        console.error('加载数据时出错:', error);
        contentGridContainer.innerHTML = `<p class="text-red-500 text-center">加载云端数据失败，请检查API设置或网络连接。</p>`;
    });

    // --- 3. 筛选并渲染内容的函数 ---
    const filterAndRender = () => {
        // 更新顶部导航按钮的激活状态
        updateNavActiveState();
        
        // 根据激活的分类筛选AI工具（注意：这里我们用subCategory来匹配顶部分类）
        const filteredTools = allTools.filter(tool => tool.subCategory === activeCategory);
        renderToolsGrid(filteredTools);

        // 根据激活的分类，更新搜索框下方的辅助链接
        const filteredSubLinks = allSubLinks.filter(link => link.category === activeCategory);
        renderSubSearchLinks(filteredSubLinks);
    };

    // --- 4. 渲染主内容区的工具卡片 ---
    const renderToolsGrid = (tools) => {
        contentGridContainer.innerHTML = '';
        if (tools.length > 0) {
            contentGridContainer.className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6';
            tools.forEach(tool => {
                const cardHTML = `
                    <a href="${tool.url}" target="_blank" class="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors duration-200">
                        <div class="w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center bg-white shadow-sm">
                            <img src="${tool.logo}" alt="${tool.name}" class="w-8 h-8 object-contain">
                        </div>
                        <p class="text-sm font-medium text-gray-800 truncate">${tool.name}</p>
                    </a>
                `;
                contentGridContainer.innerHTML += cardHTML;
            });
        }
    };

    // --- 5. 渲染搜索框下方的辅助链接 ---
    const renderSubSearchLinks = (links) => {
        subSearchLinksContainer.innerHTML = '';
        links.forEach(link => {
            const linkEl = document.createElement('a');
            linkEl.href = link.url;
            linkEl.target = '_blank';
            linkEl.textContent = link.name;
            linkEl.className = "hover:text-blue-600";
            subSearchLinksContainer.appendChild(linkEl);
        });
    };

    // --- 6. 创建顶部主分类导航 ---
    const setupMainNavigation = () => {
        // 从辅助链接数据中提取出所有顶层分类
        const categories = ['常用', '搜索', '社区', '图片', '生活']; // 或者用动态方式获取
        
        mainNavContainer.innerHTML = '';
        categories.forEach(category => {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = category;
            link.dataset.category = category;
            link.className = 'text-lg text-gray-500 hover:text-blue-600 font-medium transition-colors';
            
            link.addEventListener('click', (e) => {
                e.preventDefault();
                activeCategory = category;
                filterAndRender();
            });
            mainNavContainer.appendChild(link);
        });
    };
    
    // --- 7. 更新顶部导航的激活状态 ---
    const updateNavActiveState = () => {
        document.querySelectorAll('#main-nav a').forEach(link => {
            if (link.dataset.category === activeCategory) {
                link.classList.add('text-blue-600', 'font-semibold');
                link.classList.remove('text-gray-500');
            } else {
                link.classList.remove('text-blue-600', 'font-semibold');
                link.classList.add('text-gray-500');
            }
        });
    };
});