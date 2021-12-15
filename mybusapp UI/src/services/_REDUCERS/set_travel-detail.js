let storeTravelDetail = [];

const store_travel_detail = (state = storeTravelDetail, action) => {
    switch (action.type) {
        case 'TRAVELDETAIL':
            state.pop();
            state.push(action.value);
            return state;
        default:
            return state;
    }
}
export default store_travel_detail;