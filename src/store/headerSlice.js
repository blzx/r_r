import { createSlice } from '@reduxjs/toolkit';

const headerSlice = createSlice({
    name: 'header',
    initialState: {
        num: 0
    },
    reducers: {
        increment: (state, action) => {
            state.num += 1;
        },
        decrement: (state, action) => {
            state.num += 2;
        }
    }
})

console.log(headerSlice.actions);
export const { increment, decrement }  = headerSlice.actions;
export const selectNum = state => state.header.num;
export default headerSlice.reducer