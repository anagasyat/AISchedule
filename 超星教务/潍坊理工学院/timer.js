async function scheduleTimer({
  providerRes,
  parserRes
} = {}) {
  // 支持异步操作 推荐await写法

  // 这是一个示例函数，用于演示，正常用不到可以删掉
  const someAsyncFunc = () => new Promise(resolve => {
    setTimeout(() => resolve(), 1)
  })
  await someAsyncFunc()

  // 这个函数中也支持使用 AIScheduleTools 譬如给出多条时间配置让用户选择之类的

  // 返回时间配置JSON，所有项都为可选项，如果不进行时间配置，请返回空对象
  return {
    totalWeek: 25, // 总周数：[1, 30]之间的整数
    startSemester: '', // 开学时间：时间戳，13位长度字符串，推荐用代码生成
    startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
    showWeekend: true, // 是否显示周末
    forenoon: 4, // 上午课程节数：[1, 10]之间的整数
    afternoon: 4, // 下午课程节数：[0, 10]之间的整数
    night: 2, // 晚间课程节数：[0, 10]之间的整数
    sections: [
  {section: 1, startTime: '08:00', endTime: '08:50'},
  {section: 2, startTime: '09:00', endTime: '09:50'},
  {section: 3, startTime: '10:10', endTime: '11:00'},
  {section: 4, startTime: '11:10', endTime: '12:00'},
  {section: 5, startTime: '14:00', endTime: '14:50'},
  {section: 6, startTime: '15:00', endTime: '15:50'},
  {section: 7, startTime: '16:10', endTime: '17:00'},
  {section: 8, startTime: '17:10', endTime: '18:00'},
  {section: 9, startTime: '19:00', endTime: '19:50'},
  {section: 10, startTime: '20:00', endTime: '20:50'}
], // 课程时间表，注意：总长度要和上边配置的节数加和对齐
  }
}
