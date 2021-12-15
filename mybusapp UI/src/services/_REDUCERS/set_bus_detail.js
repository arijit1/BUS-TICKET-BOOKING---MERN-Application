let storeBusDetail = [];

const store_BUS_detail = (state = storeBusDetail, action) => {
    switch (action.type) {
        case 'BUSDETAIL':
            state.push(action.value);
            return state;
        default:
            return state;
    }
}
export default store_BUS_detail;