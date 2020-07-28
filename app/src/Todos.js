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
        const response = await axios.get("/api/todos");
        const todos = response.data;
        this.setState({todos})
    }

    render() {
        return <div>
            <ul>
                this.state.todos.map(todo => <li>todo.title</li>);
            </ul>
        </div>
    }
}