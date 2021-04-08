import { LOGIN_USER, LOADING_USER, GET_USERS, CHECKING_USER, LOGOUT_USER } from "../actionTypes";
//initiate store
const initialStore = {
    isLoading: false,
    isCheckingUser: false,
    currentUser: null,
    users: []
}

export default (state = initialStore, action) => {
    switch (action.type) {
        case LOADING_USER:
            return { ...state, isLoading: action.payload };
        case CHECKING_USER:
            return { ...state, isCheckingUser: action.payload };
        case LOGIN_USER:
            return { ...state, currentUser: action.payload };
        case LOGOUT_USER:
            //remove user local storage
            localStorage.removeItem('userToken');
            return { ...state, ...initialStore };
        case GET_USERS:
            return { ...state, users: action.payload };
        default:
            return state;
    }

}