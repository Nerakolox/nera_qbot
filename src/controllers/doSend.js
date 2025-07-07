
const { sendMsg } = require('../utils/sendMsg')

const { featchEmoticon } = require('../utils/modes/featchEmoticon')
const { featchH } = require('../utils/modes/featchH')

const doSend = async (temp) => {
    // console.log('dosend',temp)
    let query
    switch (temp.mode.key){
        case '提取表情包':
            query = await featchEmoticon(temp)
            sendMsg(query)
        break;
        case '提取H':
            query = await featchH(temp)
            sendMsg(query)
        break;
        case '提取h':
            query = await featchH(temp)
            sendMsg(query)
        break;
    }
}


module.exports = { doSend }