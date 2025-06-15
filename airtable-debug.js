// Airtable API 完整调试脚本
const AIRTABLE_API_KEY = 'patDnnNXsZc7hyN9O.88db80fb185f95d817ae168f6f4d27a3eb1b4b11cb05f63ec861c641870ade3f';
const AIRTABLE_BASE_ID = 'appFgytRmxSpFbdJf';
const AIRTABLE_TABLE_NAME = '工具列表';
const fs = require('fs');

// 用于存储所有工具数据
let allTools = [];

// 递归获取所有页面数据
async function fetchAllRecords(offset = null) {
    try {
        // 构建API URL
        let url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;
        if (offset) {
            url += `?offset=${offset}`;
        }
        
        console.log(`正在获取数据，偏移量: ${offset || '无'}`);
        
        // 发起请求
        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${AIRTABLE_API_KEY}` }
        });
        
        if (!response.ok) {
            throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!data.records) {
            throw new Error('返回的数据格式不正确，缺少records字段');
        }
        
        console.log(`本页获取到 ${data.records.length} 条记录`);
        
        // 转换并添加到全局数组
        const pageTools = data.records.map(record => {
            const fields = record.fields;
            return {
                id: record.id,
                name: fields.name || '（无名称）',
                url: fields.url || '#',
                description: fields.description || '',
                logo: (fields.logo && fields.logo[0]) ? fields.logo[0].url : null,
                category: fields.category,
                subCategory: fields.subCategory,
                tags: fields.tags
            };
        });
        
        allTools = [...allTools, ...pageTools];
        console.log(`当前总共获取到 ${allTools.length} 条记录`);
        
        // 如果有更多页，继续获取
        if (data.offset) {
            console.log(`检测到更多数据，继续获取下一页...`);
            return fetchAllRecords(data.offset);
        } else {
            console.log(`所有数据获取完成，总共 ${allTools.length} 条记录`);
            
            // 保存到文件
            fs.writeFileSync('all-tools.json', JSON.stringify(allTools, null, 2));
            console.log('数据已保存到 all-tools.json 文件');
            
            // 打印分类统计
            const categories = {};
            allTools.forEach(tool => {
                const category = tool.category || '未分类';
                categories[category] = (categories[category] || 0) + 1;
            });
            
            console.log('各分类工具数量统计:');
            Object.entries(categories).forEach(([category, count]) => {
                console.log(`${category}: ${count}个工具`);
            });
            
            return allTools;
        }
    } catch (error) {
        console.error('获取数据出错:', error);
        throw error;
    }
}

// 开始执行
console.log('开始从Airtable获取所有工具数据...');
fetchAllRecords()
    .then(() => console.log('脚本执行完成'))
    .catch(err => console.error('脚本执行失败:', err)); 