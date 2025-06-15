// Airtable API 连接测试脚本
const AIRTABLE_API_KEY = 'patDnnNXsZc7hyN9O.88db80fb185f95d817ae168f6f4d27a3eb1b4b11cb05f63ec861c641870ade3f';
const AIRTABLE_BASE_ID = 'appFgytRmxSpFbdJf';
const AIRTABLE_TABLE_NAME = '工具列表';
const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;

console.log('开始测试 Airtable API 连接...');
console.log(`API URL: ${airtableUrl}`);

fetch(airtableUrl, { 
  headers: { 'Authorization': `Bearer ${AIRTABLE_API_KEY}` } 
})
.then(response => {
  console.log(`响应状态: ${response.status} ${response.statusText}`);
  if (!response.ok) {
    throw new Error(`网络请求失败，状态码: ${response.status} ${response.statusText}`);
  }
  return response.json();
})
.then(data => {
  console.log('成功获取数据!');
  console.log(`获取到的记录数量: ${data.records ? data.records.length : 0}`);
  
  // 检查是否有分页
  if (data.offset) {
    console.log(`存在更多数据，下一页偏移量: ${data.offset}`);
  } else {
    console.log('已获取所有数据，没有更多页');
  }
  
  // 保存完整数据到文件
  if (data.records && data.records.length > 0) {
    const transformedTools = data.records.map(record => {
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
    
    console.log(`转换后的工具数量: ${transformedTools.length}`);
    console.log('数据示例:', transformedTools[0]);
  }
})
.catch(error => {
  console.error('API 请求错误:', error);
}); 