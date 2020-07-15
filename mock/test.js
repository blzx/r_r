const Mock = require('mockjs');
const express = require('express');

const router = express.Router();
router.use('/',(req,res) => {
    console.log(req.body);
    let data = Mock.mock({
        "data|3": {
            isLogin: true,
            userRole: 1,
            extra: '登录成功了~~'
        }
    })
    return res.json(data);
})

module.exports = router;