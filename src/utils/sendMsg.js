const axios = require('axios')
const sendMsg = (query) => {
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