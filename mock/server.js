// cosnt Mock require('mockjs');
const Mock = require('mockjs');
const express = require('express');
const {MongoClient} = require('mongodb') // require('mongodb') = connect; const {MongoClient} = connect;
const app = express();

async function connect(res){
    //连接 URL
    const url = 'mongodb://localhost:27017/my_database';
    try {
        await MongoClient.connect(url,{useNewUrlParser: true},(err,db)=> {
            // console.log(err,db) db: MongoClient{...}
            // 创建一个数据库 名为restuarants 一个数据库中可以存在多个集合（collection）
            let dbo = db.db('restuarants'); 
            let data = Mock.mock({
                "data|3": {
                    isLogin: true,
                    userRole: 1,
                    extra: '登录成功了~~'
                }
            })
            // 创建一个集合名为 content ；并将data文档插入集合中 一个集合可以存在多个文档（document） 
            dbo.collection('content').insert(data,(err,result) => {
                if(err){
                    console.log('存储数据失败');
                    return;
                }
                if(result) {
                    res.send('新增成功')
                }
            })
        })
        console.log('Connected successfully!')
    } catch (err){

    }
}
// connect();
app.get('/api/login',(req,res)=>{
    return connect(res);
})
// console.log(db)
// async function insertDocuments(){
//     // 获取文档集合
//     const collection = db.collection('restaurants');
//     // 插入一些文件
//     const result = await collection.insertMany([
//         {
//             name: 'Sun Bakery Trattoria',
//             stars: 4,
//             categories: [
//                 'Pizza','Pasta', 'Italain', 'Coffee', 'Sandwitches'
//             ]
//         },{
//             name: 'Blue Bagels Grill',
//             stars: 3,
//             categories: [
//                 'Bagels', 'Cookies', 'Sandwitches'
//             ]
//         }
//     ])
//     return result;
// }


// // 查询文档，并将数据存储为数组
// export async function findDocuments() {
//     const collection = db.collection('restuarants');
//     const docs = await collection.find({}).toArray();
//     console.log('以下为文档查询结果');
//     console.log(docs);
//     return docs;
// }

// // 建立索引
// export async function indexCollection (db){
//     const collection = db.collection('restuarants');

//     const result = await collection.createIndex({
//         name: 1
//     })

//     return result;
// }



const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

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