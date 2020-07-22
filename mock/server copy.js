// cosnt Mock require('mockjs');
const Mock = require('mockjs');
const express = require('express');
const {MongoClient} = require('mongodb') // require('mongodb') = connect; const {MongoClient} = connect;
const app = express();
const assert = require('assert')

// async function connect(){
//     //连接 URL
//     const url = 'mongodb://localhost:27017/my_database';
//     let restuarants;
//     try {
//         await MongoClient.connect(url,{useNewUrlParser: true},(err,db)=> {
//             // console.log(err,db) db: MongoClient{...}
//             // 创建一个数据库 名为restuarants 一个数据库中可以存在多个集合（collection）
//             restuarants = db.db('restuarants'); 
//             // 创建一个集合名为 content ；并将data文档插入集合中 一个集合可以存在多个文档（document） 
//             restuarants.collection('content');
//             // console.log('~~~~~~',restuarants)
//             // let data = {a:1}
//             // dbo.collection('content').insertMany(data,(err,result) => {
//             //     if(err){
//             //         console.log('存储数据失败');
//             //         return;
//             //     }
//             //     if(result) {
//             //        console.log('成功')
//             //     }
//             // })
//         })
//         console.log('连接成功！')
//         return restuarants;
//     } catch (err){

//     }
// }
// const restuarants = connect()

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
    // 插入文档
    // insertDocuments(db,function(){
    //     findDocuments(db)
    // })
    // client.close()
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

// 后端设置允许跨域
// app.all('*', function(req,res,next){
//     // 响应头指定了资源是否被允许与给定的origin共享。* 表示所有的域都可以访问
//     // 也可以将*改为指定的URL，表示只有指定的URL可以访问
//     res.header("Access-Control-Allow-Origin","*");
//     res.header("Access-Control-Allow-Headers","X-Requested-With");
//     // 允许请求资源的方式
//     res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS");
//     // res.header("X-Powered-By","3.2.1");
//     res.header("Content-Type","application/json;charset=utf-8");
//     res.header('Access-Control-Allow-Credentials','true');
//     next();
// })

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
// app.use('/api',require('./test'));

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