import { SET_ERROR, CLEAR_ERROR } from "../actionTypes";

const initialStore = {
    message: null
}

export default (state = initialStore, action) => {
    switch (action.type) {
        case SET_ERROR:
            return { ...state, message: action.payload };
        case CLEAR_ERROR:
            return { ...state, message: null };
        default:
            return state;
    }
}