// import '../../mock/login';  // 不使用express
import React from 'react';

const loginService = {
    login() {
        return React.$http({
            method: 'get',
            url: '/api/login'
        })
    }
}


export default loginService;