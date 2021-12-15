export const StoreTravelDetail = (n) => {
    return {
        type: 'TRAVELDETAIL',
        payload: n
    }
}
export const StoreBusDetail = (n) => {
    return {
        type: 'BUSDETAIL',
        payload: n
    }
}
export const storeBusSeatDetail = (n)=>{
    return{
        type: 'SEATDETAIL',
        payload: n
    }
}
export const loginValidation = (n)=>{
    return{
        type: 'LOGIN',
        payload: n
    }
}
export const checkUserStillLogin = (n)=>{
    return{
        type: 'IS_LOGGEDIN',
        payload: n
    }
}
