import Mock from 'mockjs';

Mock.mock('/login',{
    "data|2": {
        isLogin: true,
        userRole: 1,
        extra: '登录成功了~~'
    }
})