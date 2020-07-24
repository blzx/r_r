const Mock = require('mockjs');
const express = require('express');
// const MongoClient = require('mongodb').MongoClient
const {MongoClient} = require('mongodb'); // require('mongodb') = connect; const {MongoClient} = connect;
const assert = require('assert');
const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
const moment = require('moment');
const jwt = require('jwt-simple');
const Buffer = require('Buffer').Buffer;
const app = express();


let token = jwt.encode({foo:'bar'},'xxx','HS512');
console.log(token)
// 设置过期时间
const expires = moment();
console.log(new Date(1598325645312))

console.log('moment时间',expires)

// let token = jwt.encode({
//     iss: 18973183219873912,
//     exp: expires
// },app.get('jwtTokenSecret'))

// 封装一个连接数据库的方法 每次操作数据先连接数据库 将 db 传给 callback（增删改查方法）
let _connectDB = (callback) => {
    const url = 'mongodb://localhost:27017/myproject';
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
    let data = [chunkData];
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
        reqData = JSON.parse(reqData)
        // 查询数据库用户信息 传入接收的数据和要查询的集合名称
        findData(reqData,'documents').then(result => {
            // if(!result.length){ // 如果不存在当前用户则插入一条
            //     insertData(reqData,'documents')
            //     this.firstLogin = true;
            //     let data = Mock.mock({
            //         data: {
            //             isLogin: true,
            //             userRole: 1,
            //             firstLogin: firstLogin,
            //             token: 'sdfa987aoisjda987dsf9a',
            //             msg: '登录成功了~~'
            //         }
            //     })
            //     res.json(data);
            // }else{
                if(result[0].password != reqData.password){
                    let data = Mock.mock({
                        "msg": '密码错误~~'
                    })
                    res.json(data,400);
                    assert(false,'密码错误')
                }else{
                    let data = Mock.mock({
                        data: {
                            isLogin: true,
                            userRole: 1,
                            firstLogin: firstLogin,
                            token: token,
                            msg: '登录成功了~~'
                        }
                    })
                    res.json(data);
                }
            // }
        })
    })
})

app.use('/api/changepassword',(req,res,next) => {
    let reqData = '';
    req.on('data',chunk => {
        reqData += chunk;
    });
    req.on('end',() => {
        if(reqData.token !== token){
            let data = Mock.mock({
                msg: 'token已过期！'
            })
            res.status(401).json(data)
        }
    })
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(3001,()=>{
    console.log('3001 端口正在运行！')
})