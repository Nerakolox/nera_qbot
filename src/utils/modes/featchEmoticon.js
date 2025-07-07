const axios = require('axios')

const featchEmoticon = async (temp) => {
    const msgList = temp.msg.message

    // 遍历 msgList，寻找 reply 类型消息
    for (const item of msgList) {
        if (item.type === 'reply') {
            try {
                // 获取引用消息详情
                const msgResponse = await axios.post(process.env.HTTPURL + '/get_msg', {
                    message_id: item.data.id,
                })
                const rawMessage = msgResponse.data.data.message

                // 确保引用消息包含文件
                if (rawMessage && rawMessage[0]?.data?.file) {
                    // 获取文件路径
                    const fileResponse = await axios.post(process.env.HTTPURL + '/get_image', {
                        file: rawMessage[0].data.file,
                    })
                    const filePath = fileResponse.data.data.file

                    // 构造 query 对象
                    const query = {
                        group_id: temp.msg.group_id,
                        message: [
                            {
                                type: 'file',
                                data: {
                                    file: `file://${filePath}`,
                                    name: rawMessage[0].data.file,
                                },
                            },
                        ],
                    }

                    return query // 返回 query 对象
                }
            } catch (err) {
                console.error('get 错误:', err)
                return null // 错误时返回 null，供调用者处理
            }
        }
    }

    // 没有找到 reply 类型消息或有效文件
    return null
}

module.exports = { featchEmoticon }