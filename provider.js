async function scheduleHtmlProvider() {
    // 加载小爱组件
    await loadTool('AIScheduleTools')
    url = 'http://jwxt.ctgu.edu.cn/jwapp/sys/wdkb/modules/xskcb/cxxszhxqkb.do'
    // 获取cookie和UA
    const cookie = document.cookie
    const UA = navigator.userAgent
    // 计算学期字段
    const d = new Date()
    var year = d.getFullYear()
    const month = d.getMonth() + 1
    var XNXQDM = 2024 - 2025 - 2
    var term = 1
    // 2-7月份视为第二学期
    if (month > 1 && month < 8) {
        term = 2
        year--
    }
    XNXQDM = year + "-" + (year + 1) + "-" + term
    try {
        const res = await fetch(url,
            {
                method: "post",
                mode: 'no-cors',
                credentials: "include",
                "Access-Control-Allow-Origin": "*",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Accept": "application/json, text/javascript, */*; q=0.01",
                    "Cookie": cookie,
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "Referer": "http://jwxt.ctgu.edu.cn/jwapp/sys/wdkb/*default/index.do?EMAP_LANG=zh#/xskcb",
                    "User-Agent": UA,
                    "X-Requested-With": "XMLHttpRequest",
                },
                body: 'XNXQDM=' + XNXQDM
            })
        resJson = await res.json()
        return JSON.stringify(resJson)
    } catch (error) {
        // console.error(error)
        await AIScheduleAlert("请登录后打开课表界面导入" + error.message)
        return 'do not continue'
    }
}