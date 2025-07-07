
const { judegment } = require('./judgeModes')
const { doSend } = require('../controllers/doSend')

const parseMsg = ( msg ) => {
    const data = JSON.parse(msg)
    // console.log(msg)
    // console.log(data)
    if(data.sender){
        //QQ消息处理逻辑
        analyzeMsg(data.message,data)
    }
}
const analyzeMsg = ( msgList,msg ) => {
    let hasAt = false // 是否有AT
    let hasReplyAndAt = false // 有AT且回复
    let texts = ''
    let replyInfo = null

    msgList.forEach(_msg => {
        if (_msg.type==='at'&&_msg.data.qq==process.env.BOTQQ) {
            hasAt = true
        }
        if (_msg.type === 'reply') {
            replyInfo = _msg.data.id
        }
        if (_msg.type === 'text') {
            texts+=_msg.data.text
        }
    })
    if(hasAt){// 如果是艾特机器人，则启用逻辑
        // console.log('hasAt',hasAt)
        // console.log('parse处理的消息：',msgList,msg)
        const msgTemp = judegment(msg)
        doSend(msgTemp)
    }
    if (replyInfo && hasAt) {
        hasReplyAndAt = true
    }
    
}

module.exports = { parseMsg }