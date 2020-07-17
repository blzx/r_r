// import Mock from 'mockjs';
const Mock = require('mockjs');
// import express from 'express';
const express = require('express');
const mongoose = require('mongoose');
const DB_URL = 'http://localhost:27017';
// 连接数据库
mongoose.connect(DB_URL);
// mongoose.connection.on('connected',function(){
//     console.log('mongo 连接成功')
// })

// 创建模型
// const UserSchema = new mongoose.Schema({
//     name: String,
//     paw: String,
//     meta: {
//         createAt: {
//             type: Date,
//             default: Date.now()
//         },
//         updateAt: {
//             type: Date,
//             default: Date.now()
//         }
//     }
// })

// UserSchema.pre('save',function(next){
//     if(this.isNew){
//         this.meta.createAt = this.meta.updateAt = Date.now();
//     } else {
//         this.meta.updateAt = Date.now();
//     }

//     next();
// })

// // 查询的静态方法
// UserSchema.statics = {
//     fetch: function(cb){
//         return this.find()
//         .sort('meta.updateAt') // 排序
//         .exec(cb) // 回调
//     },
//     findById: function(id,cb){ // 根据id查询单条数据
//         return this.findOne({_id: id})
//         .exec(cb)
//     }
// }

// const router = express.Router();
// router.get('/',function(req,res,next){
//     res.send('respond with a resource')
// })

// router.get('/users',function(req,res,next){
//     Users.fetch(function(err,users){
//         if(err){
//             console.log(err);
//         }
//         res.render('users',{title:'用户列表',users: users})
//     })
// })

// const { Schema } = mongoose;
// const userSchema = new Schema({
//     name: {
//         type: String, // 类型
//         default: Date.now // 默认值
//     },
//     avatar: {
//         type: String,
//         required: true // 必须项
//     },
//     user: String,
//     password: String,
//     hash: String,
//     score: Number,
//     learn: Array,
//     message: Array,
//     star: Array,
//     sign: Array,

// })

// const 



// 创建user模型
const User = mongoose.model('users',new mongoose.Schema({
    name:{type: String, require: true},
    age:{type: Number, require: true}
}));

// 新增数据
// 方法一
const userModel = new User({name:'sk',age:12});
userModel.save(function(err,doc) {
    console.log(doc);
    if(err){
        return res.json({
            code:1,
            msg:'服务器忙'
        })
    }
    const { name, age } = doc;
    // res.cookie('user_id', id);
    return res.json({code:0,data: {name, age}})
})

// 方法二：
// user.create({username:'sk',type:'string',pwd:md5Pwd(123)}, function(err,doc){
//     console.log(doc);
//     if(err){
//         return res.json({
//             code:1,
//             msg:'后台出错了'
//         })
//     }
//     return res.json({code:0})
// })


const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.all('*', function(req,res,next){
    // 响应头指定了资源是否被允许与给定的origin共享。* 表示所有的域都可以访问
    // 也可以将*改为指定的URL，表示只有指定的URL可以访问
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","X-Requested-With");
    // 允许请求资源的方式
    res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS");
    // res.header("X-Powered-By","3.2.1");
    res.header("Content-Type","application/json;charset=utf-8");
    res.header('Access-Control-Allow-Credentials','true');
    next();
})

// let router = express.Router();
// app.get('/api',(req,res)=> {
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
app.use('/api',require('./test'));

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