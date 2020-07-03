export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
    },
    reducers: {
        increment: state => {
            console.log(state)
            state.value += 1;
        },
        decrement: state => {
            state.value -= 1;
        },
        incrementByAmount: (state,action) => {
            state.value += action.payload;
        }
    }
});
console.log(counterSlice.actions)
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const incrementAsync = function (amount) {
    return function (dispatch) {
        return setTimeout(function () {
            return dispatch(incrementByAmount(amount))
        },1000)
    }
}

export const selectCount = state => state.counter.value;

export default counterSlice.reducer;




