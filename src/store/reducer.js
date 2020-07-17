// import { combineReducers } from 'redux';

// const LOGIN = 'LOGIN';

// const defaultState = {login: false,userInfo:{}}
// // const defaultState = [1]
// const loginReducer = (state=defaultState,action) => {
//     // if(action.type == LOGIN){
//     //     return [...state,2]
//     // }else{
//     //     return state
//     // }
//     // 直接返回一个新的 state 并没有更新成功，直接修改反而成功了???????????
//     switch (action.type){
//         case LOGIN:
//             state.login = true;
//             state.userInfo = action.userInfo
//         default: 
//             return state
//     }
// }
// export default combineReducers({
//     login: loginReducer
// })

////////////以上使用原始写法，没有使用redux toolkit工具////////////

import { createSlice, createReducer, createAsyncThunk, createAction, current } from '@reduxjs/toolkit';
import { addTodo } from './action/action'
import { convertTypeAcquisitionFromJson } from 'typescript';
const initialState = {
    counter: 0,
    rejectedActions: 0,
    unhandleActions: 0
}

const todoReducer = createReducer(
    initialState,
    // builder => {
    //     builder
    //         .addCase(
    //             [addTodo],
    //             (state, action) => {
    //                 return {...state,a:1}
    //             }
    //         )
    //         .addMatcher(
    //             action => action.type === 'todos/add',
    //             (state, action) => {
    //                 state.counter++;
    //             }
    //         )
    //         .addDefaultCase(
    //             (state,action) => {
    //                 return state;
    //             }
    //         )
    // }
    {
        [addTodo]: (state, action) => [1,2,3]
    }
)
export default todoReducer;

























// createReducer 接受四个参数，前两个是必传
    // initialState 第一次调用reducer时的初始状态
    // caseReducers action type 到 caseReducer 的对象映射；简化了 switch case 的操作
    // actionMatchers 可选参数（对象数组） 包括一个matcher函数和一个reducer函数 如果第二个参数是 builder callback 则忽略该参数
    // defaultCase 可选参数（默认reducer） 如果第二个参数是 builder callback 则忽略此参数

const increment = createAction('increment');
const decrement = createAction('decrement');
const isStringPayloadAction = action => typeof action.payload === 'string';

const counterReducer = createReducer(
    initialState,
    // {
    // caseReducers
    // increment: (state, action) => state + action.payload,
    // decrement: (state, action) => state + action.payload

    // 使用计算属性的写法  将creteAction生成的action creator 直接用作对象的key
    // [increment]: (state, action) => state + action.payload,
    // [decrement]: (state, actoin) => state + action.payload
// }
// caseReducer 可能是一个builder 回调函数 这样将忽略第三个和第四个参数
    
    builder => {
        // builder.addCase 用来处理特定的 action； 如果有多个 action 处理，可以连续调用多个 addCase
        // 第一个参数可以是普通 action 的 type 字符串，也可以是使用createAction生成的用于确定cation类型的cation creator
        // addCase 必须出现在 addMatcher 和 addDefaultCase 之前
        builder.addCase('counter',state => {
            console.log('before',current(state)) // current 便于查看当前状态
            state.counter++;
            console.log('after', current(state))
        })
        // addMatcher 允许将reducer和自己的过滤器函数相匹配，而不仅仅是 action type 属性
        // 根据不同的匹配函数 来执行不同的reducer
        .addMatcher(
            // 返回 true（匹配成功） 将执行下面的 reducer
            action => action.type.endsWith('/rejected') && 'requestId' in action.meta,
            (state, action) => {
                state[action.meta.requestId] = 'rejected'
            }
        )
        .addMatcher( // 同上
            action => action.type.endWith('fulfilled') && 'requestId' in action.meta,
            (state, action) => {
                state[action.meta.requestId] = 'fulfilled'
            }
        )
        // addDefaultCase 默认reducer
        .addDefaultCase(
            (state, action) => {
                state.unhandleActions ++
            }
        )
    }
    // 也可以将matchers 和 default case 作为参数 （对象表示法，不使用 builder callback 的写法 ）
    // 传递一个数组对象[{matcher,reducer}] 作为第三个参数和一个默认的 case reducer 作为第四个参数
    // 第一个和第二个参数分别是 默认state 和 normal reducer

    // initial state
        /* { strLen: 0, nonStringActions: 0 }, */
    // normal reducer
    /* {
        ...
    } */
    // array of matcher reducers
    // [
    //     {
    //         matcher: isStringPayloadAction,
    //         reducer(state, action) {
    //             state.strLen += action.payload.length
    //         }
    //     }
    // ]
    // default reducer
    // state => {
    //     ...
    // }


)
// 使用immer 可以直接修改state














// const counterSlice = createSlice({
//     name: 'counter',
//     initialState,
//     reducer:{
//         increament: state=> { // 这是一个reducer
//             state.value + 1;
//         }
//     },
//     extraReducers: builder => 
//         builder
//             .addCase(incrementBy,(state,action) => {

//             })
//             .addCase(decrement, (state,action) => {

//             })
// })


