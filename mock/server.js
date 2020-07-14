// import express from 'express';
var express = require('express')
var app = express();
// const bodyParser = require('body-parser');

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

let router = express.Router();
app.get('/',(req,res)=> {
    res.send('hello world')
})

app.get('/api/login',function(req,res){
    // console.log(req,res)
    res.send('~~~~~~~~~~~')
})
// router.use('/api/login',require('./test'));
// app.use('/',router);
app.listen(3001,()=>{
    console.log('3001端口正在运行！')
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