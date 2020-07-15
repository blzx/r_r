// import loginService from "../../server/login";

// const LOGIN = 'LOGIN';
// const loginStatus = userInfo => {
//     return {
//         type: LOGIN,
//         userInfo: userInfo
//     }
// }
// export default loginStatus


/////////////// 以下使用 @redux/toolkit 工具 //////////////////

import { createAction, nanoid } from '@reduxjs/toolkit';
const increment = createAction('counter/increment');
let action = increment();
console.log(action) // {type: 'counter/increment}
action = increment(3);
// returns {type: 'counter/increment', payload: 3}
console.log(increment.toString());
// 'counter/increment'

console.log(`The action type is ${increment}`);
// 'The action type is counter/increment'


// createAction 是一个 action creater 生成器
// 接受两个参数 第一个参数是 action 的 type ，第二个参数是 callback 函数
// callback 函数用于构造 payload

const addTodo = createAction('todos/add',function prepare(text){
    return {
        payload: {
            text,
            id: nanoid(),
            createdAt: new Date().toISOString() // 创建时间戳
        }
    }
})

console.log(addTodo('this is payload value'));
/**
 * {
 *      type: 'todos/add',
 *      payload: {
 *          text: 'this is payload value',
 *          id: '4AJvwMSWEHCchcWYga3dj',
 *          createdAt: '2019-10-03T07:53:36.581Z'
 *      }
 * }
 **/

 export {addTodo}

