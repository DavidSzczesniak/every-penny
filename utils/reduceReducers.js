export function reduceReducers(...reducers) {
    return (state, action) =>
        reducers.reduce((acc, nextReducer) => nextReducer(acc, action), state);
}
