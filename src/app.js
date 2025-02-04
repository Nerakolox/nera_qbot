const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')

// 加载环境变量
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// 中间件
app.use(cors())
app.use(express.json()) // 解析 JSON 请求体
app.use('/api/users', userRoutes)
// app.use(errorHandler)

// 示例路由
// import { listenMsg } from './controllers/listenMsg'
app.get('/', (req, res) => {
  res.send('')
  
})

// 启动服务器
const { listenMsg } = require('./controllers/listenMsg')
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  listenMsg()
})