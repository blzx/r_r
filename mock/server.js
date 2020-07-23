const Mock = require('mockjs');
const express = require('express');
// const MongoClient = require('mongodb').MongoClient
const {MongoClient} = require('mongodb'); // require('mongodb') = connect; const {MongoClient} = connect;
const assert = require('assert');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();

class Jwt {
    constructor(data){
        this.data = data;
    }

    // 生成token
    generateToken() {
        let data = this.data;
    }
}

// 封装一个连接数据库的方法 每次操作数据先连接数据库 将 db 传给 callback（增删改查方法）
let _connectDB = (callback) => {
    const url = 'mongodb://localhost:27017';
    // 连接数据库
    let client = new MongoClient(url,{ useUnifiedTopology: true });
    client.connect((err,db) => {
        // console.log('err',err,'db',db)
        if(err){
            // callback(err,null);
            console.log('连接失败');
            return;
        }
        console.log('连接成功')
        callback(client.db(),client)
    })
}

// 查询数据方法
let findData = (reqData,collection) => {
    return new Promise(resolve => {
        _connectDB((db,client) => {
            db.collection(collection).find({"username":reqData.username}).toArray((err,docs) => {
                resolve(docs)
            })
        })
    })
}

// 插入数据方法
let insertData = (chunkData,collection) => {
    let data = [JSON.parse(chunkData)];
    _connectDB((db,client) => {
        db.collection(collection).insertMany(data,(err,result)=> {
            if(err){
                console.log('存储数据失败!');
                client.close()
                return
            }
            if(result){
                console.log('存储数据成功!')
                client.close();
            }
        })
    })
}

app.use('/api/login', (req,res) => {
    let reqData = '';
    req.on('data', (chunk)=>{
        reqData += chunk;
    })
    req.on('end', () => {
        let firstLogin = false;
        // 查询数据库用户信息 传入接收的数据和要查询的集合名称
        findData(reqData,'documents').then(result => {
            if(!result.length){
                console.log('result',result)
                insertData(reqData,'documents')
                this.firstLogin = true;
            }
        })
        let data = Mock.mock({
            "data|3": {
                data: {
                    isLogin: true,
                    userRole: 1,
                    firstLogin: firstLogin,
                },
                token: 'sdfa987aoisjda987dsf9a',
                code: 200,
                msg: '登录成功了~~'
            }
        })
        res.json(data);
    })
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(3001,()=>{
    console.log('3001 端口正在运行！')
})