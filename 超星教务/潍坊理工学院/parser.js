function scheduleHtmlParser(html) {
 const data = JSON.parse(html);  
 let result = [];
    try {
const result = data.map(item => ({
  name: item.kcmc.replace(/<.*?>/g, ''), // 提取课程名称并移除 HTML 标签
  position: item.croommc.replace(/<.*?>/g, ''), // 提取上课地点并移除 HTML 标签
  teacher: item.tmc.replace(/<.*?>/g, ''), // 提取教师名称并移除 HTML 标签
  weeks: item.zcstr.split(',').map(Number), // 提取周数并转换为数组
  day: item.xingqi, // 提取星期
  sections: [item.djc], // 提取节次
}));
        return result;
    } catch (error) {
        console.error("解析失败:", error);
        return null;
    }
}
