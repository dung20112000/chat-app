import {OFF_LOADING, ON_LOADING} from "../types/loading.types.redux";

const initialState = false;

const LoadingReducer = (state = initialState,action:any)=>{
    const {type} = action;
    switch (type){
        case (ON_LOADING):
            return true;
        case (OFF_LOADING):
            return false;
        default:
            return state;
    }
}
export default LoadingReducer;