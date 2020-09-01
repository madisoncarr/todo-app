import axios from 'axios'
import history from '../history'

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
        console.log("*************Call from thunk creator me");
        const res = await axios.get('http://localhost:8080/auth/me')
        dispatch(getUser(res.data || defaultUser))
    } catch (err) {
        console.error(err)
    }
}

export const auth = (username, password, method) => async dispatch => {
    let res;
    try {
        console.log("********** call from thunk creator auth");
        res = await axios.post(`http://localhost:8080/auth/${method}`, {username, password})
    } catch (authError) {
        return dispatch(getUser({error: authError}))
    }

    try {
        const {token, user} = res.data;
        console.log("********* res.data: ", res.data);
        setupAxiosInterceptors(token);
        dispatch(getUser(user))
        history.push('/todos')
        console.log("********** reached the end of thunk creator auth");
    } catch (dispatchOrHistoryErr) {
        console.error(dispatchOrHistoryErr)
    }
}

export const logout = () => async dispatch => {
    try {
        await axios.post('http://localhost:8080/auth/logout');
        ejectAxiosInterceptor();
        dispatch(removeUser());
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
            //Trying to figure out how to determine if a user is signed in and/or how to eject this interceptor
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