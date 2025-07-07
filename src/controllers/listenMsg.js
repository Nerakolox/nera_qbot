const WebSocket = require('ws')
const { parseMsg } = require('../utils/parseMsg')
const listenMsg = () => {
    console.log(1)
    // 创建 WebSocket 连接
    console.log(process.env.LISTENMSGURL)
    const ws = new WebSocket(process.env.LISTENMSGURL)
    ws.isAlive = true

    ws.on('pong', () => {
        ws.isAlive = true
    })

    // 定期检查连接状态
    // setInterval(() => {
        // ws.clients.forEach((ws) => {
        //     if (!ws.isAlive) return ws.terminate()
        //     ws.isAlive = false
        //     ws.ping()
        // })
    // }, 30000)
    // 监听连接成功事件
    ws.on('open', () => {
        console.log('连接到ws服务器')
    })

    // 监听服务端消息
    ws.on('message', (data) => {
        if (data instanceof ArrayBuffer) {
            const buffer = Buffer.from(data)
            console.log('接收到消息:buffer:', buffer)
        }else{
            // console.log('新消息：',data)
            parseMsg(data)
        }
    })

    // 监听连接关闭事件
    ws.on('close', () => {
        console.log('从服务器断开连接')
    })

    // 监听错误事件
    ws.on('error', (error) => {
        console.error('WS错误:', error);
    });
}

module.exports = { listenMsg }