// import { createStore } from 'redux';
// import reducer from './reducer';

// export default createStore(reducer);

////////////以上使用原始写法，没有使用redux toolkit工具////////////
// configureStore 是Recux createStore()函数的一个抽象，增加了默认设置，开发体验更加友好
import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import todoReducer from './reducer';
const rootReducer = combineReducers({todoReducer});
 const store = configureStore({reducer: rootReducer});
 export default store;

