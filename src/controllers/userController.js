const getUsers = async (req, res) => {
    try {
         // 业务逻辑（如查询数据库）
         res.status(200).json({ users: [] })
    } catch (error) {
         res.status(500).json({ message: error.message })
    }
}

module.exports = { getUsers }