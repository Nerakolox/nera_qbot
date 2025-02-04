const parseMsg = ( msg ) => {
    const data = JSON.parse(msg)
    // console.log(data)
    if(data.sender){
        //QQ消息处理逻辑
        analyzeMsg(data.message,data)
    }
}


const { aiChat } = require('../controllers/aiChat')
const { sendMsg } = require('./sendMsg')
const analyzeMsg = ( msgList,msg ) => {
    let isAnswer = false
    let isSending = false
    msgList.forEach(item => {
        if(item.type==='at'&&item.data.qq==process.env.BOTQQ){
            isAnswer = true
        }
        if(isAnswer){
            if(item.type == 'text' && !isSending){
                console.log(item.data.text)
                aiChat(item.data.text)
                    .then(res=>{
                        sendMsg(res,msg)
                    })
            }
        }
    })
}

module.exports = { parseMsg }