const Mock = require('mockjs');
const express = require('express');
// const MongoClient = require('mongodb').MongoClient
const {MongoClient} = require('mongodb'); // require('mongodb') = connect; const {MongoClient} = connect;
const app = express();
const assert = require('assert');

// 封装一个连接数据库的方法
let _connectDB = (callback) => {
    const url = 'mongodb://localhost:27017';
    // 连接数据库
    MongoClient.connect(url,(err,db) => {
        if(err){
            callback(err,null);
            console.log('连接失败');
            return;
        }
        callback(err,db)
    })
}


// 官方文档给出的创建方法 如下：
const url = 'mongodb://localhost:27017';
// 数据库名称
const dbName = 'myproject';
let db;
// 创建一个新的 MongoClient
const client = new MongoClient(url,{ useUnifiedTopology: true });
// 使用连接方法连接到 server
client.connect(function(err){
    assert.equal(null,err);
    console.log('connected successfully to server!');
    db = client.db(dbName);
})
// 定义一个插入文档的方法
const insertDocuments = function(str){
    // 获取数据库 collection （如果没有则创建）
    const collection = db.collection('documents');
    str = JSON.parse(str)
    let data = [str]
    collection.insertMany(data,(err,result) => {
        if(err){
            console.log('存储数据失败');
            return;
        }
        if(result) {
            console.log('存储成功')
        }
    })
}

// 定义一个查询方法 (查询是否存在当前用户)
const findDocuments = (str) => {
    const collection = db.collection('documents')
    return new Promise(resolve=>{
        // 将查询方法定义成一个函数单独调用 就要放到promise中处理 如果不单独定义而是放到下面的接口中处理会比较简单
        // 条件查询{"username":"1"} 查询用户名为 1 的用户
        collection.find({"username":str.username}).toArray((err,docs) => {
            assert.equal(err,null);
            // console.log('docs',docs); // array
            resolve(docs)
        })
    })
}

app.use('/api/login',async (req,res)=>{
    let str = '';
    // 监听data 并接收
    req.on('data',function(chunk){
        str += chunk;
    })
    // 数据接收完毕
    await req.on('end',function(){
        console.log('str',str)
    })
    // 是否首次登录 通过查询用户名是否存在
    let firstLogin = false;
    const result = await findDocuments(str)  //放到then链中操作查询结果  findDocuments().then(result=>console.log(result));
    // console.log('result',result) // []
    if(!result.length){
        // 如果当前用户不存在则插入当前用户信息
        insertDocuments(str);
        firstLogin = true;
    }
    
    let data = Mock.mock({
        "data|3": {
            data: {
                isLogin: true,
                userRole: 1,
                firstLogin: firstLogin,
            },
            code: 200,
            msg: '登录成功了~~'
        }
    })
    res.json(data);
})

const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(3001,()=>{
    console.log('3001 端口正在运行！')
})