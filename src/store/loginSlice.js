import { createSlice } from '@reduxjs/toolkit';


const loginSlice = createSlice({
    name: 'login',
    initialState: {
        firstLogin: false,
        userInfo: {},
        token:null
    },
    reducers: {
        // logined: (state, action) => {  // 如果需要传参（payload）此写法错误
        //     state.userInfo = action.payload.userInfo;
        //     state.firstLogin = action.payload.firstLogin
        // },
        isLogin: {
            reducer: (state, action) => {
                state = action.payload;
                return state;
            },
            prepare: (userInfo, firstLogin, token) => {
                return {
                    payload: {userInfo,firstLogin,token}
                }
            }
        },
        
    }
})

export const { isLogin } = loginSlice.actions;
export default loginSlice.reducer;