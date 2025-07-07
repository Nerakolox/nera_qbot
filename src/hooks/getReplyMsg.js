const axios = require('axios')

const getReplyMsg = async (msgInfo) => {
    const msg = msgInfo
    console.log(msg)
    // if(msg.type === 'reply'){
    //     console.log(msg.data)
    //     const msgResponse = await axios.post(process.env.HTTPURL + '/get_msg', {
    //         message_id: msg.data.id,
    //     })
    //     console.log(msgResponse.data)
    // }
}

module.exports = { getReplyMsg }