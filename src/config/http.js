import axios from 'axios';

let localToken = localStorage.getItem('token')
// axios.defaults.headers.common['token'] = localToken;
const service = axios.create({
    baseURL: '/', 
    timeOut: 5000,
    headers: {
        'Content-Type': 'application/json',
        'token': localToken
    }
    // headers: {'X-Custom-Header': 'foobar'}
});

// axios.create([config])
// config配置说明：
    // config = {
    //     // 接口地址 必须
    //     url: '/login',
    //     // 如果没传，默认使用get请求
    //     method: 'get',
    //     // 相对URL 接口名'/login'前面的path  整体请求路径：'https://some-domain.com/api/login'
    //     baseURL: 'https://some-domain.com/api',
    //     // transformRequest 允许在请求服务器之前 修改请求数据
    //     // 请求方法仅限于 'POST' 'PUT' 'PATCH' 数组中函数的返回值必须是 string 或 ArrayBuffer 或 Stream
    //     transformRequest: [
    //         // 可对data进行任意转换处理
    //         data => data
    //     ],
    //     // 在传递给 catch/then 前，transformResponse 允许修改响应数据
    //     transformResponse: [
    //         // 对data进行处理
    //         data => data
    //     ],
    //     // headers 是即将被发送的自定义请求头
    //     headers: { 'X-Request-with': 'XMLHttpRequest'},
    //     // params 是URL请求参数 
    //     // 必须是一个纯对象 或 URLSearchParams（'new URLSearchParams("q=URLUtils.searchParams&topic=api")'） 对象 
    //     params: {
    //         id: 1
    //     },
    //     // 负责 params 序列化的函数
    //     paramsSerializer: function(params){
    //         // qs 是npm仓库所管理的一个包，可以通过 npm install qs 命令安装
    //         // qs.parse()将url解析成对象的形式  qs.parse('method=query_sql_dataset_data&projectId=85')
    //         // qs.stringify() 将对象序列化成URL，使用 & 拼接  
    //         // 有时后台获取不到提交的数组参数，就需要将数组参数序列化: 例如：
    //         // qs.stringify({a: ['b','c']},{arrayFormat:'brackets'})  // 'a[]=b&a[]=c'
    //         return Qs.stringify(params,{arrayFormat: 'brackets'})
    //     },
    //     // data 作为请求主体被发送的数据 只适用于 POST PUT PATCH
    //     // 在没有设置tansformRequest时，必须是以下类型之一： 
    //     // string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
    //     // 浏览器专属： FromData, File, Blob
    //     // Node 专属： Stream
    //     data: {
    //         username: 'aaa'
    //     },
    //     // 请求超时时间（0表示无超时时间） 超时后请求终端
    //     timeout: 5000,
    //     // 跨域时是否需要凭证 默认为false
    //     withCredentials: false,
    //     // 自定义处理请求  待详查
    //     adapter: function(config) {
    //         //...
    //     },
    //     // 使用http基础验证，并提供凭证
    //     // 此时将设置一个 authorization 头，覆盖掉现有的header中的自定义 authorization 头
    //     auth: {
    //         username: 'user',
    //         password: '123'
    //     },
    //     // 服务器响应数据类型 可以是arraybuffer, blob, document, json, text, stream
    //     responseType: 'json', // default
    //     // 响应数据编码格式
    //     responseEncoding: 'utf8', // default
    //     // 用作 xsrf token 值的 cookie 名称
    //     xsrfCookieName: 'XSRF-TOKEN', // default
    //     // 携带 xsrf token 值的http 头名称
    //     xsrfHeaderName: 'X-XSRF-TOKEN', // default、
    //     // 上传进度事件处理
    //     onUploadProgress: function(progressEvent){
    //         // 对原生进度事件的处理
    //     },
    //     // 下载进度事件的处理
    //     onDownloadProgress: function(progressEvent){
    //         // 对原生进度事件的处理
    //     },
    //     // 定义相应内容的最大尺寸
    //     maxContentLength: 2000,
    //     // 定义对于给定的HTTP状态码 resolve 还是 reject ，如果validateStatus返回true（或是设置成 null/undefined）则执行resolve，否则执行 reject
    //     validateStatus: function(status){
    //         return status >= 200 && status < 300; // default
    //     },
    //     // 定义在nodejs中follow的最大重定向数目  如果定义为0，将不会 follow任何重定向
    //     maxRedirect: 5,
    //     // 分别在nodejs 中定义在执行 http 和 https 时使用的自定义代理，允许下面的配置
    //     // keepAlive 默认没有启用
    //     httpAgent: new http.Agent({keepAlive: true}),
    //     httpsAgent: new https.Agent({keepAlive: true}),
    //     // 定义代理服务器的主机名称和端口
    //     // auth 表示http 基础验证应当用于连接代理，并提供凭证
    //     // 这将会设置一个 Proxy-Authorization 头，覆盖已有的通过 header 定义的 Proxy-Authorization
    //     proxy: {
    //         host: '127.0.0.1',
    //         port: 8009,
    //         auth: {
    //             username: 'safsda',
    //             password: '3242'
    //         }
    //     },
    //     // cancelToken 指定用于取消请求的cancel token
    //     // 待查
    //     cancelToken: new CancelToken(function(cancel){
            
    //     })
    // }

// 请求拦截
service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截
service.interceptors.response.use(
    res => {
        // console.log(res)
        if(res.status == 200){
            return Promise.resolve(res.data.data)
        }
        return Promise.reject({data: res.data})
    },
    error => {
        // console.log(error);
        if(error.response){
            return Promise.reject(error.response);
        }
        return Promise.reject(error);
    }
)

export default service;