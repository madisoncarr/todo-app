import axios from 'axios';

const SET_TODOS = 'SET_TODOS';
const REMOVE_TODOS = 'REMOVE_TODOS';

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

export default function(state = defaultTodos, action) {
    switch (action.type) {
        case SET_TODOS:
            return action.todos;
        case REMOVE_TODOS:
            return [];
        default:
            return state;
    }
}

