import { GET_EVENTS, LOADING_EVENT, CREATE_EVENT } from '../actionTypes'
const initialStore = {
    isLoading: false,
    events: []
}

export default (state = initialStore, action) => {
    switch (action.type) {
        case LOADING_EVENT:
            return { ...state, isLoading: action.payload }
        case GET_EVENTS:
            return { ...state, events: action.payload }
        case CREATE_EVENT:
            return { ...state, events: [...state.events, action.payload] }
        default:
            return state;
    }
}