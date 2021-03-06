import React, {Component} from "react";
import TodoForm from "./TodoForm";
import {postTodo} from "../store";
import {connect} from 'react-redux'

class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "title": "",
            "deadline": "",
            "importance": 1
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.addTodo(this.state);
        this.props.history.push('/todos');
    }

    render() {
        return (
            <TodoForm
                todo={this.state}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTodo(todo) {
            dispatch(postTodo(todo));
        }
    }
}

export default connect(null, mapDispatchToProps)(AddTodo);

