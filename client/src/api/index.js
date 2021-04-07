import axios from 'axios'

const AXIOS = axios.create({
    baseURL: 'http://localhost:5000/api'
})


//Event APIs
export const getEvents = () => AXIOS.get('/event/all');

//User APIs
export const getAllUsers = () => AXIOS.get('user/');
export const getAnUser = (id) => AXIOS.get(`user/${id}`);
export const createAnUser = (newUser) => AXIOS.post(`user/create`, newUser);
export const updateAnUser = (updatedUser) => AXIOS.patch(`user/update`, updatedUser);
export const deleteAnUser = (id) => AXIOS.delete(`user/delete/${id}`);
export const loginUser = (userReq) => AXIOS.post('user/login', userReq);
export const checkCurrentUser = (token) => AXIOS.post('user/checkCurrentUser', { token });