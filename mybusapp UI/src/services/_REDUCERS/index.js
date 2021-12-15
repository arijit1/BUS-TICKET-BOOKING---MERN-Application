import store_travel_detail from './set_travel-detail';
import store_BUS_detail from './set_bus_detail';
import store_SEAT_detail from './set_seat_detail';
import store_LOGIN_detail from './loginStore';
import Is_LOGIN from './loginSession';
import { combineReducers } from 'redux';


const allReducer = combineReducers({
   counter_travel_detail: store_travel_detail,
   counter_bus: store_BUS_detail,
   counter_seat : store_SEAT_detail,
   counter_loggin : store_LOGIN_detail,
   counter_IS_LOGGED : Is_LOGIN
});
export default allReducer;