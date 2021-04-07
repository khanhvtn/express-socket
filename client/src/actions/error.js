import { SET_ERROR, CLEAR_ERROR } from '../actionTypes'
export const setError = (message) => (dispatch) => {
    dispatch({
        type: SET_ERROR,
        payload: message
    })
}
export const clearError = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERROR,
        payload: null
    })
}