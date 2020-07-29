import React, {Component} from "react";
import axios from "axios";

export default class Todos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }
    }

    async componentDidMount() {
        const USER = 'user';
        const PASSWORD = 'password';

        const response = await axios.get("/api/todos", {headers: {authorization: 'Basic' + window.btoa(USER + ":" + PASSWORD)}});
        const todos = response.data;
        console.log("These are the todos: " + todos);
        this.setState({todos})
    }

    render() {
        return (<div>
            <ul>
                {this.state.todos[0] && this.state.todos.map(todo => <li>todo.title</li>)};
            </ul>
        </div>)
    }
}