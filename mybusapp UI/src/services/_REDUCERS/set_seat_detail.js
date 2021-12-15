let storeSeatDetail = [];

const store_SEAT_detail = (state = storeSeatDetail, action) => {
    switch (action.type) {
        case 'SEATDETAIL':
            state.pop();
            state.push(action.value);
            return state;
        default:
            return state;
    }
}
export default store_SEAT_detail;