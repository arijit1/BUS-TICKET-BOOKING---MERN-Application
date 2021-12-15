let status =false;

const Is_LOGIN = (state = status, action) => {
    switch (action.type) {
        case 'IS_LOGGEDIN':
            state =action.value;
            return state;
        default:
            return state;
    }
}
export default Is_LOGIN;