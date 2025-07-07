const axios = require('axios')

const { getReplyMsg } = require('../../hooks/getReplyMsg')

const featchH = async (temp) => {
    const msgList = temp.msg.message
    console.log('原始数据类temp:',temp)
    // 遍历 msgList，寻找 reply 类型消息
    for (const item of msgList) {
        if (item.type === 'reply') {
            try {
                // 获取引用消息详情
                const msgResponse = await axios.post(process.env.HTTPURL + '/get_forward_msg', {
                    message_id: item.data.id,
                })
                const rawMessage = msgResponse.data.data.messages
                console.log(msgResponse.data.data.messages)
                rawMessage.forEach(item => {
                    // console.log(item.message)
                    getReplyMsg(item)
                })
                // console.log()
            } catch (err) {
                console.error('get 错误:', err)
                return null // 错误时返回 null，供调用者处理
            }
        }
    }

    // 没有找到 reply 类型消息或有效文件
    return null
}

module.exports = { featchH }