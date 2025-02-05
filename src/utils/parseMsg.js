const parseMsg = ( msg ) => {
    const data = JSON.parse(msg)
    // console.log(data)
    if(data.sender){
        //QQ消息处理逻辑
        analyzeMsg(data.message,data)
    }
}

const axios = require('axios')
const { aiChat } = require('../controllers/aiChat')
const { sendMsg } = require('./sendMsg')
const analyzeMsg = ( msgList,msg ) => {
    let isAnswer = false //是否需要回答
    let isSending = false //是否处于发送状态
    let hasAt = false // 是否有AT
    let hasReplyAndAt = false // 有AT且回复，启用上下文
    let texts = ''
    let replyInfo = null
    let msgRole = []

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

    if (replyInfo && hasAt) {
        hasReplyAndAt = true // 有AT且回复，启用上下文
    }
    console.log('hasAt',hasAt)
    if (hasAt&&!hasReplyAndAt) {
        console.log("检出所有 text 消息:", texts)
        msgRole.push({ role: 'user', content: texts })
        aiChat(msgRole)
            .then(res=>{
                sendMsg(res,msg)
            })
    }
    
    if (hasReplyAndAt) {
        const query = {
            message_id:replyInfo
        }
        axios.post(process.env.HTTPURL+'/get_msg',query)
            .then(res=>{
                res.data.data.message.forEach(item=>{
                    if(item.type==='text'){
                        msgRole.unshift({ role: 'assistant', content: item.data.text })
                        console.log(msgRole)
                        aiChat(msgRole)
                            .then(res=>{
                                sendMsg(res,msg)
                            })
                    }
                })
            })
            .catch(err=>{
                console.log('err',err)
            })
    }else{
        console.log(msgRole)
    }
    // aiChat(item.data.text)
    //     .then(res=>{
    //         sendMsg(res,msg)
    //     })
}

module.exports = { parseMsg }