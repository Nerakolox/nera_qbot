
const modeList = [
    {
        key:'帮助',
        function:''
    },
    {
        key:'help',
        function:''
    },
    {
        key:'提取表情包',
        function:''
    },
    {
        key:'提取H',
        function:''
    },
    {
        key:'提取h',
        function:''
    }
]

const judegment = (msg) => {
    const msgList = msg.message
    // 遍历 msgList，寻找第一个 type 为 'text' 的元素
    for (const _msg of msgList) {
        if (_msg.type === 'text') {
            const text = _msg.data.text.trim() // 获取 text 并去除首尾空格
            // 查找匹配的模式
            for (const mode of modeList) {
                if (text.startsWith(mode.key)) {
                    return { mode, msg } // 返回匹配的模式和完整文本
                }
            }
        }
    }
    return null // 没有找到 text 类型或匹配的模式
}

module.exports = { judegment }