import React, {Component} from "react";
import TodoForm from "./TodoForm";

class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "title": "",
            "deadline": "",
            "importance": 0
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    };

    render() {
        return (
            <TodoForm
                todo={this.state}
                handleChange={this.handleChange}
            />
        );
    }
}