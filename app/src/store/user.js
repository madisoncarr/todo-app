import axios from 'axios'
import history from '../history'
import {setTodos, removeTodos} from './todos';
import Session from '../utils';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}
let axiosInterceptor = "";

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
    try {
        const token = Session.get("token");
        if (token) {
            setupAxiosInterceptors(token);
        }
        const res = await axios.get('http://localhost:8080/auth/me')
        const {user} = res.data;
        if (user) {
            const {todos} = user;
            delete user.todos;
            dispatch(setTodos(todos));
        }
        dispatch(getUser(res.data || defaultUser))
    } catch (err) {
        console.error(err)
    }
}

export const auth = (username, password, method) => async dispatch => {
    let res;
    try {
        res = await axios.post(`http://localhost:8080/auth/${method}`, {username, password})
    } catch (authError) {
        return dispatch(getUser({error: authError}))
    }

    try {
        const {token, user} = res.data;
        const {todos} = user;
        delete user.todos;
        Session.set("token", token);
        setupAxiosInterceptors(token);
        dispatch(getUser(user));
        dispatch(setTodos(todos));
        history.push('/todos')
    } catch (dispatchOrHistoryErr) {
        console.error(dispatchOrHistoryErr)
    }
}

export const logout = () => async dispatch => {
    try {
        await axios.post('http://localhost:8080/auth/logout');
        Session.remove("token");
        ejectAxiosInterceptor();
        dispatch(removeUser());
        dispatch(removeTodos());
        history.push('/login');
    } catch (err) {
        console.error(err);
    }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
    switch (action.type) {
        case GET_USER:
            return action.user;
        case REMOVE_USER:
            return defaultUser;
        default:
            return state;
    }
}

/**
 * UTILS
 */
function setupAxiosInterceptors(token) {
    token = createJWTToken(token);
    axiosInterceptor = axios.interceptors.request.use(
        (config) => {
            config.headers.authorization = token;
            return config;
        }
    )
}

function ejectAxiosInterceptor() {
    axios.interceptors.request.eject(axiosInterceptor);
}

function createJWTToken(token) {
    return 'Bearer ' + token;
}