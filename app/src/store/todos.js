import axios from 'axios';

const SET_TODOS = 'SET_TODOS';
const REMOVE_TODOS = 'REMOVE_TODOS';
const ADD_TODO = 'ADD_TODO';

const defaultTodos = [];

export const setTodos = todos => {
    return {
        type: SET_TODOS,
        todos
    }
}

export const removeTodos = () => {
    return {
        type: REMOVE_TODOS
    }
}

export const addTodo = todo => {
    return {
        type: ADD_TODO,
        todo
    }
}

export default function(state = defaultTodos, action) {
    switch (action.type) {
        case SET_TODOS:
            return action.todos;
        case REMOVE_TODOS:
            return [];
        case ADD_TODO:
            return [...state, action.todo];
        default:
            return state;
    }
}

export const postTodo = todo => async dispatch => {
    try {
        const {data} = await axios.post('http://localhost:8080/todos', todo);
        dispatch(addTodo(data));
    } catch (error) {
        console.error(error);
    }
}

