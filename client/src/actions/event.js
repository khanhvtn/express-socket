import { getEvents } from '../api'
import { GET_EVENTS, LOADING_EVENT, CREATE_EVENT } from '../actionTypes'
export const getAllEvents = () => async (dispatch) => {
    try {
        //set loading status for event store
        dispatch({
            type: LOADING_EVENT,
            payload: true,
        })
        const { data } = await getEvents();

        //set event data for event store
        dispatch({
            type: GET_EVENTS,
            payload: data
        })
        //set loading status to false after events are loaded.
        dispatch({
            type: LOADING_EVENT,
            payload: false,
        })

    } catch (error) {
        //TODO: dispatch to error store
        console.log(error.message)
        //set loading status to false after events are loaded.
        dispatch({
            type: LOADING_EVENT,
            payload: false,
        })
    }
}

export const createEvent = (event) => (dispatch) => {
    dispatch({
        type: CREATE_EVENT,
        payload: event
    })
}