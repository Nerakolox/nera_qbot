const axios = require('axios')
const sendMsg = ( answer,data ) =>{
    const query = {
        group_id: data.group_id,
        message: [
          {
            type: "reply",
            data: {
              id: data.message_id
            }
          },
          {
            type: "text",
            data: {
              text: answer
            }
          }
        ]
    }
    console.log(query)
    axios.post(process.env.HTTPURL+'/send_group_msg',query)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log('err',err)
        })
}

module.exports = { sendMsg }