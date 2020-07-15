// import Mock from 'mockjs';
const Mock = require('mockjs');
// import express from 'express';
var express = require('express')
var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

let router = express.Router();
// app.get('/login',(req,res)=> {
//     // res.send('<h6>login</h6>');
//     let data = Mock.mock({
//         "data|3": {
//             isLogin: true,
//             userRole: 1,
//             extra: '登录成功了~~'
//         }
//     })
//     return res.json(data); // 发送json数据
// })

// app.get 是app.use 使用get方法的简写形式（第二个参数必须是一个回调函数）
// app.get('/api/login',function(req,res){
//     // console.log(req,res)
//     res.send('<h6>login</h6>')
// })

// router.use('/a',require('./test'));
// app.use(path,callback)  callback 可以是一个对象也可以是一个函数  path父级路由，router.use的path为子路由
app.use('/login',require('./test'));

app.listen(3001,()=>{
    console.log('3001 端口正在运行！')
})



// const http = require('http');
// http.createServer((req, res) => {
//     res.writeHead(200, {
//       'Content-Type': 'application/json;charset=utf-8',
//       'Access-Control-Allow-Origin': req.headers.origin,
//       'Access-Control-Allow-Methods': '*',
//       'Access-Control-Allow-Headers': '*',
//       'Access-Control-Allow-Credentials': true,
//       'Cache-Control': 'no-cache,no-store', // clear cache
//     })
//     if (req.method === 'OPTIONS') {
//       res.end(null)
//     }
//     if (req.method === 'POST') {
//       let postData = ''
//       req.addListener('data', dataBuffer => postData += dataBuffer)
//       req.addListener('end', () => {
//         postData = JSON.parse(postData)
//         const originData = _map[req.url]
//           ? Mock.mock({
//             "data|3": {
//                 isLogin: true,
//                 userRole: 1,
//                 extra: '登录成功了~~'
//             }
//           })
//           : ''
//       })
//     }
//   }).listen(1111)