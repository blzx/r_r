// import '../../mock/login';  // 不使用express
import React from 'react';

const loginService = {
    // 将参数放在query中
    // login(params) {
    //     return React.$http({
    //         method: 'post',
    //         url: '/api/login',
    //         params: params
    //     })
    // }
    // 将参数放在body中
    // 以流的方式传递，node接收需要使用req.on('data',chunk => ''+=chunk);监听data
    login(params) {
        return React.$http.post('/api/login',params)
    }
    // 将参数放在query中 后台接收使用req.query
    // login(params) {
    //     return React.$http.post('/api/login',{params: params})
    // }
}


export default loginService;