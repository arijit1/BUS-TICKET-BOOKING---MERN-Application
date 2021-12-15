let loginStatus = [];

const store_LOGIN_detail = (state = loginStatus, action) => {
    switch (action.type) {
        case 'LOGIN':
            state.pop();
            state.push(action.value);
            return state;
        default:
            return state;
    }
}
export default store_LOGIN_detail;