async function scheduleHtmlProvider() {
    // 加载小爱组件
    await loadTool('AIScheduleTools')
    
 const d = new Date()
    var year = d.getFullYear()
    const month = d.getMonth() + 1
    var xnxq = 2024 - 2025 - 2
    var term = 1
    // 2-7月份视为第二学期
    if (month > 1 && month < 8) {
        term = 2
        year--
    }
    xnxq = year + "-" + (year + 1) + "-" + term

   var url = 'https://cxxxt.wfit.edu.cn/admin/pkgl/xskb/sdpkkbList?xnxq=' + xnxq +'&xhid=35155db754fb49688a8c5725db3c9b1a&xqdm=2&zdzc=&zxzc='
    // 获取cookie和UA
    const cookie = document.cookie
    const UA = navigator.userAgent
    // 计算学期字段
    
    try {
        const res = await fetch(url,
            {
                method: "GET",
                mode: 'cors',
                credentials: "include",
                "Access-Control-Allow-Origin": "*",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Accept": "application/json, text/javascript, */*; q=0.01",
                    "Accept-Encoding": "gzip, deflate",
                    "Accept-Language": "zh-CN,zh;q=0.9",
                    "Content-Length": "25",
                    "Cookie": cookie,
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "Host": "jwxt.niit.edu.cn",
                    "Origin": "https://cxxxt.wfit.edu.cn/",
                    "Referer": "https://cxxxt.wfit.edu.cn/admin/pkgl/xskb/queryKbForXsd",
                    "User-Agent": UA,
                    "X-Requested-With": "XMLHttpRequest",
                },
                body: null
            })
        resJson = await res.json()
        return JSON.stringify(resJson)
    } catch (error) {
        // console.error(error)
        await AIScheduleAlert("请登录后打开课表界面导入" + error.message)
        return 'do not continue'
    }
}
