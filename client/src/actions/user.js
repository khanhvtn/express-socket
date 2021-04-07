import { checkCurrentUser, loginUser } from "../api";
import { CHECKING_USER, LOADING_USER, LOGIN_USER } from '../actionTypes'
import { setError } from "./error";

//create a function to set loading status
const setIsLoading = (status, dispatch) => {
    dispatch({
        type: LOADING_USER,
        payload: status
    })
}

export const login = (userReq, history) => async (dispatch) => {
    try {
        //set loading user to true
        setIsLoading(true, dispatch)

        //get user info from the server
        const { data } = await loginUser(userReq);

        //set token to local storage
        window.localStorage.setItem('userToken', JSON.stringify(data.token))

        //set current user info to the store
        dispatch({
            type: LOGIN_USER,
            payload: data.user
        })

        /*
            Redirect user to home page
            1: Admin
            2: Reviewer
            3: Team member
        */
        const { role } = data.user;
        role === "1" ? history.push('/admin') : role === '2' ? history.push('/reviewer') : history.push('/member');
    } catch (error) {
        //set error to the store
        dispatch(setError(error.response.data?.message))

    }
    //set loading user to false
    setIsLoading(false, dispatch)
}
export const checkUser = (history) => async (dispatch) => {
    try {
        //set checking user status to true
        dispatch({
            type: CHECKING_USER,
            payload: true
        })

        //get token from local storage
        const token = JSON.parse(localStorage.getItem('userToken'))

        //if token doesn't exists redirect to login
        if (!token) {
            //set checking user status to false
            dispatch({
                type: CHECKING_USER,
                payload: false
            })
            return history.push("/")
        }

        //get user info from the server
        const { data } = await checkCurrentUser(token);

        /*
            Redirect user to home page
            1: Admin
            2: Reviewer
            3: Team member
        */
        const { role } = data;
        role === "1" ? history.push('/admin') : role === '2' ? history.push('/reviewer') : history.push('/member');
    } catch (error) {
        console.log(error)
        //set error to the store
        // dispatch(setError(error.response.data?.message))

        //redirect to login
        history.push('/')

    }
    console.log("here")
    //set checking user status to false
    dispatch({
        type: CHECKING_USER,
        payload: false
    })
}