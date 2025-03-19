//*** 啊也Code三峡大学新教务课表导入系统***
//2025.02.25添加了体育课详细科目信息及课程班级号
//2025.02.24修复了单双周显示及优化课表冲突下的解决方案。
//2025.02.23修复了课表导入时，只能截取到课表数据前百分之七十五的BUG
//代码出现问题，可联系啊也 a@ioll.top 反馈
function scheduleHtmlParser(html) {
    // 定义最终结果
    let result = [];

    try {
        // 将文本转换为 JSON 对象
        let data = JSON.parse(html);

        // 获取数据读取状态
        let _status = data.datas.cxxszhxqkb.extParams.code;

        // 判断数据读取状态
        if (_status !== 1) {
            console.log("数据读取失败");
            return null;
        }

        // 获取课程数据行
        let rows = data.datas.cxxszhxqkb.rows;

        // 遍历课程数据
        for (let i = 0; i < rows.length; i++) {
            console.log(rows[i]);

            // 定义课表结构
            let course = {
                name: "",          // 课程名称
                teacher: "",       // 教师名称
                position: "",      // 课程地点
                day: 0,            // 上课星期（1-7）
                weeks: [],         // 上课周数（数组）
                sections: [],      // 上课节数（数组）
                conflictInfo: ""   // 冲突信息（如果有）
            };

            // 添加课程名
            course.name = rows[i].KCM;

            // 添加课程班级号
            course.classnum = rows[i].KXH;

            // 添加课程详细信息
            course.classdetails = rows[i].TYXMDM_DISPLAY;
  
            // 合并课程详细信息
            course.name = `${course.name}${course.classdetails}[${course.classnum}班]`;

            // 添加教师名
            course.teacher = rows[i].SKJS;

            // 添加课程地点
            let positionData = rows[i].JASMC;
            if (positionData == null) {
                positionData = "无";
            }
            course.position = positionData;

            // 添加课程在周几
            course.day = rows[i].SKXQ;

            // 处理周数，包括单双周情况
            let weekData = rows[i].ZCMC;
            weekData.split(",").forEach(element => {
                // 判断是否包含单双周
                let isOdd = element.includes("单");
                let isEven = element.includes("双");

                // 去掉“单”或“双”后处理范围或单个数字
                element = element.replace("单", "").replace("双", "");

                if (element.includes("-")) {
                    // 如果是范围（如 1-5）
                    let range = element.split("-");
                    let start = parseInt(range[0]);
                    let end = parseInt(range[1]);
                    for (let j = start; j <= end; j++) {
                        if (isOdd && j % 2 !== 0) {
                            course.weeks.push(j); // 单周
                        } else if (isEven && j % 2 === 0) {
                            course.weeks.push(j); // 双周
                        } else if (!isOdd && !isEven) {
                            course.weeks.push(j); // 普通范围
                        }
                    }
                } else {
                    // 如果是单个数字
                    let j = parseInt(element);
                    if (isOdd && j % 2 !== 0) {
                        course.weeks.push(j); // 单周
                    } else if (isEven && j % 2 === 0) {
                        course.weeks.push(j); // 双周
                    } else if (!isOdd && !isEven) {
                        course.weeks.push(j); // 普通单个数字
                    }
                }
            });

            // 处理节数
            let startSection = parseInt(rows[i].KSJC); // 开始节数
            let endSection = parseInt(rows[i].JSJC);   // 结束节数
            for (let k = startSection; k <= endSection; k++) {
                course.sections.push(k);
            }

            // 检测冲突并合并信息
            let conflictDetected = false;
            for (let existingCourse of result) {
                // 检查时间和节次是否冲突（不再依赖上课地点）
                if (
                    existingCourse.day === course.day &&
                    course.weeks.some(week => existingCourse.weeks.includes(week)) &&
                    course.sections.some(section => existingCourse.sections.includes(section))
                ) {
                    console.warn(`检测到冲突：${existingCourse.name} 和 ${course.name} 在同一时间和节次`);
                    conflictDetected = true;

                    // 合并冲突课程信息
                    existingCourse.name += `{${course.name}}`;
                    existingCourse.teacher += `{${course.teacher}}`;
                    existingCourse.position += `{${course.position}}`;
                    existingCourse.conflictInfo = `与 ${course.name}（${course.teacher}，${course.position}）冲突`;
                    break;
                }
            }

            // 如果没有冲突，直接添加课程
            if (!conflictDetected) {
                result.push(course);
            }
        }

        // 返回结果
        return result;
    } catch (error) {
        console.error("解析失败:", error);
        return null;
    }
}
